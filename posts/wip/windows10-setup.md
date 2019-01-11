---
title: "Windows10で環境セットアップ"
date: "2019-12-31"
---

DellのPCを買ったのでセットアップをまとめました  

## まずはじめに

- Windows Update
- Dell Update (Dellの場合)
- 不要なアプリを削除

### CapsLockにCtrlを割り当てる

[Ctrl2cap](https://technet.microsoft.com/en-us/sysinternals/bb897578.aspx)を使う  

ダウンロードしてexeを実行する  
管理者権限が必要なので、コマンドプロンプトを右クリック、管理者権限で実行する  

```
> ctrl2cap.exe /install
```

## ソフトウェア

ググって最新を入れます  

### ブラウザ

- Google Chrome
- Firefox
- Vivaldi
  - pin: Toggl
  - pin: Trello
  - pin: google music
  - pin: Dropbox Paper
- Brave
  - pin: Feedly

### アプリ

- Franz
  - Chatwork
  - Slack (only my private account)
  - Messenger
  - Gmail
- Slack
- Gyazo
- Kindle
- VS Code
- Google Drive File Stream [ドライブ ファイル ストリームを導入する \- G Suite 管理者 ヘルプ](https://support.google.com/a/answer/7491144)
- Evernote
- Clibor
- Line

基本的に開発はWindows Subsystem for Linux(WSL)上で行います  

- WSL

[Install Windows Subsystem for Linux (WSL) on on Windows 10 | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

#### 右クリック > 送る へショートカット追加

Windows + R を押して[ファイル名を実行して起動]を起動  

```
shell:sendto
```

で、VS Codeのショートカットを追加  

#### スタートアップ内の不要なものを削除

Windows + R を押して[ファイル名を実行して起動]を起動  

```
shell:startup
```

で、不要なショートカットを削除

- Google日本語入力

Ctrl + Space -> 英数字入力  
Ctrl + Shift + Space -> かな入力  

のショートカットを設定

TODO: AutoHot key

### ターミナル

- [goreliu/wsl\-terminal: Terminal emulator for Windows Subsystem for Linux \(WSL\)](https://github.com/goreliu/wsl-terminal)

Releaseからダウンロードして解凍  
C:\Tool\wsl-terminal に設置  
open-wsl.exe 実行で起動  
アップデートは

```
./cmdtool update
```

立ち上げてから左上アイコンの右クリック>オプションでフォントを Ricky Diminished Discord に変更

コマンドプロンプトで

```
wslconfig /l
```

するとディストリビューション一覧が表示できる  

右クリックのコンテキストメニューに増やすこともできるが好みじゃないのでやっていない  

### WSL 設定

ディレクトリのパーミッションが777になるので変更する  
設定ファイルを新規作成する  

$ vim /etc/wsl.conf

```
[automount]
enable = true
root = /mnt/
options = "metadata,uid=1000,gid=1000,umask=22"
```

リファレンス [Automatically Configuring WSL – Windows Command Line Tools For Developers](https://blogs.msdn.microsoft.com/commandline/2018/02/07/automatically-configuring-wsl/)

設定を反映するにはサービス LxssManager の再起動が必要  

### Ubuntu設定

source.listを日本のものに変更

$ sudo apt update
$ sudo apt upgrade

#### tiemzone

$ sudo dpkg-reconfigure tzdata

で出てきたウィンドウで選ぶ

#### locale

$ sudo install language-pack-ja

だけで日本語が表示できる  

ロケールを英語にするなら

$ sudo update-locale LANG=en_US.UTF-8

### Ubuntu設定 on WSL(完全に個人用)

symbolic link  

```
cd ~
ln -s ws /mnt/c/Users/shoji/ws
```

dotfile設定  

```
cd ~/
mkdir -p ws/repos
cd $_
git clone git@github.com:shoji-k/dotfiles.git
cd dotfiles
./xenial-init.sh
```

dircolorの設定リファレンス  
[bashの表示色をカスタマイズ \- Qiita](https://qiita.com/soramugi/items/a726bd64330e08daa9e5)  

## ソフトウェア on WSL

- [Git](/git)
- [Neovim](/neovim)
- [Ruby](/ruby-install)
- tig

