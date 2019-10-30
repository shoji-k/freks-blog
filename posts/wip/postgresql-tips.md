---
title: 'PostgreSQL Tips'
date: '2019-10-30'
---

## エラーが起きたら止める

`--set ON_ERROR_STOP=on` をつける

```sql
psql --set ON_ERROR_STOP=on -U dbuser dbname -f sample.sql
```
