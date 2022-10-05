---
title: 'Lightsail + ClondfrontでTLS証明書を更新する'
date: '2022-10-05'
updated: ''
---

Lightsail + Clondfront で管理しているサイトの TLS 証明書が切れそうなので更新しました  
自動で更新する方法はなんでしょうか...見つかりませんでした

[Verify an SSL/TLS certificate in Amazon Lightsail \| Lightsail Documentation](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/verify-tls-ssl-certificate-using-dns-cname-https) あたりを見ながらやりました

## 証明書確認

Lightsail のコンソールを開きます  
Cloudfront のディストリビューション > Custom domains を開きます

![cloudwatch-logs-group](/renew-lightsail-cloudfront-tls/cloudflont-network.webp)

## 証明書追加

![cloudwatch-logs-group](/renew-lightsail-cloudfront-tls/cloudflont-new-record.webp)

フォームを埋めていきます

## DNS のレコード更新

使っている DNS レジストラのレコードを更新します

Lightsail 側で証明書が Valid になることを確認します

## TLS 証明書の切り替え

![cloudwatch-logs-group](/renew-lightsail-cloudfront-tls/cloudflont-switch-record.webp)

ここで切り替えます

毎年やるのは面倒ですね
