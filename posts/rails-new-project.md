---
title: 'Rails案件に参加するとき'
date: '2024-04-16'
updated: ''
---

途中から既存のRails案件に参加するときにやったことをまとめてみます  

## まずはドキュメント読み込み

用意してくれてるドキュメントをざっと読みます  
どこに何が書いてあるかくらいを把握  

### インフラ環境

どうやって動いてるか全体像を知っておくと開発しやすいです  
ステージング環境やテスト環境があるか知っておきます  

### Gitの使い方を確認

GitHubフローとかブランチの扱いを確認しておきます

### リリース

リリースサイクルやリリース方法、ルールを確認しておきます

### チームルールの確認

ドキュメントに書いてあることを確認  
書いてないルールがないか確認をします

## ローカル環境構築

ドキュメントとかコードを見て環境構築します  
開発してる人は一度してからやり直すことが少ないので意外にはまります  
聞きながら出来たらいいですね  

## rails stats

全体の統計を見て規模感を見ます  

```bash
$ bin/rails stats
+----------------------+--------+--------+---------+---------+-----+-------+
| Name                 |  Lines |    LOC | Classes | Methods | M/C | LOC/M |
+----------------------+--------+--------+---------+---------+-----+-------+
| Controllers          |   3004 |   2189 |      54 |     267 |   4 |     6 |
| Helpers              |    135 |    109 |       1 |      12 |  12 |     7 |
| Jobs                 |      2 |      2 |       1 |       0 |   0 |     0 |
| Models               |   9761 |   6608 |      68 |     599 |   8 |     9 |
| Mailers              |    606 |    431 |      11 |      37 |   3 |     9 |
| Channels             |      8 |      8 |       2 |       0 |   0 |     0 |
| JavaScripts          |     84 |     32 |       0 |       3 |   0 |     8 |
| JavaScript           |  41830 |  36180 |       0 |      41 |   0 |   880 |
| Libraries            |    705 |    587 |      11 |      30 |   2 |    17 |
| Api specs            |  21660 |  18414 |       1 |      20 |  20 |   918 |
| App_factory specs    |    217 |    199 |       0 |       0 |   0 |     0 |
| Lib specs            |     72 |     60 |       0 |       0 |   0 |     0 |
| Mailer specs         |    683 |    563 |       8 |      24 |   3 |    21 |
| Model specs          |  14115 |  11253 |       0 |       9 |   0 |  1248 |
| Request specs        |    677 |    557 |       0 |       0 |   0 |     0 |
| Service specs        |   6355 |   5359 |       0 |      12 |   0 |   444 |
| System specs         |  11612 |   8526 |       0 |      38 |   0 |   222 |
| Worker specs         |   3789 |   3215 |       0 |       2 |   0 |  1605 |
+----------------------+--------+--------+---------+---------+-----+-------+
| Total                | 115315 |  94292 |     157 |    1094 |   6 |    84 |
+----------------------+--------+--------+---------+---------+-----+-------+
  Code LOC: 46146     Test LOC: 48146     Code to Test Ratio: 1:1.0
```

## Gemfileを見る

どんなgemを使ってるか見ます  

## rails routes

ルーティングを確認します  

```bash
bin/rails routes
```

眺めて全体像をイメージします  

## user.rbを見る

user.rbを見て、ログイン認証に何を使っているかとか、モデルの大きさとかを見ます  

## 行数の多いファイルを見る

モデルだと

```bash
git ls-files app/models | xargs wc -l | sort | tail -n 5
   203 app/models/company.rb
   205 app/models/user.rb
   242 app/models/activity.rb
   270 app/models/worker.rb
   332 app/models/issue.rb
  9761 total
```

とかして行数の多いファイルを見てみます  

## 最初にアサインされたissueに取り掛かる  

必要そうな画面を見て、そこまでたどりつくコードを読み、改造方法を探りながらプロジェクトになれていきます

## まとめ

新しい案件は最初に骨が折れますが、腕の見せ所なので効率よくいきたいですね

PR

仕事の進め方を学べる本です

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3zgJmGZ" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51lm0alurNL._SY445_SX342_.jpg" alt="アジャイルサムライ――達人開発者への道" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">アジャイルサムライ――達人開発者への道</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
