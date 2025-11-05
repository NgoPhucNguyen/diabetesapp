# --- 0. CÀI ĐẶT VÀ TẢI THƯ VIỆN ---
Sys.setenv(RETICULATE_PYTHON = "~/.virtualenvs/r-reticulate/bin/python")
library(reticulate)
library(jsonlite)

# Kích hoạt venv
use_virtualenv("r-reticulate", required = TRUE)

# Import các thư viện Python
ort <- import("onnxruntime")
np <- import("numpy", convert = FALSE) # Giữ ở dạng Python object

# --- 1. THIẾT LẬP ĐƯỜNG DẪN ---
model_dir <- "./outputs/models/modelsonnx"
scaler_path <- file.path(model_dir, "scaler_params.json")
rf_path <- file.path(model_dir, "random_forest.onnx")
xgb_path <- file.path(model_dir, "xgboost.onnx")
lr_path <- file.path(model_dir, "logistic_regression.onnx")

# --- 2. TẢI SCALER VÀ ĐỊNH NGHĨA HÀM TIỀN XỬ LÝ ---
scaler_params <- jsonlite::fromJSON(scaler_path)
scaler_mean <- as.numeric(scaler_params$mean)
scaler_scale <- as.numeric(scaler_params$scale)
n_features_expected <- length(scaler_mean)

#' Tái tạo phép biến đổi StandardScaler.transform() của Python trong R
scale_data <- function(data_input, mean_vec, scale_vec) {
  data_matrix <- as.matrix(data_input)
  storage.mode(data_matrix) <- "double"
  
  # (X - mean)
  scaled_matrix <- sweep(data_matrix, MARGIN = 2, STATS = mean_vec, FUN = "-")
  # (X - mean) / scale
  scaled_matrix <- sweep(scaled_matrix, MARGIN = 2, STATS = scale_vec, FUN = "/")
  
  return(scaled_matrix)
}

# --- 3. TẢI CÁC MODEL ONNX ---
rt_rf <- ort$InferenceSession(rf_path)
rt_xgb <- ort$InferenceSession(xgb_path)
rt_lr <- ort$InferenceSession(lr_path)

# Lấy tên input node (bắt buộc cho hàm run)
input_name_rf <- rt_rf$get_inputs()[[1]]$name
input_name_xgb <- rt_xgb$get_inputs()[[1]]$name
input_name_lr <- rt_lr$get_inputs()[[1]]$name

# --- 3b. TẢI VÀ LÀM SẠCH DỮ LIỆU (THEO LOGIC MỚI) ---
# (Giả định 'paths' và 'clean_df' đã tồn tại)
load_diabetes <- function() {
  df1 <- fread(file.path(paths$data, "/raw/diabetes_bi_ba.csv")) %>% as_tibble()
  df2 <- fread(file.path(paths$data, "/raw/diabetes.csv")) %>% as_tibble()
  df3_raw <- fread(file.path(paths$data, "/raw/diabetes_bi.csv")) %>% as_tibble()
  list(df2 = df2, df3 = df3_raw)
}
d <- load_diabetes()
df3 <- clean_df(d$df3)

# --- 4. KIỂM TRA VÀ CHUẨN BỊ DỮ LIỆU TỪ df3 ---
if (!exists("df3")) {
  stop("LỖI: Biến 'df3' không tồn tại.")
}
if (ncol(df3) < n_features_expected + 1) {
  stop("Lỗi: df3 không đủ cột (features + target).")
}
if (nrow(df3) < 50) {
  stop("Lỗi: df3 không đủ 50 dòng để dự đoán.")
}

N_SAMPLES <- 50
# Giả định Cột 1 là target, Cột 2:(N+1) là features
feature_cols <- 2:(n_features_expected + 1)

# Lấy nhãn thực (true_labels) từ cột 1
true_labels <- df3[[1]][1:N_SAMPLES]
if (is.factor(true_labels) || is.character(true_labels)) {
  true_labels <- as.numeric(as.factor(true_labels)) - 1 # Chuẩn hóa về 0/1
}

# Lấy features thô
data_to_predict_raw <- df3[1:N_SAMPLES, feature_cols]

# --- 5. TIỀN XỬ LÝ VÀ CHUYỂN ĐỔI DỮ LIỆU ---

# 1. Scale dữ liệu
scaled_data_matrix <- scale_data(data_to_predict_raw, scaler_mean, scaler_scale)

# 2. Chuyển sang numpy array (Python) với kiểu float32 (bắt buộc cho ONNX)
input_data_np <- np$array(scaled_data_matrix, dtype = np$float32)

# --- 6. CHẠY INFERENCE VỚI CẢ 3 MODEL (ĐÃ SỬA LỖI DICT) ---

#' Hàm trợ giúp chạy inference và chuẩn hóa output
run_onnx_model <- function(session, input_data_np, input_name) {
  # Tạo R list (reticulate tự chuyển thành Python dict)
  input_dict <- list()
  input_dict[[input_name]] <- input_data_np
  
  outputs <- session$run(NULL, input_dict)
  
  pred_raw_probs <- NULL
  
  # Xử lý output khác nhau (skl2onnx vs onnxmltools)
  if (length(outputs) == 2) {
    # skl2onnx: outputs[[1]] = labels, outputs[[2]] = probabilities [N, 2]
    pred_raw_probs <- outputs[[2]]
  } else if (length(outputs) == 1) {
    # XGBoost: outputs[[1]] = probabilities [N, 2]
    pred_raw_probs <- outputs[[1]]
  } else {
    stop("Số output không mong đợi.")
  }
  
  if (is.null(dim(pred_raw_probs))) {
    pred_raw_probs <- matrix(pred_raw_probs, ncol = 1)
  }
  
  # Lấy xác suất của class 1
  if (ncol(pred_raw_probs) == 2) {
    probs_class_1 <- as.vector(pred_raw_probs[, 2]) # Class 1 là cột 2
  } else {
    probs_class_1 <- as.vector(pred_raw_probs[, 1]) # Giả định [N, 1]
  }
  
  return(probs_class_1)
}

# Chạy inference
prob_rf <- run_onnx_model(rt_rf, input_data_np, input_name_rf)
prob_xgb <- run_onnx_model(rt_xgb, input_data_np, input_name_xgb)
prob_lr <- run_onnx_model(rt_lr, input_data_np, input_name_lr)

# --- 7. TỔNG HỢP VÀ HIỂN THỊ KẾT QUẢ ---
cat("\n--- BẢNG XÁC SUẤT (CLASS 1) CHO 50 SAMPLES ---\n")
cat(sprintf("| %3s | %4s | %10s | %10s | %10s |\n", "ID", "True", "Logistic", "RF", "XGBoost"))
cat("|-----|------|------------|------------|------------|\n")

for (i in 1:N_SAMPLES) {
  true_val <- true_labels[i]
  lr_val  <- if (!is.na(prob_lr[i])) sprintf("%.6f", prob_lr[i]) else "N/A"
  rf_val  <- if (!is.na(prob_rf[i])) sprintf("%.6f", prob_rf[i]) else "N/A"
  xgb_val <- if (!is.na(prob_xgb[i])) sprintf("%.6f", prob_xgb[i]) else "N/A"
  
  cat(sprintf("| %3d | %4d | %10s | %10s | %10s |\n", i - 1, true_val, lr_val, rf_val, xgb_val))
}
cat("\n--- HOÀN THÀNH ---\n")