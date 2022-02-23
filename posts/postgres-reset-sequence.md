---
title: 'PostgreSQLのシーケンスをリセットする'
date: '2019-10-04'
updated: ""
---

PostgreSQL のシーケンスをリセットする方法を調べました

テーブルの定義を見てみます

```
> \d dtb_product
                                            Table "public.dtb_product"
       Column       |            Type             | Collation | Nullable |                 Default
--------------------+-----------------------------+-----------+----------+-----------------------------------------
 id                 | integer                     |           | not null | nextval('dtb_product_id_seq'::regclass)
 creator_id         | integer                     |           |          |
```

などなど項目が出てくるので、シーケンスは `dtb_product_id_seq` なのでリセット

```
select setval('dtb_product_id_seq', 1, false);
```

で、ID が 1 から始まります
引数 3 つめの `false` が `true` だと次の ID が 2 になります
