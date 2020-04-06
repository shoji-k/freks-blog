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

Codebuildで使うRDSにアクセスできるようにしてあげて、buildspec.ymlにdb migrationするコマンドを足すとできそう