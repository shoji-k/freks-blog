---
title: 'Byobu tips'
date: '2019-11-17'
updated: ""
---

## byobu のエスケープシーケンスを使う

Windows10 + mintty で ssh でサーバーにつないで、Ubuntu + byobu で作業したときに  
ファンクションキー（F1-F4）が効かなくて試行錯誤..しましたがいろいろ試してもだめでした  
SHIFT+F1、SHIFT+F2 と SHIFT 使うと効くんですが..

しばらく１つのタブで作業してましたが、escape sequence の存在を忘れてました  
F9 でエスケープシーケンスを変えられます

コマンドは

- エスケープ + c => 新しいタブを作成
- エスケープ + n => 次のタブへ
- エスケープ + p => 前のタブへ
- エスケープ + d => デタッチ
- エスケープ + [ => マウスでスクロールできる

を使ってます

エスケープシーケンスが Ctrl + a だと  
Ctrl キー押しっぱなし、a、c  
で新しいタブが開きます

https://blog.bgbgbg.net/archives/4364

画面サイズがおかしくなったら

エスケープ + D => デタッチ

で直せました

マウスによるカーソル移動がしたいときは、F7

## セッション操作

セッション一覧見る

```
$ byobu ls
```

新しいセッションを名前をつけて作成

```
$ byobu new -s your_session_name
```

セッション名を指定して開く

```
$ byobu a -t your_session_name
```

セッション名を指定して削除

```
$ byobu kill-session -t your_session_name
```
