# =====================================================
# Rscript.R
# Generate multiple diabetes dataset plots
# Output: images saved in backend/data/plots/
# =====================================================

# --- Setup working directory ---
setwd("D:/DSR301_web/backend")

cat("Working directory:", getwd(), "\n")
cat("Files in current directory:\n")
print(list.files())

# --- Read dataset ---
cat("Reading CSV file...\n")
data_path <- "diabetes_012_health_indicators_BRFSS2015.csv"
if (!file.exists(data_path)) {
  stop("❌ File not found: ", data_path)
}
df <- read.csv(data_path)
cat("✅ Loaded data with", nrow(df), "rows and", ncol(df), "columns\n")

# --- Prepare output folder ---
output_dir <- "data/plots"
if (!dir.exists(output_dir)) dir.create(output_dir, recursive = TRUE)

cat("Saving plots to:", output_dir, "\n")
cat("Rscript setup finished ✅\n")

# --- Load libraries ---
library(ggplot2)
library(reshape2)
library(corrplot)
library(dplyr)
library(readr)

# --- Manifest file path ---
manifest_path <- file.path(output_dir, "manifest.csv")

# --- Load dataset ---
cat("Loading dataset...\n")
data <- read_csv(data_path, show_col_types = FALSE)
cat("Loaded rows:", nrow(data), "\n")

# --- Clean column names ---
names(data) <- make.names(names(data))

# --- Helper function to save ggplots ---
save_plot <- function(plot, filename, width = 7, height = 5) {
  filepath <- file.path(output_dir, filename)
  ggsave(filepath, plot = plot, width = width, height = height, dpi = 150)
  return(filepath)
}

# --- Initialize manifest data frame ---
manifest <- data.frame(
  file = character(),
  title = character(),
  description = character(),
  stringsAsFactors = FALSE
)

# =====================================================
# 1. Histogram of BMI
# =====================================================
if ("BMI" %in% names(data)) {
  p <- ggplot(data, aes(x = BMI)) +
    geom_histogram(fill = "skyblue", bins = 30) +
    theme_minimal() +
    ggtitle("Distribution of BMI")
  save_plot(p, "hist_bmi.png")
  manifest <- rbind(manifest, c("hist_bmi.png", "BMI Distribution", "Shows the overall BMI distribution in dataset"))
}

# =====================================================
# 2. Bar plot of Diabetes prevalence by Sex
# =====================================================
if (all(c("Diabetes_012", "Sex") %in% names(data))) {
  bar_data <- data %>%
    group_by(Sex, Diabetes_012) %>%
    summarise(count = n(), .groups = "drop")
  p <- ggplot(bar_data, aes(x = Sex, y = count, fill = factor(Diabetes_012))) +
    geom_bar(stat = "identity", position = "dodge") +
    theme_minimal() +
    ggtitle("Diabetes prevalence by Sex") +
    labs(fill = "Diabetes_012")
  save_plot(p, "bar_diabetes_by_sex.png")
  manifest <- rbind(manifest, c("bar_diabetes_by_sex.png", "Diabetes by Sex", "Shows how diabetes cases vary between sexes"))
}

# =====================================================
# 3. Boxplot of BMI by Diabetes category
# =====================================================
if (all(c("BMI", "Diabetes_012") %in% names(data))) {
  p <- ggplot(data, aes(x = factor(Diabetes_012), y = BMI, fill = factor(Diabetes_012))) +
    geom_boxplot() +
    theme_minimal() +
    ggtitle("BMI by Diabetes Category") +
    labs(x = "Diabetes (0=No, 1=Pre, 2=Yes)", y = "BMI")
  save_plot(p, "box_bmi_by_diabetes.png")
  manifest <- rbind(manifest, c("box_bmi_by_diabetes.png", "BMI vs Diabetes", "Compare BMI across diabetes categories"))
}

# =====================================================
# 4. Scatter plot of HighChol vs BMI
# =====================================================
if (all(c("BMI", "HighChol", "Diabetes_012") %in% names(data))) {
  p <- ggplot(data, aes(x = BMI, y = HighChol, color = factor(Diabetes_012))) +
    geom_jitter(alpha = 0.4) +
    theme_minimal() +
    ggtitle("BMI vs HighChol by Diabetes") +
    labs(x = "BMI", y = "HighChol", color = "Diabetes")
  save_plot(p, "scatter_bmi_highchol.png")
  manifest <- rbind(manifest, c("scatter_bmi_highchol.png", "Scatter BMI vs HighChol", "Relationship between BMI and cholesterol"))
}

# =====================================================
# 5. Correlation heatmap
# =====================================================
num_data <- data %>% select(where(is.numeric))
if (ncol(num_data) > 1) {
  cor_mat <- cor(num_data, use = "pairwise.complete.obs")
  png(file.path(output_dir, "corr_heatmap.png"), width = 900, height = 700)
  corrplot(cor_mat, method = "color", tl.cex = 0.6)
  dev.off()
  manifest <- rbind(manifest, c("corr_heatmap.png", "Correlation Heatmap", "Correlations among numeric features"))
}

# =====================================================
# Save manifest file
# =====================================================
write_csv(manifest, manifest_path)
cat("✅ Done! Plots saved to:", output_dir, "\n")
cat("Manifest file:", manifest_path, "\n")
