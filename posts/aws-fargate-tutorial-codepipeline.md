---
title: 'AWS Fargate「CodePipeline を使用した継続的なデプロイ」をやってみた'
date: '2020-04-05'
---

[チュートリアル: CodePipeline を使用した継続的なデプロイ \- Amazon Elastic Container Service](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/ecs-cd-pipeline.html) をやってみました

Fargateは、[RailsアプリをFargateに乗せてみた](/aws-fargate) を使いました  
ソースプロバイダつまりは、コードのリポジトリは、AWSのCodecommitを使わず、GitHubにしました

理解するのにじっくり読まないとわからなかったので、自分の言葉で手順をまとめると  

Codebuild部分

- ECRにリポジトリを用意
- buildspec.ymlはCodebuildが使い、Docker imageの作成、pushを行う
- buildspec.ymlの最後に出力しているimagedefinitions.jsonは、ECSのコンテナ名を紐付けるためのもの

CodePipeline部分  

- ソースコードをどこにおいているか指定 今回はGitHub repository(private)にしました
- どこでCodebuildを走らせるか、つまりはDocker imageをビルドするか指定
- デプロイプロバイダを指定、つまりはECSのクラスター名、サービス名を指定
  - これでDocker imageがpushされた後にタスクの更新が走る

うまくうごいたのですが、Docker containerの更新だけで、db migrationを走らせられてないです..

Railsアプリで試してて、ECS + RDSでやってみたのですが、
タスクが更新され、サーバーが入れ替わってからmigration走らせたいのですが、rolling updateだと、いつ切り替わるかは見ててわからないので、なにか仕組みが必要そうです  
Blue/Green deploymentにしても、切り替えるタイミングでmigrationさせるのは手動？となりどうしたらいいか分かりません  
あんまり情報調べてもないのはみんなどうしてるんでしょうか..