# --- train_model.R ---
getwd()
setwd("D:/DSR301_web/backend")

# ===============================
# 🧠 Neural Network Training in R
# ===============================

library(keras)
library(tensorflow)
library(dplyr)
library(readr)

# 1️⃣ Load dataset
data <- read_csv("diabetes_012_health_indicators_BRFSS2015.csv", show_col_types = FALSE)

# 2️⃣ Separate target and features
y <- as.numeric(data[[1]]) # target column
X <- as.matrix(data[, -1]) # features only

# Check basic info
cat("Shape of X:", dim(X)[1], "rows x", dim(X)[2], "features\n")
cat("Unique labels in y:", unique(y), "\n")

# 3️⃣ Normalize features (0-1 scaling) and SAVE the scaler info
X_scaled <- scale(X)

# Save center/scale info for prediction later
scaler_info <- list(
  center = attr(X_scaled, "scaled:center"),
  scale  = attr(X_scaled, "scaled:scale")
)
saveRDS(scaler_info, file = "scaler_info.rds")
cat("💾 Saved scaler_info.rds with", length(scaler_info$center), "features\n")

# Replace X with scaled matrix
X <- X_scaled

# 4️⃣ Convert labels to categorical (one-hot encoding)
# Make sure y starts from 0 (keras expects 0-based classes)
if (min(y) == 1) {
  y <- y - 1
  cat("ℹ️ Converted labels 1,2,3 → 0,1,2\n")
}
y_cat <- to_categorical(y, num_classes = length(unique(y)))

# 5️⃣ Split into train/test sets
set.seed(123)
train_index <- sample(1:nrow(X), 0.8 * nrow(X))
X_train <- X[train_index, ]
y_train <- y_cat[train_index, ]
X_test <- X[-train_index, ]
y_test <- y_cat[-train_index, ]
cat("✅ Data split — Train:", dim(X_train)[1], " Test:", dim(X_test)[1], "\n")

# 6️⃣ Define the neural network model
model <- keras_model_sequential() %>%
  layer_dense(units = 64, activation = "relu", input_shape = c(ncol(X_train))) %>%
  layer_dropout(rate = 0.3) %>%
  layer_dense(units = 32, activation = "relu") %>%
  layer_dropout(rate = 0.2) %>%
  layer_dense(units = ncol(y_train), activation = "softmax")

summary(model)

# 7️⃣ Compile model
model %>% compile(
  optimizer = "adam",
  loss = "categorical_crossentropy",
  metrics = "accuracy"
)

# 8️⃣ Train model
cat("🚀 Training model...\n")
history <- model %>% fit(
  X_train, y_train,
  epochs = 30,
  batch_size = 64,
  validation_split = 0.2
)

# 9️⃣ Evaluate on test data
score <- model %>% evaluate(X_test, y_test)
cat("📊 Test loss:", score[[1]], "\n")
cat("📈 Test accuracy:", score[[2]], "\n")

# 🔟 Save the model for later use
save_model_hdf5(model, "diabetes_model_r.h5")

cat("✅ Model training complete! Saved as diabetes_model_r.h5\n")
