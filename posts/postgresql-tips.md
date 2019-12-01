---
title: 'PostgreSQL Tips'
date: '2019-10-30'
---

## エラーが起きたら止める

`--set ON_ERROR_STOP=on` をつける

```sql
psql --set ON_ERROR_STOP=on -U dbuser dbname -f sample.sql
```

## テーブルのバックアップをとる

```sh
pg_dump -U (user name) --table (table name) (db name) > backup.sql
```

-s -> スキーマだけ  
-a -> データだけ

データを戻すには

```sh
psql -U (user name) (db name) -f backup.sql
```

## データベースのバックアップをとる

```sh
pg_dump -U (user name) (db name) > database.sql
```

データを戻すには

```sh
psql -U (user name) (db name) -f database.sql
```
