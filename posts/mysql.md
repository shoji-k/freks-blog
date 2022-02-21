---
title: "MySQL tips"
date: "2019-02-11"
updated: ""
---

## 文字コード変更

/etc/mysql/conf.d/custom.cnf を作る  

```
[mysqld]
character-set-server=utf8mb4

[client]
default-character-set=utf8mb4
```

## 文字コード確認

```
show variables like '%char%';
```

## エラー

### authentication method unknown to the client [caching\_sha2\_password]

MySQL8から認証方式が変わって caching\_sha2\_password になった  
これを使ったほうがいいのだけど、前の方式に戻すには my.cnf などに

```
[mysqld]
default_authentication_plugin=mysql_native_password
```

とする

## まとめ

順次、足していきます
