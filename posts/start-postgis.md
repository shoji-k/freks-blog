---
title: 'PostGISをDocker使ってさわってみた'
date: '2019-10-13'
updated: ""
---

[PostGIS](https://lets.postgresql.jp/documents/tutorial/PostGIS/1) をやらないといけなさそうで、Docker 使って触ってみました

## PostGIS とは

PostGIS を使うと、空間データが SQL で扱えるようになります  
詳しくは [PostGIS](https://lets.postgresql.jp/documents/tutorial/PostGIS/1) のリンクなどを参照

PostGIS だと空間データ用の関数が増え、

```
SELECT ST_Contains('POLYGON((0 0, 1 0, 1 1, 0 0))'::GEOMETRY,'LINESTRING(0 0, 1 0, 1 1, 0 0)'::GEOMETRY);
```

だと、POLYGON（多角形）と LINESTRING（直線、折れ線）が ST_Contains で交わっているかどうか、が SQL で確認できます  
結果は t (true) / f (false) で文字で返ってきます

POLYGON だとかは、[ジオメトリタイプ一覧をながめる](https://qiita.com/boiledorange73/items/6d1200b69b5d5c88bcd0) を参考にしました

## Docker 使って触ってみる

[mdillon/postgis \- Docker Hub](https://hub.docker.com/r/mdillon/postgis/) のイメージを使いました  
pull して sql を用意

```
docker pull mdillon/postgis
mkdir init
echo 'CREATE EXTENSION postgis;' > init/init.sql
```

docker run でオプション付けていってもいいですが、docker-compose.yml を用意しておくと便利

```
version: '3'

services:
  db:
    container_name: postgis_container
    image: mdillon/postgis
    environment:
      POSTGRES_DB: sampledb
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: password
    volumes:
    - ./pgdata:/var/lib/postgresql/data
    - ./init:/docker-entrypoint-initdb.d
```

これで

```
$ docker-compose up -d
```

で立ち上がります

動作確認してみます

```
$ docker exec -it postgis_container psql -U pguser sampledb
```

で、Docker 内の PostgreSQL につないで、SQL を流す

```
$ SELECT ST_Contains('POLYGON((0 0, 1 0, 1 1, 0 0))'::GEOMETRY,'LINESTRING(0 0, 1 0, 1 1, 0 0)'::GEOMETRY);
 st_contains
-------------
 f
(1 row)
```

と動作してそうです

ちなみにこのときの PostgreSQL のバージョンは

```
$ psql --version
psql (PostgreSQL) 11.2 (Debian 11.2-1.pgdg90+1)
```

## Shapefile を取り込んでみる

PostGIS には [Shapefile](https://blog.freks.jp/geospatial-data/) を取り込む shp2pgsql というツールがついているので取り込んでみます

shp2pgsql の使い方は

```
$ shp2pgsql -W (Shapefileの文字コード) -D -I -s 4612 (Shapefile名) (データベースの保存したいテーブル名)) > import.sql
-D -> dump形式でinsert形式にしない
-I -> 空間インデックスを貼る
-s 4612 -> 空間参照系のコード SRID を 4612 (JGD2000地理座標系) と指定
```

といったコマンドで、sql ファイルに吐き出せます  
空間参照系 4612 は、[PostGIS でよく使う SRID まとめ : してログ \- LANDHERE](http://landhere.jp/blog/a79.html) を参考にしました

さらに

```
-p -> スキーマだけ
-a -> データだけ
```

を付けられます

Shapefile は [統計 GIS データダウンロード \| 政府統計の総合窓口](https://www.e-stat.go.jp/gis/statmap-search?page=1&type=2&aggregateUnitForBoundary=A&toukeiCode=00200521&toukeiYear=2015&serveyId=A002005212015&prefCode=27&coordsys=1&format=shape) から大阪府をダウンロードしてきました

解凍するとファイルが 4 つあるので、Docker container から見える init ディレクトリに置いて、Docker container 内で実行します

```
$ docker exec -it postgis_container
$ cd docker-entrypoint-initdb.d
$ shp2pgsql -W cp932 -D -I -s 4612 h27ka27.shp sample_table > h27ka27.sql
```

これで SQL ファイルができたので、PostgreSQL に入れてみます

```
$ psql -U pguser sampledb -f h27ka27.sql
```

これでテーブルができました

```
\d sample_table;
                                         Table "public.sample_table"
   Column   |            Type             | Collation | Nullable |                        Default
------------+-----------------------------+-----------+----------+--------------------------------------------------------
 gid        | integer                     |           | not null | nextval('sample_table'::regclass)
 key_code   | character varying(11)       |           |          |
 pref       | character varying(2)        |           |          |
 city       | character varying(3)        |           |          |
 s_area     | character varying(6)        |           |          |
 pref_name  | character varying(12)       |           |          |
 city_name  | character varying(14)       |           |          |
 s_name     | character varying(96)       |           |          |
 kigo_e     | character varying(3)        |           |          |
 hcode      | smallint                    |           |          |
 area       | numeric                     |           |          |
 perimeter  | numeric                     |           |          |
 h27kaxx_   | integer                     |           |          |
 h27kaxx_id | integer                     |           |          |
 ken        | character varying(2)        |           |          |
 ken_name   | character varying(12)       |           |          |
 sityo_name | character varying(22)       |           |          |
 gst_name   | character varying(14)       |           |          |
 css_name   | character varying(14)       |           |          |
 kihon1     | character varying(4)        |           |          |
 dummy1     | character varying(1)        |           |          |
 kihon2     | character varying(2)        |           |          |
 keycode1   | character varying(9)        |           |          |
 keycode2   | character varying(9)        |           |          |
 area_max_f | character varying(1)        |           |          |
 kigo_d     | character varying(2)        |           |          |
 n_ken      | character varying(2)        |           |          |
 n_city     | character varying(3)        |           |          |
 kigo_i     | character varying(1)        |           |          |
 moji       | character varying(96)       |           |          |
 kbsum      | smallint                    |           |          |
 jinko      | bigint                      |           |          |
 setai      | bigint                      |           |          |
 x_code     | numeric                     |           |          |
 y_code     | numeric                     |           |          |
 kcode1     | character varying(7)        |           |          |
 geom       | geometry(MultiPolygon,4612) |           |          |
Indexes:
    "sample_table_pkey" PRIMARY KEY, btree (gid)
    "sample_table_geom_idx" gist (geom)
```

データ数は

```
select count(*) from sample_table;
 count
-------
  8897
(1 row)
```

sample_table の geom カラムに MultiPolygon データが入っているのである緯度経度を含む丁目を調べてみると

```
select gid, key_code, pref, city, s_area, pref_name, city_name, s_name from sample_table where ST_Intersects(ST_GeomFromText('POINT(135.4810096 34.677329)', 4612), geom::geometry) <> 'f';

 gid |  key_code   | pref | city | s_area | pref_name | city_name |    s_name
-----+-------------+------+------+--------+-----------+-----------+--------------
 188 | 27106012001 | 27   | 106  | 012001 | 大阪府    | 西区      | 千代崎１丁目
(1 row)
```

こんな感じで取れました  
POINT の指定は、ST_GeomFromText をかまして SRID を同じものを指定してあげないと動作しませんでした

プログラムを書いて判定するのは大変そうですが、これだと高速で動くのでよさそうです


