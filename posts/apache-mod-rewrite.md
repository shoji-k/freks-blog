---
title: 'ApacheでのURL設定'
date: '2019-09-11'
updated: ""
---

Apache 2.4 での mod_rewrite まとめます

公式ドキュメント [mod_rewrite \- Apache HTTP Server Version 2\.4](https://httpd.apache.org/docs/2.4/ja/mod/mod_rewrite.html)

## Debug するには

ログを出力します

Apache 設定ファイルに設定します
（デバッグが終われば外しましょう）

```
LogLevel info rewrite:trace8
```

[LogLevel のマニュアル](https://httpd.apache.org/docs/2.4/ja/mod/core.html#loglevel)

出力を確認します

\$ # tail -f error.log|fgrep '[rewrite:'

```
[Fri Sep 13 04:21:37.512162 2019] [rewrite:trace4] [pid 27] mod_rewrite.c(475): [client 125.170.226.165:60645] 125.170.226.165 - - [sample.com/sid#7f2fd9bc4d20][rid#7f2fd9b27fc8/initial/redir#1] [perdir /var/www/html/] RewriteCond: input='/var/www/html/index.php.html' pattern='-f' => not-matched, referer: http://sample.com/
[Fri Sep 13 04:21:37.512178 2019] [rewrite:trace3] [pid 27] mod_rewrite.c(475): [client 125.170.226.165:60645] 125.170.226.165 - - [sample.com/sid#7f2fd9bc4d20][rid#7f2fd9b27fc8/initial/redir#1] [perdir /var/www/html/] strip per-dir prefix: /var/www/html/index.php -> index.php, referer: http://sample.com/
[Fri Sep 13 04:21:37.512200 2019] [rewrite:trace3] [pid 27] mod_rewrite.c(475): [client 125.170.226.165:60645] 125.170.226.165 - - [sample.com/sid#7f2fd9bc4d20][rid#7f2fd9b27fc8/initial/redir#1] [perdir /var/www/html/] applying pattern '^' to uri 'index.php', referer: http://sample.com/
[Fri Sep 13 04:21:37.512228 2019] [rewrite:trace4] [pid 27] mod_rewrite.c(475): [client 125.170.226.165:60645] 125.170.226.165 - - [sample.com/sid#7f2fd9bc4d20][rid#7f2fd9b27fc8/initial/redir#1] [perdir /var/www/html/] RewriteCond: input='/var/www/html/index.php' pattern='!-d' => matched, referer: http://sample.com/
[Fri Sep 13 04:21:37.512252 2019] [rewrite:trace4] [pid 27] mod_rewrite.c(475): [client 125.170.226.165:60645] 125.170.226.165 - - [sample.com/sid#7f2fd9bc4d20][rid#7f2fd9b27fc8/initial/redir#1] [perdir /var/www/html/] RewriteCond: input='/var/www/html/index.php' pattern='!-f' => not-matched, referer: http://sample.com/
[Fri Sep 13 04:21:37.512266 2019] [rewrite:trace1] [pid 27] mod_rewrite.c(475): [client 125.170.226.165:60645] 125.170.226.165 - - [sample.com/sid#7f2fd9bc4d20][rid#7f2fd9b27fc8/initial/redir#1] [perdir /var/www/html/] pass through /var/www/html/index.php, referer: http://sample.com/
```

.htaccess でやってみた結果を載せます

まずは有効に

```
<IfModule mod_rewrite.c>
  RewriteEngine on
</IfModule>
```

以降は、IfModule の中だけ紹介します

## RewriteBase

RewriteBase ディレクティブは、ディレクトリ毎の書き換えにおいてベースとなる URL を明示的に指定するもの

```
RewriteBase /sample
```

## ファイルやディレクトリが存在しなければ、index.php を表示

```
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```
