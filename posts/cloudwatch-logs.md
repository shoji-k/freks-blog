---
title: 'CloudWatch Logsにログをためる'
date: '2020-02-15'
---

理想のサーバー構成 [The Twelve\-Factor App （日本語訳）](https://12factor.net/ja/) に近づけるため、ログをサーバー外で管理したいので、Clooud Watch にログをためてみました

[Amazon CloudWatch Logs とは \- Amazon CloudWatch Logs](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)  
を見てやったのですが、統合 CloudWatch エージェントを使ってやるのが新しいらしく、古いエージェントを使った方法がググるとたくさん出てくるので、注意です  

公式ドキュメントを頼りにやりました(苦労したので苦労せずにできるようにしてほしい..)  

既存のEC2にエージェントをインストールして、WebサーバーのログをCloudWatch Logsにためる手順をまとめます  

## エージェント用のIAMユーザーを用意

[CloudWatch エージェントで使用する IAM ロールおよびユーザーを作成する \- Amazon CloudWatch](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/create-iam-roles-for-cloudwatch-agent-commandline.html)

を見て、エージェント用のIAMユーザーを用意します  

- EC2 Allows EC2 instances to call AWS services on your behalf (EC2 お客様に代わって EC2 インスタンスが AWS サービスを呼び出すことができるようにする)を選択
- CloudWatchAgentServerPolicy のポリシーを選択

がポイントです  
作成したIAMユーザーの、Access Key IDとSecret Access Keyを後で設定に使うので控えておきます

## エージェントのインストール  

EC2のサーバーにエージェントをコマンドラインで入れました

[コマンドラインを使用して CloudWatch エージェントをダウンロードおよび設定する \- Amazon CloudWatch](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/download-cloudwatch-agent-commandline.html)

OSはAmazon Linuxだったので

```
$ wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
$ sudo rpm -U ./amazon-cloudwatch-agent.rpm
```

でインストールできました

## エージェントの設定の前準備をする

"AWS 認証方法および設定ファイル" を用意しておきます  
これをしておくと次章のエージェントの設定が楽になるようです  

[設定ファイルと認証情報ファイルの設定 \- AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-files.html)

を見て

$ vim ~/.aws/config

```
[default]
region = ap-northeast-1
```

$ vim ~/.aws/credentials

```
[default]
aws_access_key_id = xxxxxxxxxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxxxx

[AmazonCloudWatchAgent]
aws_access_key_id = xxxxxxxxxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

デフォルトのリージョンと、用意したIAMユーザーのキーをセットします  
defaultで使うんだったら、AmazonCloudWatchAgentの指定はいらないと思います  

## エージェントの設定をする

[ウィザードを使用して CloudWatch エージェント設定ファイルを作成する \- Amazon CloudWatch](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/create-cloudwatch-agent-configuration-file-wizard.html)

を見て設定します

ドキュメントの"CloudWatch エージェント設定ウィザードを実行する"を見て、ウィザード実行  

```bash
$ sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

質問に答えて設定していきます  

設定ファイルはここにできます  

＄cat /opt/aws/amazon-cloudwatch-agent/bin/config.json

```
{
  "agent": {
    "run_as_user": "root"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
           {
             "file_path": "/var/log/httpd/error_log",
             "log_group_name": "error_log",
             "log_stream_name": "{instance_id}"
           }
        ]
      }
    }
  }
}
```

こんな感じになりました  

## エージェントの起動をする

設定ファイルを指定して起動するコマンドです  

```
$ sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s
```

[CloudWatch エージェントを使用した一般的なシナリオ \- Amazon CloudWatch](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-common-scenarios.html)  
の"CloudWatch エージェントを別のユーザーとして実行する"で見つけたんですが、ちゃんと書いてあるドキュメントが見つかりませんでした..

起動したらログを確認しておいたほうがいいです

## エージェントのログを確認する

`/opt/aws/amazon-cloudwatch-agent/logs/` にログが出力されます  

- amazon-cloudwatch-agent.log
- configuration-validation.log

が出てたので、エラーが出てなければ問題なさそうです  

### amazon-cloudwatch-agent.logに出たエラーの紹介

amazon-cloudwatch-agent.log にエラーが出ていました

```txt
 2020-02-15T09:38:36Z E! CreateLogStream / CreateLogGroup with log group name error_log stream name i-2dd40134 has errors. Will retry the request: NoCredentialProviders: no valid providers in chain
 caused by: EnvAccessKeyNotFound: failed to find credentials in the environment.
```

既存のEC2を使ったので、EC2にCloudWatch Logsにアクセスする権限なかったようです  
EC2にCloudWatch Logsにアクセスできるロール(用意したIAMユーザーと同じもの)を適用すると、エラー解消されました

## コンソールで確認

AWSの管理コンソール画面を開いて、CloudWatchを開きます  
左のペインの Logs > Log groups に指定したグループができていたらログが溜まっていると思います  

![cloudwatch-logs-group](/cloudwatch-logs/cloudwatch-logs-list.png)

Expired Event After がクリックできて、保存期間が変更できるので節約したかったら短くしましょう  



