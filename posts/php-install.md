---
title: "PHPのインストール"
date: "2019-01-16"
---

## phpenv

[phpenv](https://github.com/phpenv/phpenv)を使います  
(rbenvとコマンドがほぼ同じなので)  

Ubuntu 18.02で試しました  

Readmeの記載通りにインストール  

```
$ git clone git://github.com/phpenv/phpenv.git ~/.phpenv
```

Ubuntuを使っているので、.bashrcに追記

```
$ echo 'export PATH="$HOME/.phpenv/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(phpenv init -)"' >> ~/.bashrc
```

.bashrcを再読込

```
exec $SHELL -l
```

## install php-build

phpenv installを使うためにはruby-buildが必要  

```
$ git clone https://github.com/php-build/php-build $(phpenv root)/plugins/php-build
```

## phpをインストールする

```
$ php install -l
$ php install 7.3.1
```

足りないもののエラーが出たので  

```
$ sudo apt install libxml2-dev libbz2-dev libcurl4-openssl-dev libjpeg-dev libpng-dev libxslt-dev libzip-dev autoconf
```

が必要でした  
1つずつエラーを潰していったので大変でした..  

システム全体で使うphp versionの指定  

```
$ php global 7.3.1
```

これでphpが使えるようになりました  

