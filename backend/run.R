# ==========================================================
#  🩺 Diabetes Prediction API - R + ONNX + Plumber
# ==========================================================
library(reticulate)
library(plumber)
library(jsonlite)

cat("📁 Working dir:", getwd(), "\n")

# ----------------------------------------------------------
# 1) find & use a Python virtualenv (try several common paths)
# ----------------------------------------------------------
venv_candidates <- c(
  file.path(getwd(), "venv"),
  file.path(getwd(), "backend", "venv"),
  file.path(getwd(), ".venv"),
  file.path(getwd(), "backend", ".venv"),
  "~/.virtualenvs/r-reticulate"
)

venv_found <- NULL
for (v in venv_candidates) {
  if (dir.exists(path.expand(v))) {
    venv_found <- path.expand(v)
    break
  }
}
if (is.null(venv_found)) {
  stop(paste0(
    "❌ Virtualenv not found. Tried: ", paste(venv_candidates, collapse = ", "),
    "\nCreate one with `python -m venv backend/venv` (or adjust path)."
  ))
}
cat("🔧 Using virtualenv:", venv_found, "\n")
use_virtualenv(venv_found, required = TRUE)

# ----------------------------------------------------------
# 2) import onnxruntime + numpy
# ----------------------------------------------------------
ort <- import("onnxruntime")
np <- import("numpy", convert = FALSE)
cat("✅ reticulate + onnxruntime loaded\n")

# ----------------------------------------------------------
# 3) model & scaler paths
# ----------------------------------------------------------
model_dir <- file.path(getwd(), "backend", "modelsonnx")
scaler_path <- file.path(model_dir, "scaler_params.json")
rf_path <- file.path(model_dir, "random_forest.onnx")
xgb_path <- file.path(model_dir, "xgboost.onnx")
lr_path <- file.path(model_dir, "logistic_regression.onnx")

if (!file.exists(scaler_path)) stop("Scaler file not found: ", scaler_path)
if (!file.exists(rf_path)) stop("RF model not found: ", rf_path)
if (!file.exists(xgb_path)) stop("XGB model not found: ", xgb_path)
if (!file.exists(lr_path)) stop("LR model not found: ", lr_path)

# ----------------------------------------------------------
# 4) load scaler params & define scaler function
# ----------------------------------------------------------
scaler_params <- fromJSON(scaler_path)
scaler_mean <- as.numeric(scaler_params$mean)
scaler_scale <- as.numeric(scaler_params$scale)
n_features_expected <- length(scaler_mean)
cat("✅ Scaler loaded - expecting", n_features_expected, "features\n")

scale_data <- function(data_input, mean_vec, scale_vec) {
  m <- as.matrix(data_input)
  storage.mode(m) <- "double"
  sweep(sweep(m, 2, mean_vec, "-"), 2, scale_vec, "/")
}

# ----------------------------------------------------------
# 5) load ONNX sessions and input names
# ----------------------------------------------------------
cat("🔹 Loading models...\n")
rt_rf <- ort$InferenceSession(rf_path)
rt_xgb <- ort$InferenceSession(xgb_path)
rt_lr <- ort$InferenceSession(lr_path)

input_name_rf <- rt_rf$get_inputs()[[1]]$name
input_name_xgb <- rt_xgb$get_inputs()[[1]]$name
input_name_lr <- rt_lr$get_inputs()[[1]]$name

cat("✅ Models loaded: rf / xgb / lr\n")
cat("🧠 Model input names:\n")
cat(" - RF :", input_name_rf, "\n")
cat(" - XGB:", input_name_xgb, "\n")
cat(" - LR :", input_name_lr, "\n")

