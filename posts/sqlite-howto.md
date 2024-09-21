---
title: 'SQLiteの使い方'
date: '2024-09-22'
updated: ''
---

[SQLite](https://www.sqlite.org/)の使い方をまとめます

`sqlite3`のコマンドを使います

入ってなかったら入れます

Ubuntuだと

```bash
sudo apt install sqlite3
```

で入ります

`dev.db` のsqliteファイルがあるとすると  
データベースに接続するには

```bash
sqlite3 dev.db
```

あとは

```bash
.help
```

でコマンドが見れます

```bash
.tables
```

でテーブルが見れます

```bash
.schema (テーブル名)
```

でテーブルのスキーマが見れます

```bash
select * from (テーブル名);
```

## まとめ

最低限こんなところですかね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ejjJEu" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81TSrzkmecL._SY466_.jpg" alt="Next.js、Prisma、GraphQL Code Generatorで作るフルスタックWebアプリケーション 技術の泉シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Next.js、Prisma、GraphQL Code Generatorで作るフルスタックWebアプリケーション 技術の泉シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
