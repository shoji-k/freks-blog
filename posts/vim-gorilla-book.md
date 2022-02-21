---
title: '「Vimが好きになる本」を読んだ'
date: '2020-07-11'
updated: ""
---

なにかで見かけて、安くなってたので買いました  

[Vimが好きになる本 \| 電子書籍とプリントオンデマンド（POD） \| NextPublishing（ネクストパブリッシング）](https://nextpublishing.jp/book/11839.html)

Vimは長い間使い続けているけど、Vim scriptやプラグイン書けないし、最低限のカスタマイズで使いたい派で、ばりばり使いこなせてはいません
何冊かVimの本読んだけど、Vim scriptの文法ちゃんと見たの初めてだと思う  
読み物的に読めたし、意外に使ってなかったのを思い出せたのと、知らない便利そうなのがあったのでよかった

覚えておきたいもののメモ

```
CTRL_w t -> 一番上のウィンドウに移動
CTRL_w b -> 一番下のウィンドウに移動
CTRL_w x 上下ウィンドウ入れ替え
CTRL_w (H J K L) ウィンドウを一番 (左 下 上 右) に移動
(N) CTRL_w _ ウィンドウをN行にする
(N) CTRL_w | ウィンドウをN列にする
z (N)<CR> ウィンドウをN行にする

g_ 行末非空白文字に移動
^ 行頭非空白文字に移動
{ 前の段落へ移動
} 次の段落へ移動
va[] で[]含めて選択
vat タグ含めて選択
~ 大文字小文字入れ替え
CTRL_a / CTRL_@ 挿入モードで直前に入力したものを再度挿入

レジスタ
ノーマルモードだと "ay でレジスタaに保存 "ap でレジスタaを貼り付け
インサートモードだとCTRL_r レジスタ名
:reg でレジスタ一覧

補完選択
CTRL_y CTRL_n で前次
CTRL_e で選択しない
CTRL_y で選択
CTRL_x CTRL_f ファイル名補完

挿入モードでのインデント
CTRL_t / CTRL_b

:term でVim内でターミナル起動
:set laststatus=2 でステータス見れる

マッピング
:imap a b は 挿入モードでa押すとbが効くし再帰する
再帰とは :imap c a すると、c押すとbが効く
:inoremap c a なら再帰されないのでa押すとbが効く

Vim scriptはExコマンドのあつまり
source something.vim で別ファイル読み込み
:source % で現在のスクリプトを読み込む
```

Language Server Protocol(LSP)をまだ活用できてなくて、Visual Studio　Codeが使えたら楽そうだなーと思いつつ、Vimで試してみようと思ってます  