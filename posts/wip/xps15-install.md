---
title: "XPS 15 9570を買ったのでやったことまとめ"
date: "2019-12-31"
---
XPS 15 9570



開封
PC本体と充電ケーブルのみ

電源入れる、Cortanaが話しかけてくるけど、OFFにして進んでいく
設定一通りすると起動

リカバリーUSBの作成(回復ドライブ)
  途中まで実行すると必要な容量がわかる
  16G以上のUSBメモリが必要だったが、ないため後日する

Windows Updateで最新まで2度した
Dell Updateをなくなるまでする
  ずっとなくならないのが1つあったが放置
指紋認証の指を追加

コンピューター名の変更


プログラムの削除

- McAfee
- McAfee Security
- Candy Crash Saga
- Fitbit Coach
- LinkedIn
- Netflix
- OneDrive 以前から使ってなかったので削除

Windows Defenderを有効にする
  更新プログラムを更新

- Google Chrome
- Google Chrome Canary(仕事用アカウント用)
- Brave
- Slack
- Evernote
- Steam
- Line
- Visual Studio Code
- Google Drive File Stream [ドライブ ファイル ストリームを導入する \- G Suite 管理者 ヘルプ](https://support.google.com/a/answer/7491144)
- Google日本語入力

FranzやめてStationにしてみた
- Station
  - Toggl
  - Trello
  - Messenger
  - Chatwork
  - Slack(for private)
  - Gmail
  - TweetDeck

Google Noto Font
Ricty Diminished

- WSL

[Install Windows Subsystem for Linux (WSL) on on Windows 10 | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

  - POWER LINE COMMANDでWSLを有効に
  - Windows StoreからUbuntuをインストール
    - Ubuntuは新しいLTSがでたらバージョンアップしていける

[Initialize a new WSL Linux distro \| Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/initialize-distro)をしていく
  - Start MenuからUbuntuを開く
  - sudo apt update && sudo apt upgrade

### Ubuntu設定

source.listを日本のものに変更

$ sudo apt update
$ sudo apt upgrade

#### timezone

$ sudo dpkg-reconfigure tzdata

で出てきたウィンドウで選ぶ

#### locale

$ sudo install language-pack-ja

だけで日本語が表示できる  

ロケールを英語にするなら

$ sudo update-locale LANG=en_US.UTF-8

## ソフトウェア on WSL

- [Git](/git) install and setting
  - gpg
- tig
- mosh

### Ubuntu設定 on WSL(完全に個人用)

symbolic link  

```
cd ~
ln -s ws /mnt/c/Users/shoji/ws
```

ssh設定  

prepare .ssh/config
set key to proper path

dotfile設定  

```
cd ~/
mkdir repos
cd $_
git clone git@github.com:shoji-k/dotfiles.git
cd dotfiles
./bionic-init.sh
```

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

