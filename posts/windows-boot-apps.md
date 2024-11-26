---
title: "Windows11で仕事に使うアプリを一気に立ち上げる"
date: "2024-11-27"
updated: ""
---

Windows11で仕事に使うアプリを一気に立ち上げるバッチファイルを作成します  
メモ帳を開いて以下の内容をコピーして保存します  
立ち上げるアプリのパスは、それぞれ調べて直してください  

```bat
@echo off
chcp 65001

start "" "chrome.exe" --profile-directory="Default"
timeout /t 5

start "" "C:\Program Files\Google\Chrome Beta\Application\chrome.exe" --profile-directory="Profile 1"
timeout /t 5

start "" "C:\Users\user\AppData\Local\slack\slack.exe"

echo 準備ができました。Enterキーを押して終了します。
pause
```

保存する際は、ファイル名を`work.bat`などにして、拡張子を`.bat`にして保存します  
ダブルクリックすれば実行できます  

アプリを1つずつちょっとまってから次のアプリを立ち上げるようにしています

Google Chromeの`--profile-directory="Default"`はデフォルトのプロファイルを開き
`--profile-directory="Profile 1"`は、プロファイル1を開くためのオプションです  
`timeout /t 5`は、5秒待ってから次のアプリを立ち上げるためのコマンドです  
不要だったら外すといいです  

スタートアップに登録しておけば、Windows起動時に自動で立ち上がるようになります  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MxHA7x" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
