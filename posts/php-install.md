---
title: 'PHPのインストール'
date: '2019-01-16'
---

## phpenv

[phpenv](https://github.com/phpenv/phpenv)を使います  
(rbenv とコマンドがほぼ同じなので)

Ubuntu 18.02 で試しました

Readme の記載通りにインストール

```
$ git clone git://github.com/phpenv/phpenv.git ~/.phpenv
```

Ubuntu を使っているので、.bashrc に追記

```
$ echo 'export PATH="$HOME/.phpenv/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(phpenv init -)"' >> ~/.bashrc
```

.bashrc を再読込

```
exec $SHELL -l
```

## install php-build

phpenv install を使うためには ruby-build が必要

```
$ git clone https://github.com/php-build/php-build $(phpenv root)/plugins/php-build
```

## php をインストールする

```
$ phpenv install -l
$ phpenv install 7.3.1
```

足りないもののエラーが出たので

```
$ sudo apt install libxml2-dev libbz2-dev libcurl4-openssl-dev libjpeg-dev libpng-dev libxslt-dev libzip-dev autoconf
```

が必要でした  
1 つずつエラーを潰していったので大変でした..

システム全体で使う php version の指定

```
$ phpenv global 7.3.1
```

これで php が使えるようになりました
