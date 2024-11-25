---
title: "Windows11でタスクバーにピン留めされたアプリケーションの場所を調べる"
date: "2024-11-26"
updated: ""
---

タスクバーにピン留めされたアプリケーションのショートカットが保存されているディレクトリを開きます  
Windowsエクスプローラーを開いて、以下のパスをアドレスバーに入れると開けます  

```txt
%AppData%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar
```

![Windows explorer](/windows-taskbar-app/explorer.webp)

ちなみにエクスプローラーは、Windowsキー + E でも開けます

ショートカットが並んでいるので場所を知りたいアプリケーションのショートカットを右クリック  
ファイルの場所を開くを選択

アプリケーションの実行ファイル(exeなど)があるので右クリック  
パスのコピーを選択すると、そのショートカットの場所がコピーされます  

Slackの場合は  

```txt
"C:\Users\(自分のユーザー名)\AppData\Local\slack\slack.exe"
```

でした  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MxHA7x" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
