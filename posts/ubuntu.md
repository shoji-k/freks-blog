---
title: "Ubuntu設定"
date: "2019-01-11"
updated: ""
---

Ubuntuの設定をまとめました  
xenial(16.04)、bionic(18.04)で使いました  

## aptを早くする

source.listを日本のものに変更

```
$ sudo perl -p -i.bak -e 's%https?://(?!security)[^ \t]+%http://jp.archive.ubuntu.com/ubuntu/%g' /etc/apt/sources.list
```

## パッケージ類を最新に

```
$ sudo apt update
$ sudo apt upgrade
```

## tiemzoneを変える

```
$ sudo dpkg-reconfigure tzdata
```

で出てきたウィンドウで選ぶ

## localeを変える

日本語が表示されないとき  

```
$ sudo install language-pack-ja
```

だけで日本語が表示できる  
ロケールを英語にするなら  

```
$ sudo update-locale LANG=en_US.UTF-8
```

### Ubuntu設定 on WSL (完全に個人用)

symbolic link  

```
cd ~
ln -s ws /mnt/c/Users/shoji/ws
```

ssh設定  

- prepare .ssh/config
- set key to proper path

dotfile設定  

```
cd ~/
mkdir -p ws/repos
cd $_
git clone git@github.com:shoji-k/dotfiles.git
cd dotfiles
./xenial-init.sh (for xenial)
./bionic-init.sh (for bionic)
```

dircolorの設定リファレンス  
[bashの表示色をカスタマイズ \- Qiita](https://qiita.com/soramugi/items/a726bd64330e08daa9e5)  

