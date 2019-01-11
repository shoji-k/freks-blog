---
title: "Node install"
date: "2019-12-31"
---

## install nvm

Nodeバージョンを変えたりするため、nvmでnodeをインストールします

[creationix/nvm: Node Version Manager \- Simple bash script to manage multiple active node\.js versions](https://github.com/creationix/nvm#installation)

のinstallationの通りする

Ubuntuだったので  

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

.bashrcに追記

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

アップデートするときも最初のcurlコマンドでできるらしい  

## install node

バージョンの確認  
```--lts```をつけるとLong term supportのバージョンだけ出てくる

```
$ nvm ls-remote --lts
```

インストール

```
$ nvm install v10.15.0
```

確認

```
$ node -v
v10.15.0
```

## install yarn

[インストール \| Yarn](https://yarnpkg.com/ja/docs/install#debian-stable)
を参考に  

Ubuntuだったので

```
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

nvmいれてたので

```
$ sudo apt-get install --no-install-recommends yarn
```

確認

```
$ yarn -v
1.13.0
```

