---
title: "PHPのDocker imageを作る"
date: "2019-02-10"
---

自分用のphp環境用Docker imagesを作ってみます  

[php \- Docker Hub](https://hub.docker.com/_/php) でimageの種類を確認  

Apache付きを使います   
いったんpull  

```
docker pull php:7.3-apache
```

apache.conf や php.iniを取り出します  

```
# いったんバックグラウンドで起動
$ docker run --name php73 -d php:7.3-apache

# 設定ファイルの場所確認
$ docker exec -it php73 bash

## php.ini探すには
> php -r "phpinfo();" | grep php.ini
Configuration File (php.ini) Path => /usr/local/etc/php
> ls /usr/local/etc/php
conf.d  php.ini-development  php.ini-production

# ファイルコピー
$ docker cp php73:/etc/apache2/apache.conf ./
$ docker cp php73:/usr/local/etc/php/php.ini-development ./
$ docker cp php73:/usr/local/etc/php/php.ini-production ./
```

Dockerfileはこんな感じにしました  

```
FROM php:7.3-apache
RUN a2enmod rewrite
RUN apt-get update \
  && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev libjpeg-dev fontconfig g++ libicu-dev libzip-dev \
  && docker-php-ext-install pdo_mysql mysqli mbstring iconv zip \
  && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
  && docker-php-ext-install -j$(nproc) gd \
  && docker-php-ext-install intl \
  && apt-get purge --auto-remove -y g++
COPY apache2.conf /etc/apache2/
# COPY php.ini-production /usr/local/etc/php/php.ini
COPY php.ini-development /usr/local/etc/php/php.ini
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
```

設定ファイルは自分好みに変えます  
ビルドします  

```
$ docker build -t shojik/php:7.3-apache .
```

動作確認します  
phpinfo() を見てみます

```
$ touch phpinfo.php
$ echo '<?php phpinfo();' > phpinfo.php
$ docker run --rm -d --name php73test -v $(pwd):/var/www/html -p 20080:80 shojik/php:7.3-apache
```

ブラウザでアクセスして確認  
http://xxxxx:20080/phpinfo.php  

問題なければコンテナを片付けます  

```
$ docker stop php73test
```

docker run のときに ```--rm``` をつけといたんで、止めるだけで消えます  
