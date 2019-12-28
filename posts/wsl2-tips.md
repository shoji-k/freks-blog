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

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07GP1Q3VT&linkId=51d3cab0b0c69bbb32ceb4d18dc2b82f"></iframe>