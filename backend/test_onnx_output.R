# ==========================================================
# 🧪 ONNX Model Output Diagnostic Tester (Fixed Version)
# ==========================================================
library(reticulate)
ort <- import("onnxruntime")
np <- import("numpy", convert = FALSE)

# --- Helper function to inspect model output ---
test_model_output <- function(model_path) {
  cat("\n==============================\n")
  cat("🧠 Testing model:", model_path, "\n")

  # Load model session
  sess <- ort$InferenceSession(model_path)
  input_name <- sess$get_inputs()[[1]]$name
  cat("✅ Input name:", input_name, "\n")

  # Dummy input of 21 zeros
  dummy_input <- np$array(matrix(rep(0, 21), nrow = 1), dtype = np$float32)

  # ✅ Correct dictionary creation (use variable, not literal string)
  input_dict <- reticulate::dict()
  input_dict[[input_name]] <- dummy_input

  # Run inference
  outputs <- sess$run(NULL, input_dict)

  # --- Print details ---
  cat("📦 Output structure:\n")
  str(outputs)

  cat("\n🧾 Raw output values:\n")
  print(outputs)

  # If available, show names of output tensors
  cat("\n📋 Output node names:\n")
  output_names <- sapply(sess$get_outputs(), function(x) x$name)
  print(output_names)
}

# ==========================================================
# Paths to all 3 models
# ==========================================================
model_dir <- "./backend/modelsonnx"
models <- list(
  Logistic_Regression = file.path(model_dir, "logistic_regression.onnx"),
  Random_Forest       = file.path(model_dir, "random_forest.onnx"),
  XGBoost             = file.path(model_dir, "xgboost.onnx")
)

# ==========================================================
# Run diagnostics for each model
# ==========================================================
for (m in names(models)) {
  test_model_output(models[[m]])
}
cat("\n✅ Test completed!\n")
