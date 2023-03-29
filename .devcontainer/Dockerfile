FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# for cypress:run
RUN apt-get update && apt-get install -y \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
  # fails to install feature/vim after enable below
  #  \
  # && apt-get clean \
  # && rm -rf /var/lib/apt/lists/*

