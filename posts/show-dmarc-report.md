---
title: 'DMARCのレポートを見てみる'
date: '2024-01-21'
updated: ''
---

自分で使っているメールアドレスのDMARCのレポートの設定をだいぶ前からしていました  
届くXMLをたまに眺めるくらいでちゃんと見てなかったので見てみます  

まずはツールを使って見やすくしてみるところまでやります  

Windows11のWSLのUbuntuで試しました

[GitHub \- tierpod/dmarc\-report\-converter: Convert dmarc reports from xml to human\-readable formats](https://github.com/tierpod/dmarc-report-converter)
を使います  

手順を参考に  

```bash
wget https://github.com/tierpod/dmarc-report-converter/releases/download/v0.6.5/dmarc-report-converter_v0.6.5-20220905_x86-64.tar.gz
tar -xvf dmarc-report-converter_v0.6.5-20220905_x86-64.tar.gz
cd dmarc-report-converter/
cp config.dist.yaml config.yaml
```

config.yaml は自分の環境に合わせます  

input > dir にDMARCのファイルを入れるディレクトリ  
output > file に出力するファイル名

を変えました

DMARCを入れるディレクトリを用意、今回は dmarc_files という名前にしました

```bash
mkdir dmarc_files
```

dmarc_files の中にメールで届いていたDMARCのレポートを入れます  

実行します

```bash
./dmarc-report-converter -config ./config.yaml
```

htmlのディレクトリの中に出力したので、そこでサーバーを立てて見ます  

```bash
cd html
ruby -run -e httpd . -p 8000
```

rubyでサーバーを立てましたが、他の方法でもいいです  

![dmarc_report](/show-dmarc-report/dmarc.webp)

DMARCのレポートが見れました

おかしなものがいくつかありますね  
これを調べていくのが大変です


PR

[実務で使える メール技術の教科書 基本のしくみからプロトコル・サーバー構築・送信ドメイン認証・添付ファイル・暗号化・セキュリティ対策まで](https://amzn.to/3SqCA8s) <small>(このリンクは、アフィリエイトリンクです)</small>
