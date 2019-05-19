---
title: 'PostgreSQL in Docker のスロークエリを見てみる'
date: '2019-05-20'
---

開発環境の Docker の中の PostgreSQL のスロークエリが見たくなったので、設定してみました

[How to enable pg_stat_statements? · Issue \#177 · docker\-library/postgres](https://github.com/docker-library/postgres/issues/177)
を参考にしました

Docker image は [https://hub.docker.com/_/postgres postgres - Docker Hub] の 11 を使いました  
pull しておきます

```
$ docker pull postgres:11
```

PostgreSQL の pg_stat_statements を有効にするために  
pg_stat_statements.sh という名前で

```
#!/usr/bin/env bash
echo "shared_preload_libraries = 'pg_stat_statements'" >> $PGDATA/postgresql.conf
echo "pg_stat_statements.max = 10000" >> $PGDATA/postgresql.conf
echo "pg_stat_statements.track = all" >> $PGDATA/postgresql.conf
```

を保存  
Docker image 内の docker-entrypoint-initdb.d ディレクトリに入れとくと、起動時に呼ばれます

Dockerfile を書きます

```
FROM postgres:11

ADD pg_stat_statements.sh /docker-entrypoint-initdb.d
```

ビルドします

```
docker build -t your-name/postgres:10 .
```

-t の後ろは好きな名前にします

起動して一度、psql 内でコマンドを叩きます

```
CREATE EXTENSION pg_stat_statements;
```

そうすれば

```
SELECT query, calls, total_time, rows
     FROM pg_stat_statements ORDER BY total_time DESC LIMIT 3;
```

などの SQL でスロークエリが確認出来ます

参考) [スロークエリの分析 \| Let's Postgres](https://lets.postgresql.jp/documents/technical/query_analysis/1#pg_stat_statements)
