---
title: 'Intel NUC BLKNUC7I7DNKE を買った'
date: '2019-10-30'
---

持ってる Windows デスクトップ
BLKNUC7I7DNKE

SSD、メモリー、電源ケーブル（さきっぽのミッキーケーブル）が別売りなので購入しておきました

## Intel NUC を組み立てる

Intel NUC を裏返して、裏蓋を開けます

メモリは斜めに挿して、平らに押し込むと爪が開いてカチッと鳴ります  
SSD は、ネジを外して、刺しこんでネジで止めます

## BIOS を最新にする

型番で検索、Intel のウェブサイト内のダウンロードページを探します  
[ダウンロード BIOS アップデート \[DNKBLi7v\]](https://downloadcenter.intel.com/ja/download/29201?product=130392)

OS がいらない BIOS アップロードファイルを見つけてダウンロード  
DNi70067.bio でした

ダウンロードして Fat32 でフォーマットした USB メモリに入れました  
exFat でフォーマットした USB だと認識してくれませんでした

Intel NUC を起動して F2 で Visual BIOS 画面が起動できました  
USB を指して、F7 すると DNi70067.bio を選んでアップデート

これで BIOS を最新にできました

## Ubuntu 18.04 のインストール

Ubuntu 18.04 を入れることにしました

日本語された iso ファイルを使いました  
[Ubuntu Desktop 日本語 Remix のダウンロード \| Ubuntu Japanese Team](https://www.ubuntulinux.jp/download/ja-remix) からダウンロード

ubuntu-ja-18.04.3-desktop-amd64.iso でした

ダウンロードしておきます

### インストール USB の作成

[UNetbootin \- Homepage and Downloads](https://unetbootin.github.io/) を使って、Ubuntu が起動できる USB を作ります  
UNetbootin をダウンロードして起動、先程ダウンロードしておいた Ubuntu の iso ファイルを選んでインストール USB を作りました

### インストール開始

インストール USB を指して、Intel NUC を起動  
認識され Ubuntu が立ち上がりデスクトップに Ubuntu のインストールがあるのでそれを実行

Ubuntu はミニマムインストールしました

Terminal を起動

sudo apt update
sudo apt upgrade

左の Caps を Ctrl に変更する

\$ sudo vi /etc/default/keyboard

```
XKBOPTIONS="ctrl:nocaps"
```

を追記、PC 再起動で変更されました

4K ディスプレイで文字が小さいので 130%表示にしたい

```
gsettings set org.gnome.desktop.interface text-scaling-factor 1.3
```

Google 日本語入力(mozc)が最初から入っているので設定をする

Ctrl+Space を IME 無効化
Ctrl+Shift+Space を IME 有効化にする

ポイントは最初から割り当てられている設定と競合してないか確認

Google Drive を使う

設定からオンラインアカウントで Google を設定、するとファイラーに表示される

ソフトウェアセンターでインストール

- Visual Studio Code
- Slack
- VLC
- LibreOffice

Firefox でダウンロードしてインストール

- google-chrome-stable
- google-chrome-beta

- Station
  - AppImage ファイルなので、実行権限つけて起動した

Google Chrome

- Evernote
- Dropbox

Terminal でインストール

- Brave [Installing Brave — Brave Browser documentation](https://brave-browser.readthedocs.io/en/latest/installing-brave.html#linux)

ssh 秘密鍵を持ってきて、.ssh/config の用意

PC 貸すとき用のユーザー追加

sudo adduser (user name)
