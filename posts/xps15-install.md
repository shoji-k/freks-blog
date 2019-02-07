---
title: "XPS 15 9570を買ったのでやったことまとめ"
date: "2019-02-07"
---

Dell XPS 15 9570 を年末のクーポンが出たときに買いました  
届いたのは1/11でした  

CPU: Core i7-8750H 2.2GHz  
RAM: 16GB  
SSD: 512GB  
Graphic Board: GTX 1050Ti  

でたいていのゲームもできてしまうマシンです  

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07GS38QTV&linkId=6848dad1a160e7a7924aac4db67ea029"></iframe>

開封から設定までをまとめてみました  

## 開封して
PC本体と充電ケーブルのみ

## 初期設定

電源入れる、Cortanaが話しかけてくるけど、OFFにして進んでいく  
設定一通りすると起動

リカバリーUSBの作成(回復ドライブ)
  途中まで実行すると必要な容量がわかる
  16G以上のUSBメモリが必要だったが、ないため後日する
  -> 16GBだと何度やっても失敗、32GBのUSBメモリでできました

Windows Updateで最新まで2度した  
Dell Updateをなくなるまでする  
指紋認証の指を追加  
コンピューター名の変更  

## プログラムの削除

- McAfee
- McAfee Security
- Candy Crash Saga
- Fitbit Coach
- LinkedIn
- Netflix
- OneDrive 以前から使ってなかったので削除

Windows Defenderを有効にする  
- 更新プログラムを更新

## CapsLockにCtrlを割り当てる

[Ctrl2cap](https://technet.microsoft.com/en-us/sysinternals/bb897578.aspx)を使う  

ダウンロードしてexeを実行する  
管理者権限が必要なので、コマンドプロンプトを右クリック、管理者権限で実行する  

```
> ctrl2cap.exe /install
```

## ソフトウェアのインストール

ググって最新を入れます  

- Google Chrome
  - (pin) Dropbox paper
- Google Chrome Beta(仕事用アカウント用)
  - 以前はGoogle Chrome Canaryを使ってましたが動かないものがあったりするのでBetaに
- FireFox
- Brave
  - Evernote extension
  - (pin) Google Play Music
  - (pin) Feedly
- Slack
- Evernote
- Steam
- Line
- Visual Studio Code
- Google Drive File Stream [ドライブ ファイル ストリームを導入する \- G Suite 管理者 ヘルプ](https://support.google.com/a/answer/7491144)
- Google日本語入力
- Kindle

Skypeはブラウザ版を使う  
メーラーは基本Gmailをブラウザで  
企業にもらったメールは以前はThunderbirdでしたが、Windows10標準のメーラーにしてみました  

FranzやめてStationにしてみた
- Station
  - Toggl
  - Trello
  - Messenger
  - Chatwork
  - Slack(for private)
  - Gmail
  - TweetDeck

以前はVivaldiにPin留めしてたりしましたが、Stationに統一してみました  
Dropbox PaperはStationで謎の別ウィンドウが開いて解決策なさそうなので、ChromeにPin留してます  
Google Play MusicもStationに入れてましたが、たまに反応しなくなるので、BraveにPin留めしてます  

Stationに登録しすぎ感はあります..  

以下、完全な仕事用  

- Office 365
- Zoom
- Adobe Acrobat Reader
- WinMerge
- Postman
- sqldeveloper Oracle client用

### フォント

ダウンロードしてfont追加します  

- Google Noto Font
- Ricty Diminished

### Windows Subsystem for Linux (WSL)

基本的に開発はWindows Subsystem for Linux(WSL)上で行います  

[Install Windows Subsystem for Linux (WSL) on on Windows 10 | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

  - POWER LINE COMMANDでWSLを有効に
  - Windows StoreからUbuntuをインストール
    - Ubuntuは新しいLTSがでたらバージョンアップしていける
    - 他のはバージョン固定っぽい

[Initialize a new WSL Linux distro \| Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/initialize-distro)をしていく
  - Start MenuからUbuntuを開く
  - sudo apt update && sudo apt upgrade

### Ubuntu設定

[Ubuntu設定](/ubuntu)にまとめてます

### ソフトウェア on WSL

- [Git](/git) install and setting
  - gpg
- [Node](node-install)
- [Neovim](/neovim)
- [Ruby](/ruby-install)
- [PHP](/php-install)
- tig
- mosh

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


### スタートアップ

タスクマネージャーを開いて、スタートアップのタブをクリック  

- Dell Mobile Connect Startup を無効に

## キーマッピング

### AutoHotKey

AutoHotKeyをいれてキーをカスタマイズ

- Ctrl+Enter -> Escに割当て(セパレートキーボード+Vim用)

```
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

^Enter::Send, {Esc}
```

をesc.ahkとして保存  
できたファイルのショートカットをスタートアップに入れておく  

### Google日本語入力

下のトレイにあるアイコンを右クリック > プロパティ  
キー設定の選択、編集をクリック  

![google_ime_option](/xps15-install/google_ime_option.png)

下記画像の下4つの設定を追加  

![google_ime_addition](/xps15-install/google_ime_addition.png)

## Windows Defender

スキャンしてほしくないディレクトリを指定  
yarn installしたディレクトリはウィルススキャンすると重いため除外します  

![windows_defender_exclude](/xps15-install/windows_defender_exclude.png)

## まとめ

以前と同じような環境にするのに1週間かかりました  
Ansibleとかにまとめられそうなのもあるけど、頻度が1、2年おきなので、都度ソフトウェアを入れ替えてくのがよさそう  

