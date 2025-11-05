# ===============================
# 🩺 Diabetes Backend - Dockerfile (Render)
# ===============================
FROM rocker/r-base:4.3.1

# Fix missing Debian GPG keys before apt-get update
RUN apt-get update || true && \
  apt-get install -y --no-install-recommends gnupg ca-certificates && \
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 6ED0E7B82643E131 78DBA3BC47EF2265 BDE6D2B9216EC7A8 8E9F831205B4BA95 || true && \
  apt-get update && \
  apt-get install -y python3 python3-venv python3-pip

# Copy all backend files
WORKDIR /app
COPY . .

# Install R dependencies
RUN R -e "install.packages(c('plumber', 'jsonlite', 'reticulate'))"

# Expose port for Render
EXPOSE 8080

# Run the Plumber API
CMD ["R", "-e", "pr <- plumber::plumb('run.R'); pr$run(host='0.0.0.0', port=as.numeric(Sys.getenv('PORT', 8080)))"]
