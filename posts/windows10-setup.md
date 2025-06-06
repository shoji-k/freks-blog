---
title: 'Windows10の環境セットアップ'
date: '2019-01-20'
updated: "2024-10-24"
---

※追記  
[XPS 15 9570 を買ったのでやったことまとめ \| freks blog](/xps15-install/) のほうが新しいです

新しい PC を買ったのですが、届く前に今使っている PC のセットアップをまとめました

## 初めにすること

- Windows Update
- Dell Update (Dell の場合)
- 不要なアプリを削除

### CapsLock に Ctrl を割り当てる

[Ctrl2cap](https://technet.microsoft.com/en-us/sysinternals/bb897578.aspx)を使う

ダウンロードして exe を実行する  
管理者権限が必要なので、コマンドプロンプトを右クリック、管理者権限で実行する

```sh
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
- Office 365
- Google 日本語入力
- Office 365
- Zoom
- Adobe Acrobat Reader

Skype はブラウザ版を使う

基本的に開発は Windows Subsystem for Linux(WSL)上で行います

- WSL

[Install Windows Subsystem for Linux (WSL) on on Windows 10 | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

#### 右クリック > 送る へショートカット追加

Windows + R を押して[ファイル名を実行して起動]を起動

```sh
shell:sendto
```

で、VS Code のショートカットを追加

#### スタートアップ内の不要なものを削除

Windows + R を押して[ファイル名を実行して起動]を起動

```sh
shell:startup
```

で、不要なショートカットを削除

- Google 日本語入力

Ctrl + Space -> 英数字入力  
Ctrl + Shift + Space -> かな入力

のショートカットを設定

### ターミナル

- [goreliu/wsl\-terminal: Terminal emulator for Windows Subsystem for Linux \(WSL\)](https://github.com/goreliu/wsl-terminal)

Release からダウンロードして解凍  
C:\Tool\wsl-terminal に設置

open-wsl.exe のショートカットを作って  
open-wsl.exe -l で起動  
-l をつけると、シェルのログインディレクトリがカレントディレクトリになります

参照) [Added \-l param to README\.md · goreliu/wsl\-terminal@7d0a883](https://github.com/goreliu/wsl-terminal/commit/7d0a8832acf00f0678063c4fddd83ecd35102e5e)

アップデートは

```sh
./cmdtool update
```

立ち上げてから左上アイコンの右クリック>オプションでフォントを Ricky Diminished Discord に変更

コマンドプロンプトで

```sh
wslconfig /l
```

するとディストリビューション一覧が表示できる  
右クリックのコンテキストメニューに増やすこともできるが好みじゃないのでやっていない

### WSL 設定

ディレクトリのパーミッションが 777 になるので変更する  
設定ファイルを新規作成する

\$ vim /etc/wsl.conf

```conf
[automount]
enable = true
root = /mnt/
options = "metadata,uid=1000,gid=1000,umask=22"
```

リファレンス [Automatically Configuring WSL – Windows Command Line Tools For Developers](https://blogs.msdn.microsoft.com/commandline/2018/02/07/automatically-configuring-wsl/)

設定を反映するにはサービス LxssManager の再起動が必要

## Ubuntu 設定

[Ubuntu 設定](/ubuntu/)にまとめてます

## ソフトウェア on WSL

- [Git](/git/)
- [Node](/node-install/)
- [Neovim](/neovim/)
- [Ruby](/ruby-install/)
- [PHP](/php-install/)
- tig

## キーマッピング

AutoHotKey をいれてキーをカスタマイズ

- Ctrl+Enter -> Esc に割当て(セパレートキーボード+Vim 用)

できたファイルのショートカットをスタートアップに入れておく
