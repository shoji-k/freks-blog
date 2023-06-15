FROM mcr.microsoft.com/devcontainers/javascript-node:1-18

# for 
# cypress:run
# vim
# bash-completion
RUN apt-get update && apt-get install -y \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    vim \
    bash-completion \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# install tig
RUN curl -LO https://github.com/jonas/tig/releases/download/tig-2.5.8/tig-2.5.8.tar.gz \
  && tar -xzf tig-2.5.8.tar.gz \
  && cd tig-2.5.8 \
  && ./configure \
  && make prefix=/usr/local \
  && make install prefix=/usr/local

# to keep .bash_history
ARG USERNAME=node
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USERNAME /commandhistory \
    && echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"