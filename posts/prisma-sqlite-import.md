---
title: 'Prismaでsqliteのデータベースからスキーマを作る'
date: '2024-09-18'
updated: ''
---

prismaを入れます  

```bash
npm install --save-dev prisma
```

初期化します  

```bash
npx prisma init --datasource-provider sqlite
```

したあとにsqliteのデータベースファイルをルートディレクトリにコピー  
データベースからスキーマ作ろうとしたらエラーが出ました

```bash
$ npx prisma db pull
Prisma schema loaded from schema.prisma
Environment variables loaded from .env
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

✖ Introspecting based on datasource defined in schema.prisma
Error: 
P1003 The introspected database does not exist:
```

`./dev.db` を用意したのですが、置く場所が違いました  

`./prisma/dev.db` に置いたら成功しました

```bash
$ npx prisma db pull
Prisma schema loaded from prisma/schema.prisma
Environment variables loaded from .env
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

✔ Introspected 3 models and wrote them into prisma/schema.prisma in 30ms
      
Run prisma generate to generate Prisma Client.
```

ファイル場所間違えやすそうですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ejjJEu" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81TSrzkmecL._SY466_.jpg" alt="Next.js、Prisma、GraphQL Code Generatorで作るフルスタックWebアプリケーション 技術の泉シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Next.js、Prisma、GraphQL Code Generatorで作るフルスタックWebアプリケーション 技術の泉シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
