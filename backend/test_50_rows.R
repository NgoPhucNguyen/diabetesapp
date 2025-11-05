# ==========================================================
# 🧠 Test 50 Samples with ONNX Models (same logic as run.R)
# ==========================================================
library(reticulate)
library(jsonlite)
library(data.table)

# ---- 1. Setup virtualenv ----
venv_path <- file.path(getwd(), "backend", "venv")
use_virtualenv(venv_path, required = TRUE)

ort <- import("onnxruntime")
np <- import("numpy", convert = FALSE)

# ---- 2. Load model + scaler ----
model_dir <- file.path(getwd(), "backend", "modelsonnx")
scaler_path <- file.path(model_dir, "scaler_params.json")
rf_path <- file.path(model_dir, "random_forest.onnx")
xgb_path <- file.path(model_dir, "xgboost.onnx")
lr_path <- file.path(model_dir, "logistic_regression.onnx")

scaler_params <- fromJSON(scaler_path)
scaler_mean <- as.numeric(scaler_params$mean)
scaler_scale <- as.numeric(scaler_params$scale)
n_features_expected <- length(scaler_mean)

scale_data <- function(data_input, mean_vec, scale_vec) {
  m <- as.matrix(data_input)
  storage.mode(m) <- "double"
  sweep(sweep(m, 2, mean_vec, "-"), 2, scale_vec, "/")
}

rt_rf <- ort$InferenceSession(rf_path)
rt_xgb <- ort$InferenceSession(xgb_path)
rt_lr <- ort$InferenceSession(lr_path)

input_name_rf <- rt_rf$get_inputs()[[1]]$name
input_name_xgb <- rt_xgb$get_inputs()[[1]]$name
input_name_lr <- rt_lr$get_inputs()[[1]]$name

# ---- 3. Load CSV ----
csv_path <- "D:/DSR301_web/backend/diabetes_012_health_indicators_BRFSS2015.csv"
df <- fread(csv_path)

cat("✅ Loaded CSV:", csv_path, "\nRows:", nrow(df), " | Cols:", ncol(df), "\n")

# Column 1 = target, rest = features
true_labels <- df[[1]][1:50]
features <- df[1:50, 2:(n_features_expected + 1), with = FALSE]

# ---- 4. Scale data ----
scaled <- scale_data(features, scaler_mean, scaler_scale)
input_np <- np$array(scaled, dtype = np$float32)

# ---- 5. Define helper ----
run_model <- function(sess, input_name, input_data_np) {
  input_dict <- reticulate::dict()
  input_dict[[input_name]] <- input_data_np
  out <- sess$run(NULL, input_dict)
  probs <- if (length(out) == 2) out[[2]] else out[[1]]
  as.matrix(probs)[, 2] # probability of class 1
}

# ---- 6. Run inference ----
prob_lr <- run_model(rt_lr, input_name_lr, input_np)
prob_rf <- run_model(rt_rf, input_name_rf, input_np)
prob_xgb <- run_model(rt_xgb, input_name_xgb, input_np)

# ---- 7. Results ----
pred_lr <- ifelse(prob_lr >= 0.5, 1, 0)
pred_rf <- ifelse(prob_rf >= 0.5, 1, 0)
pred_xgb <- ifelse(prob_xgb >= 0.5, 1, 0)

cat("\n--- PREDICTION RESULTS (first 50 rows) ---\n")
cat(sprintf(
  "| %3s | %4s | %4s | %4s | %4s | %10s | %10s | %10s |\n",
  "ID", "True", "LR", "RF", "XGB", "P(LR)", "P(RF)", "P(XGB)"
))
cat("|-----|------|------|------|------|------------|------------|------------|\n")

for (i in 1:50) {
  cat(sprintf(
    "| %3d | %4d | %4d | %4d | %4d | %10.4f | %10.4f | %10.4f |\n",
    i, true_labels[i], pred_lr[i], pred_rf[i], pred_xgb[i],
    prob_lr[i], prob_rf[i], prob_xgb[i]
  ))
}

cat("\n✅ Test complete!\n")
