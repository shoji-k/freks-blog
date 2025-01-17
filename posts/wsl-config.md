---
title: "WSL 2の設定を変えてみた"
date: "2025-01-18"
updated: ""
---

WSL 2がやたらとメモリを使ってPCが重くなってしまったので、制限をかけてみました  
[WSL での詳細設定の構成 \| Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/wsl-config) が参考になります  

メモリを8Gまで使うようにしてみました

`C:\Users\(username)\.wslconfig` のファイルを作って以下の内容を書き込みます

```txt
[wsl2]
memory=8GB
```

あとはWSLを再起動  
PowerShellで以下のコマンドを実行します  

```powershell
wsl --shutdown
wsl
```

これでメモリ使用量の制限が入りました  

## まとめ

いまのところ快適になりました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4jmDXjO" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81QnV2OzIKL._SY385_.jpg" alt="Windowsコマンド環境のすべて" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Windowsコマンド環境のすべて</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