# ----------------------------------------------------------
# 6) prediction helper that extracts probabilities correctly
# ----------------------------------------------------------
predict_model <- function(input_vec, model_type = "lr", debug = FALSE) {
  if (length(input_vec) != n_features_expected) {
    stop(sprintf("Expected %d features but got %d", n_features_expected, length(input_vec)))
  }

  # scale
  X_scaled <- scale_data(matrix(input_vec, nrow = 1), scaler_mean, scaler_scale)
  if (debug) {
    cat("\n🧾 Raw input vector:\n")
    print(round(input_vec, 4))
    cat("\n⚙️ After scaling:\n")
    print(round(X_scaled, 4))
  }

  sess <- switch(model_type,
    rf  = rt_rf,
    xgb = rt_xgb,
    lr  = rt_lr,
    rt_rf
  )
  input_name <- switch(model_type,
    rf  = input_name_rf,
    xgb = input_name_xgb,
    lr  = input_name_lr,
    input_name_rf
  )

  # build input dict properly (use variable content as key)
  input_dict <- reticulate::dict()
  input_dict[[input_name]] <- np$array(X_scaled, dtype = "float32")

  outputs <- sess$run(NULL, input_dict)

  # outputs typically: [[label], [probabilities]] for skl2onnx export with zipmap=False
  # We will handle both cases robustly:
  if (length(outputs) >= 2) {
    # common case: outputs[[1]] = label, outputs[[2]] = probabilities matrix [1,2]
    raw_label <- as.numeric(outputs[[1]][1])
    probs <- as.numeric(outputs[[2]])
    # if probs are shaped as 1x2, probs[1]=p(class0), probs[2]=p(class1)
    prob_no <- probs[1]
    prob_yes <- probs[2]
  } else {
    # fallback: single output (could be probabilities array length 2 OR class index)
    raw0 <- as.numeric(outputs[[1]])
    if (length(raw0) == 2) {
      # already probabilities for class0/class1
      prob_no <- raw0[1]
      prob_yes <- raw0[2]
      raw_label <- ifelse(prob_yes >= 0.5, 1, 0)
    } else {
      # single scalar label (0 or 1) — can't compute real prob, return NA for prob_yes
      raw_label <- raw0[1]
      prob_yes <- NA_real_
      prob_no <- NA_real_
    }
  }

  if (debug) {
    cat("\n🧠 Raw ONNX output label:", raw_label, "\n")
    cat("📊 Raw ONNX probs:", paste(round(c(prob_no, prob_yes), 4), collapse = ", "), "\n")
  }

  pred_label <- ifelse(raw_label == 1, "Diabetes", "No diabetes")
  prob_yes_rounded <- if (!is.na(prob_yes)) round(as.numeric(prob_yes), 4) else NA_real_

  list(
    predicted_class = pred_label,
    probability = prob_yes_rounded,
    raw_label = raw_label,
    raw_probs = c(No = prob_no, Yes = prob_yes)
  )
}

# ----------------------------------------------------------
# 7) plumber API & CORS
# ----------------------------------------------------------
pr <- plumber::pr()

pr$filter("cors", function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*") # restrict in prod
  res$setHeader("Access-Control-Allow-Credentials", "true")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    res$setHeader("Content-Length", "0")
    res$body <- ""
    return(res)
  }
  forward()
})

# ----------------------------------------------------------
# 8) /predict endpoint
# ----------------------------------------------------------
pr$handle("POST", "/predict", function(req, res) {
  tryCatch(
    {
      body <- fromJSON(req$postBody)
      cat("\n📥 Received JSON from frontend:\n")
      print(body)

      # Normalize model type
      model_type <- ifelse(is.null(body$model_type), "lr", body$model_type)
      if (model_type == "random_forest") model_type <- "rf"
      if (model_type == "gradient_boosting") model_type <- "xgb"
      if (model_type == "logistic") model_type <- "lr"

      # Remove model_type field
      body$model_type <- NULL

      # Feature order
      feature_order <- c(
        "HighBP", "HighChol", "CholCheck", "BMI", "Smoker", "Stroke",
        "HeartDiseaseorAttack", "PhysActivity", "Fruits", "Veggies",
        "HvyAlcoholConsump", "AnyHealthcare", "NoDocbcCost", "GenHlth",
        "MentHlth", "PhysHlth", "DiffWalk", "Sex", "Age", "Education", "Income"
      )
      body <- body[feature_order]

      input_vec <- as.numeric(unlist(body))
      cat("📊 Feature count:", length(input_vec), "\n")

      # --- Prediction
      result <- predict_model(input_vec, model_type)
      pred_class <- result$predicted_class
      confidence <- if (pred_class == "Diabetes") result$raw_probs["Yes"] else result$raw_probs["No"]
      confidence_pct <- round(confidence * 100, 1)


      # Model name for display
      model_display <- switch(model_type,
        rf = "Random Forest",
        xgb = "Gradient Boosting",
        lr = "Logistic Regression",
        "Unknown Model"
      )

      # Terminal log
      cat(sprintf(
        "🔮 Model: %-20s | Prediction: %-12s | Confidence: %.1f%%\n",
        model_display, pred_class, confidence_pct
      ))


      # JSON response to frontend
      list(
        model_used = model_display,
        predicted_class = pred_class,
        confidence = confidence_pct
      )
    },
    error = function(e) {
      cat("❌ ERROR:", e$message, "\n")
      res$status <- 500
      list(error = paste("Prediction failed:", e$message))
    }
  )
})

# ----------------------------------------------------------
# 9) run server
# ----------------------------------------------------------
cat("\n🚀 Starting API at http://127.0.0.1:8000 ...\n")
pr$run(host = "0.0.0.0", port = 8000)
