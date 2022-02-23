---
title: 'PostgreSQL Tips'
date: '2019-10-30'
updated: ""
---

## エラーが起きたら止める

`--set ON_ERROR_STOP=on` をつける

```sql
psql --set ON_ERROR_STOP=on -U dbuser dbname -f sample.sql
```

## テーブルのバックアップをとる

```bash
pg_dump -U (user name) --table (table name) (db name) > backup.sql
```

-s -> スキーマだけ  
-a -> データだけ

データを戻すには

```bash
psql -U (user name) (db name) -f backup.sql
```

## データベースのバックアップをとる

```bash
pg_dump -U (user name) (db name) > database.sql
```

データを戻すには

```bash
psql -U (user name) (db name) -f database.sql
```

## データベースの文字コード確認

```sql
SELECT character_set_name FROM information_schema.character_sets;
 character_set_name
--------------------
 UTF8
(1 row)
```
