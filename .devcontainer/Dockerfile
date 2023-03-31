FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# for cypress:run
RUN apt-get update && apt-get install -y \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
  # fails to install feature/vim after enable below
  #  \
  # && apt-get clean \
  # && rm -rf /var/lib/apt/lists/*

# install tig
RUN curl -LO https://github.com/jonas/tig/releases/download/tig-2.5.8/tig-2.5.8.tar.gz \
  && tar -xzf tig-2.5.8.tar.gz \
  && cd tig-2.5.8 \
  && ./configure \
  && make prefix=/usr/local \
  && make install prefix=/usr/local

