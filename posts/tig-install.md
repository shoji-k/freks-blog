---
title: '日本語環境で最新のTigを使う'
date: '2019-12-15'
updated: ""
---

Tigでgitのdiff-highlightが使いたかったのですが、apt installで入るtigが2.0.2で、2.2以上がいるらしく最新版のTigを入れてみました

Ubuntu 18.04 でやっています

基本的には公式ドキュメントを参考に  
[Installation · Tig \- Text\-mode interface for Git](https://jonas.github.io/tig/INSTALL.html)

エラーが出るたびに必要なものをインストールしました

```
sudo apt install automake
sudo apt install pkg-config
sudo apt install libncursesw5 libncursesw5-dev
```

GitHubからリポジトリをclone、最新のtagにします

```
git clone git@github.com:jonas/tig.git
git checkout -b tig-2.5.0 refs/tags/tig-2.5.0
```

ビルドします  
`prefix`は好きな場所にします  

```
cd tig
./autogen.sh
./configure
make prefix=/usr/local LDLIBS=-lncursesw CPPFLAGS=-DHAVE_NCURSESW_CURSES_H
sudo make install prefix=/usr/local
```

これで日本語も文字化けしないようになりました

ちなみに `diff-highlight` の設定は、.tigrcに

```
set diff-highlight = true
```

で有効になります

`diff-highlight` については [Git tips \| freks blog](/git/) に少し書いています
