---
title: 'WSL2を使ってみる'
date: '2019-12-27'
---

WSL2使ってみました  

[WSL 2 について \| Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/wsl2-about)

## WSL2インストール

WSL2をインストールは、公式ドキュメントを見ていれます  
2019-12-27時点だと、Windows Insider Previewインストールが必要なので手間です  

- [Windows Subsystem for Linux \(WSL\) を Windows 10 にインストールする \| Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10)
- [WSL 2 のインストール \| Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/wsl2-install)

Windows Storeからディストリビューションを選んでインストールできます  
Ubuntu 18.04を選びました  

## ターミナル

Ubuntu 18.04がアプリとして開けますが、色々いい感じにしてくれるターミナルを使うとコピペできたり見た目がよくなったりします  

これをいれました  
[mintty/wsltty: Mintty as a terminal for Bash on Ubuntu on Windows / WSL](https://github.com/mintty/wsltty)

オプションでフォント変えたりして好みに合わせます

## WSL2とWindows10でファイルを共有する

WSL2だとWindows側のドライブが `/mnt/c` とか `/mnt/` にマウントされてます  

Windows側に共有するにはWSL2側で

```
ln -s /mnt/c/User/username/ws ws
```

などシンボリックリンクを張ってあげると両方からファイルが触れます

## wslのバージョンを確認する

Windows PowerShellで

```
$ wsl --list --verbose

* Ubuntu-18.04           Stopped         2
  docker-desktop-data    Stopped         2
  docker-desktop         Stopped         2
```

## wsl2のビープ音を消す

```bash
vim /etc/inputrc
```

```text
set bell-style none
```

がコメントアウトされてるので、コメントアウトを外します
