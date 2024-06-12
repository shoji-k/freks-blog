---
title: 'Windows11のタスクバーのアイコンがおかしくなった'
date: '2024-06-12'
updated: ''
---

使っているマイクのShure MV7用のアプリが新しくなったので入れなおしてたら、Windows11のタスクバーのアイコンがおかしくなりました

![taskbar-icons](/taskbar-icons-white/taskbar.webp)

いくつかのアプリのアイコンの設定が飛んだように見えます  

いくつか調べて試してみました

## ie4uinitを実行

Windows + rでファイル実行ダイアログを開く

```cmd
ie4uinit.exe -ClearIconCache
```

を実行、再起動、うまくいかず

## キャッシュファイルを消す

Powershellでユーザーのディレクトリを開いて

```powershell
cd .\AppData\Local\Microsoft\Windows\Explorer\
del iconcache_*.db
del thumbcache_*.db
```

再起動、うまくいかず

## アイコンのピン止めを外してピン止めしなおす

おかしくなったアイコンを右クリック、ピン留めを外す  
アプリを立ち上げる、タスクバーにピン留めする  
を手動で1つずつやりました  

これで直りました

## まとめ

原因はよくわかってません  
コマンド一発で直ってほしいですね  