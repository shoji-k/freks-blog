---
title: 'Inspiron14 5420を買ったのでセットアップする'
date: '2023-03-31'
updated: ''
---

2023.03.08 に Inspiron14 5420 を [Dell 公式ストア](https://www.dell.com/ja-jp/shop/%E3%83%87%E3%83%AB%E3%81%AE%E3%83%8E%E3%83%BC%E3%83%88%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3/inspiron-14-%E3%83%8E%E3%83%BC%E3%83%88%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3/spd/inspiron-14-5420-laptop/smi403uspoif08on3ojp)で買いました

スペックは

```txt
Processor
第12世代 インテル® Core™ i7-1255U (10 コア,12MB キャッシュ, 最大 4.7 GHzまで可能 )

OS
Windows 11 Home, 日本語

Video
インテル® Iris® Xe グラフィックス

Memory
16GB, 2x8GB, DDR4, 3200MHz

Harddrive
512GB M.2 PCIe NVMe SSD

Color
プラチナシルバー
```

値段は 98,680 円でした  
前の PC が 4 年前くらいにかった XPS 15 で CPU 第 8 世代だったので買いかえてみました

### Setup

立ち上げて

Mcfee をアンインストールして、Defender を有効になってるのを確認  
ひたすら Windows update、Dell update を繰り返します

Fn + ESC を同時押しでファンクションキー LOCK 変更

Windows11 設定

- 拡張子表示 -> エクスプローラーに設定増えてる
- 隠しファイル表示 -> エクスプローラーに設定増えてる
- IME 設定
  - Shift+Space で変換トグルできる ->やめた、コーディング中に記号連続で打つときに IME 発動する e.g. () => {}
  - 無変換キーを IMF オフにした

CapsLock -> Ctrl に変更 =>  
[https://github.com/microsoft/PowerToys/releases/tag/v0.59.1 Release Release v0.59.1 · microsoft/PowerToys · GitHub]
Keyboard manager で入れ替えられたが、ctrl が押しっぱなしになるバグあり...
https://github.com/microsoft/PowerToys/issues/19787#issuecomment-1211500621
-> 代わりに [https://docs.microsoft.com/ja-jp/sysinternals/downloads/ctrl2cap Ctrl2cap - Windows Sysinternals | Microsoft Docs] 入れた

アプリを入れていきます

- Chrome
- Chrome beta
- Firefox
- Brave
- Windows Terminal -> 最初から入ってる
  - PowerShell 最新入れろなのでいれてみる

管理者権限で Windows Terminal を開いて

```cmd
winget search Microsoft.PowerShell
winget install --id Microsoft.Powershell --source winget
```

- WSL
  - [WSL のインストール | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/install)
- VSCode
  - ctrl+shift+p Terminal: default profile -> wsl 選ぶ
- [Docker Desktop WSL 2 backend on Windows](https://docs.docker.com/desktop/windows/wsl/#download)
  - 今まで wsl に docker 入れて使ってましたが、VSCode Dev Container 使いたいので入れました
- Office 365
- Slack
- Gyazo
- Zoom
- Line
- CrystalDiskInfo
- Obsidian

を入れていったん落ち着いてます
