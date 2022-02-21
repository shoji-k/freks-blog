---
title: 'EC-CUBE 2のドメインを変更する'
date: '2021-01-07'
updated: ""
---

EC-CUBE 2のドメインを変更してみました  
ただし、動作確認用でずっと稼働しているものはないです  

構成は、Dockerで

- php:5-apache(古いのであげないと..)にEC-CUBE 2を入れたもの
- データベース用

のcontainerを使って、Nginxで外からのアクセスを受けています  
sakura vpsにおいていたものです  

ドメインは、持っているドメインのサブドメインを用意しました  
記事内は、`dev.sample.com`にしています

カード決済環境がTLS必須のため、https化をLet's Encryptつかってやります  

EC-CUBE 2のエラー`data/logs/error.log`を見つつ、コードを読みながら戦いました  

### httpでアクセスできるようにする

まず、EC-CUBE 2にべた書きされているURLを変更します

$ vim config/config.php

```
define('HTTP_URL', 'http://dev.sample.com');
define('HTTPS_URL', 'https://dev.sample.com');
```

Nginxでhttpで受けられるようにします  
Nginx confファイルを新しく用意しました  

$ vim /etc/nginx/conf.d/dev.sample.com.conf

```
upstream dev.sample.com {
  server 127.0.0.1:10080;
}

server {
  server_name dev.sample.com;

  index index.php index.html index.htm;

  access_log  /var/log/nginx/dev.sample.com-access.log  main;
  error_log  /var/log/nginx/dev.sample.com-error.log warn;

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }

  location = /favicon.ico {
    access_log off;
  }

  location = /robots.txt {
    allow all;
    log_not_found off;
    access_log off;
  }

  location = /.well-known/ {
    access_log           off;
    log_not_found        off;
    autoindex            off;
    try_files            $uri $uri/ =404;
  }

  location ^~ /.well-known/ {
    access_log           off;
    log_not_found        off;
    root                 /usr/share/nginx/html;
    autoindex            off;
    index                index.html;
    try_files            $uri $uri/ =404;
  }

  location ~ /\.ht {
      deny  all;
  }

  location / {
    try_files $uri @app;
  }

  location ~* \.php$ {
    proxy_pass http://dev.sample.com;
  }

  location @app {
    proxy_pass http://dev.sample.com;
  }
}
```

これでNginxをreloadすると画面表示できました  

しばらく動かなくてはまったのが

```
upstream dev.sample.com {
```

のところをドメインと同じにしないとエラーがでてだめでした　　

### https化する

[certbot](https://certbot.eff.org/instructions)を入れていたので使います    

$ certbot --nginx

で、今回のドメイン `dev.sample.com` を選ぶと、Nginx confを書き換えてくれます

```
upstream dev {
  server 127.0.0.1:10080;
}

server {
  server_name dev.sample.com;

  index index.php index.html index.htm;

  access_log  /var/log/nginx/dev.sample.com-access.log  main;
  error_log  /var/log/nginx/dev.sample.com-error.log warn;

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }

  location = /favicon.ico {
    access_log off;
  }

  location = /robots.txt {
    allow all;
    log_not_found off;
    access_log off;
  }

  location = /.well-known/ {
    access_log           off;
    log_not_found        off;
    autoindex            off;
    try_files            $uri $uri/ =404;
  }

  location ^~ /.well-known/ {
    access_log           off;
    log_not_found        off;
    root                 /usr/share/nginx/html;
    autoindex            off;
    index                index.html;
    try_files            $uri $uri/ =404;
  }

  location / {
    try_files $uri @app;
  }

  location ~* \.php$ {
    proxy_pass http://dev;
  }

  location @app {
    proxy_pass http://dev;
  }

  location ~ /\.ht {
      deny  all;
  }

  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/dev.sample.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/dev.sample.com/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

server {
    if ($host = dev.sample.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen 80;
  server_name dev.sample.com;
    return 404; # managed by Certbot
}
```

追加で

```
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
```

を足しました  
これでNginxをreloadすると、httpsで画面を表示することができました  

### 管理画面にログインできない

httpsにして管理画面にログインしようとすると、

```
不正なページ移動です。もう一度ご確認のうえ、再度入力してください。
```

とでて、ログイン失敗しました...

一旦キャッシュを消してみました

```
rm data/cache/*
rm data/Smarty/templates_c/default/*
```

画面にアクセスするとエラーが..

```
data/cache/../mtb_constants_init.php が存在しません
```

確かに `data/mtb_constants_init.php` のファイルがなくて、他の環境見ると存在してました  
.gitignoreで`data/mtb_constants_init.php`が設定されてて、なかったようなので、他の環境からコピーして  
git管理するように.gitignoreを変更しました  

もとのエラーに戻りました  

EC-CUBE2の`HTTP_URL`もhttpsにしたほうがいいらしい？のでしてみました

$ vim config/config.php

```
define('HTTP_URL', 'https://dev.sample.co.jp');
define('HTTPS_URL', 'https://sample.co.jp');
```

これでもまだだめだったので、

[リバースプロキシnginxにsslを設定した裏のEC\-CUBE 2で管理者ログインできない](https://blog.bgbgbg.net/archives/4260)  
の通りに対応してみました  

`data/require_base.php`の33行目辺りに

```
if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
    $_SERVER['HTTPS'] = 'on';
}
```

を追記  

### done

これでログインできるようになりました  
何回かやってる気がしますが、毎回苦労します  
