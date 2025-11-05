# Use an official R base image
FROM rocker/r-base:4.3.1

# System deps
RUN apt-get update && apt-get install -y python3 python3-venv python3-pip

# Copy all backend files
WORKDIR /app
COPY . /app

# Install R packages
RUN R -e "install.packages(c('plumber','jsonlite','reticulate'), repos='https://cloud.r-project.org/')"

# Create Python venv and install deps
RUN python3 -m venv venv && \
  . venv/bin/activate && \
  pip install numpy onnxruntime

# Expose API port
EXPOSE 8000

# Run your R API
CMD ["Rscript", "run.R"]
