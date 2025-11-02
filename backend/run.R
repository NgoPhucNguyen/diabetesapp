# --- backend/run.R ---

library(reticulate)
use_virtualenv("C:/Users/pc/OneDrive/Documents/.virtualenvs/r-tensorflow", required = TRUE)

library(plumber)
library(keras)
library(jsonlite)

setwd("D:/DSR301_web/backend")

# ===============================
# 🧠 Load Model & Scaler
# ===============================
cat("🔹 Loading model and scaler...\n")
model <- load_model_hdf5("diabetes_model_r.h5")
scaler_info <- readRDS("scaler_info.rds")
cat("✅ Model and scaler loaded successfully.\n")

scale_input <- function(x, scaler) {
  scaled <- (x - scaler$center) / scaler$scale
  return(as.matrix(scaled))
}

# ===============================
# 🧩 Create plumber router
# ===============================
pr <- plumber::pr()

# ✅ GLOBAL CORS FILTER (works for all routes)
pr$filter("cors", function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  res$setHeader("Access-Control-Allow-Credentials", "true")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  # Handle preflight OPTIONS request immediately
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    res$setHeader("Content-Length", "0")
    res$body <- ""
    return(res)
  }

  forward()
})

# ===============================
# 🔮 Prediction Endpoint
# ===============================
pr$handle("POST", "/predict", function(req, res) {
  tryCatch(
    {
      data <- fromJSON(req$postBody)
      cat("📥 Received JSON from frontend:\n")
      print(data)

      # Convert to numeric matrix
      x <- as.numeric(unlist(data))
      x <- matrix(x, nrow = 1)
      cat("📊 Input shape:", dim(x), "\n")

      # Scale input
      x_scaled <- scale_input(x, scaler_info)
      cat("⚙️ Scaled input ready.\n")

      # Predict
      preds <- predict(model, x_scaled)
      predicted_class <- which.max(preds) - 1
      cat("🔮 Prediction:", predicted_class, "\n")

      list(
        predicted_class = predicted_class,
        probabilities = as.numeric(preds[1, ])
      )
    },
    error = function(e) {
      cat("❌ ERROR:", e$message, "\n")
      res$status <- 500
      list(error = paste("Prediction failed:", e$message))
    }
  )
})

# ===============================
# 🚀 Run API
# ===============================
cat("🌐 Starting API at http://127.0.0.1:8000 ...\n")
pr$run(host = "0.0.0.0", port = 8000)
