---
title: 'RailsアプリをFargateに乗せてみた'
date: '2020-04-03'
updated: ""
---

AWS FargateをRailsアプリで試してみました  

Rails -> Fargate   
Postgres -> RDS  

でAWS上に構築します  

ドキュメントや検索して出てくる情報だと、定義をJSONで書いてあったり、Cloudformation使ってたりが多いですが、いきなり理解難しいので、画面でポチポチ作ってみました  

ひとまず動くまでわかりにくかったところをまとめておきます  

まずは  
[AWS Fargate: サービス概要 \| Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/aws-fargate-a-product-overview/)  
を読んでどんなものなのかを頭に入れておく  

始める前に理解すること

- Cluster, Service, Task, Container の4つある
  - Cluster : 全体
  - Service : Taskを維持する
  - Task: 動かすコンテナ周りを指定
  - Container: コンテナを指定

Serviceで維持するコンテナの数 Desired count が2なら2つのコンテナを維持しようとする  
タスクを1つ止めても、勝手に1つ立ち上げてくる  
減らしたいなら Desired count を減らす  

Docker imageを新しくしたとき

docker-image-name:latest とか指定してると latest が新しくなると、実行中のコンテナいれかえる
CodebuildでECS連携させるとできるし、他にもできる方法あると思うが調べられてない    

1回だけ動かしたい場合は、Service開いて `Add task` で実行する  
`rails db:migrate` などはこれでやる  

Fargate以外に知らないと厳しそうなこと

- VPC
  - インターネットにつながるネットワークの用意
- Security Group
  - コンテナからRDSにつながるようにする

ここまで理解するのに苦労しました  

ためしてみた画面キャプチャを取っておけばよかった..  
忘れないようにきれいにまとめようと思いましたが、自分専用メモっぽくなってしまいました  

