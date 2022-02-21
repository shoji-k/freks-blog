---
title: "historyコマンドの使い方"
date: "2019-01-21"
updated: ""
---

linuxのhistoryコマンドをおさらいしました  
より効率よい作業を  

## history command とは

ターミナルの実行履歴が表示されます  

```
$ history 5
171  git commit -m 'fix to show mail title'
172  git status
173  tig
174  ls -al
175  date
```

## tips

数値を指定すると表示件数が絞れます  

コマンドを最実行  

```
$ !172
```

とすると history 172 をもう一度実行  

```
$ !!
```

とすると直前のコマンドをもう一度実行  

コマンドを検索するには  

```
(Ctrl + r を打ち込む)
$ (reverse-i-search)\`':
```

となり打ち込んだ文字でマッチする直前のコマンドが表示されます  
Tabでコマンド全部が表示されます  
さらに Ctrl + r で更にさかのぼり、行き過ぎたら Ctrl + s  

