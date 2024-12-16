---
title: 'Docker containerが突然止まる問題'
date: '2021-01-06'
updated: ""
---

Wordpressをdockerで動かしていたのですが、たまにデータベースのコンテナが止まってしまっていました  
突然とまるDocker containerを調べてみました  

```
$ docker ps -a
  CONTAINER ID        IMAGE                              COMMAND                  CREATED             STATUS                        PORTS                   NAMES
  27d827db8545        wp_db                          "docker-entrypoint..."   34 hours ago        Exited (137) 16 minutes ago                           wp_db_1
```

こんな感じで `Exited (137)` になっています  
docker logsを見ても

```
$ docker-compose logs db
 Attaching to wp_db_1
 db_1   | 2020-12-27 03:30:17+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.22-1debian10 started.
 db_1   | 2020-12-27 03:30:19+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
 db_1   | 2020-12-27 03:30:19+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.22-1debian10 started.
 db_1   | 2020-12-27T03:30:19.949645Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.22) starting as process 1
 db_1   | 2020-12-27T03:30:20.001956Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
 db_1   | 2020-12-27T03:30:20.996085Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
 db_1   | 2020-12-27T03:30:21.103247Z 1 [System] [MY-011090] [Server] Data dictionary upgrading from version '80021' to '80022'.
 db_1   | 2020-12-27T03:30:22.371432Z 1 [System] [MY-013413] [Server] Data dictionary upgrade from version '80021' to '80022' completed.
 db_1   | 2020-12-27T03:30:22.735661Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
 db_1   | 2020-12-27T03:30:26.272914Z 4 [System] [MY-013381] [Server] Server upgrade from '80021' to '80022' started.
 db_1   | 2020-12-27T03:30:36.651501Z 4 [System] [MY-013381] [Server] Server upgrade from '80021' to '80022' completed.
 db_1   | 2020-12-27T03:30:37.064120Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
 db_1   | 2020-12-27T03:30:37.065141Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
 db_1   | 2020-12-27T03:30:37.083971Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
 db_1   | 2020-12-27T03:30:37.241077Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.22'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
 ```

 と何も残っていません  

 止まっていたcontainerをdocker commitしてimageにして起動、中身を探ってみましたが、手がかりなしでした  

 参考) [Dockerイメージのビルド中にExitedしたコンテナに入る方法 \- Namiking\.net](https://blog.namiking.net/post/2015/09/docker-exec-exited/)

 `docker ps -a` の status `Exited (137)` の137を調べてみると OOM killer動いていて、メモリ不足みたい

 参考) [Container fails with error 137, but no OOM flag set \(and there's plenty of RAM\) \- General Discussions \- Docker Forums](https://forums.docker.com/t/container-fails-with-error-137-but-no-oom-flag-set-and-theres-plenty-of-ram/69336)

1GBしかないサーバーで動かしていたので、アクセス集中したりすると、メモリ足りないのかもしれません  
サーバー増強してもいいのですが、お金産んでないWordPressなので、スワップ領域増やして様子見てみます

参考) [Linuxのメモリが足りないのでスワップ領域を増やす](/create-swap-area/)