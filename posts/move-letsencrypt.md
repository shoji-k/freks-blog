---
title: "Let's Encrypt TLS証明書をサーバー移転する"
date: '2021-12-23'
---

Let's Encrypt で運用しているサイトのサーバーを移転しました  
ドメインは仮の `sample.com` へ変更しています

## 環境

Ubuntu 20.04 で試しました

## 方法

古い TLS 証明書を新しいサーバーへ一旦コピーして、https でアクセスできるようにして  
そのあと、Let's Encrypt で TLS 証明書を作って、auto renewal されるようにします

## 事前準備

[Certbot Instructions \| Certbot](https://certbot.eff.org/instructions) を見て  
certbot を新しいサーバーにも入れておきます

## 準備

移転前のサーバーで必要なものを集めて新しいサーバーへ配置します

Nginx conf  
path: /etc/nginx/conf.d/sample.com.conf  
同じ場所にコピー

```
server {
  root /usr/share/nginx/sample.com;
  index  index.html index.htm;

  listen 443 ssl;
  server_name sample.com;

  ssl_certificate /etc/letsencrypt/live/sample.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/sample.com/privkey.pem;
  ssl_dhparam /etc/ssl/private/dhparam.pem;

  # 省略
}
```

Nginx conf を見て TLS 証明書などの場所から pem ファイルを新しいサーバーへ移します
証明書のファイルの場所を見ると

```
$ sudo ls -al /etc/letsencrypt/live/sample.com
total 8
drwxr-xr-x 2 root root 4096 12月 10 08:50 .
drwx------ 5 root root 4096  1月  6  2021 ..
lrwxrwxrwx 1 root root   33 12月 10 08:50 cert.pem -> ../../archive/sample.com/cert34.pem
lrwxrwxrwx 1 root root   34 12月 10 08:50 chain.pem -> ../../archive/sample.com/chain34.pem
lrwxrwxrwx 1 root root   38 12月 10 08:50 fullchain.pem -> ../../archive/sample.com/fullchain34.pem
lrwxrwxrwx 1 root root   36 12月 10 08:50 privkey.pem -> ../../archive/sample.com/privkey34.pem
```

シンボリックリンクファイルがあるので本体をコピーします  
`/etc/letsencrypt/archive/sample.com/*34.pem` にありました

`*34.pem` の数字を取っておきます

```
cert.pem
chain.pem
fullchain.pem
privkey.pem
```

これは新しいサーバーの適当な場所へおいておきます（後で不要になります）
`/home/user/certificates` にでもおいておきます

Nginx conf の証明書の場所を `/home/user/certificates` に変えておきます

```
server {
  root /usr/share/nginx/sample.com;
  index  index.html index.htm;

  listen 443 ssl;
  server_name sample.com;

  ssl_certificate /home/user/certificates/fullchain.pem;
  ssl_certificate_key /home/user/certificates/privkey.pem;
  ssl_dhparam /etc/ssl/private/dhparam.pem;

  # 省略
}
```

dhparam.pem も用意していたので、古いサーバーから持ってきて同じ場所においておきます

あとは表示するコンテンツを公開ディレクトリ(Nginx conf の root の場所)に置きます

これで Nginx reload

```
sudo systemctl reload nginx
```

DNS を変更して、古いサーバーから新しいサーバーに切り替えます  
A レコードの IP アドレスを新しいサーバーに替えました

## 確認

ブラウザでアクセスして表示されるか確認します

## 証明書作成

問題なければ、Let's Encrypt で TLS 証明書を作成します  
心配であれば `--dry-run` をつけて確認するといいです

```
sudo certbot certonly --webroot -w /usr/share/nginx/sample.com -d sample.com -d www.sample.com
```

証明書が作成されます  
ブラウザから証明書を確認して、新しくなったことを確認します

証明書リニューアルのコマンドを打ちます

```
sudo certbot renew
```

こうしておけば、auto renewal されるはず

また、証明書情報が見たければ

```
sudo certbot certificates
```

で確認できます

## 片付け

一時的に用意した `/home/user/certificates` は不要なので消しましょう  

古いサーバーのTLS証明書も不要なので古いサーバーで  

```
sudo certbot delete --cert-name sample.com
```

して消しておきましょう

## まとめ

これであとは証明書の期限が切れるまえに auto renewal されてるか確認しましょう
