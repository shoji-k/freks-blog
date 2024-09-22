---
title: 'Prismaでの開発の進め方'
date: '2024-09-23'
updated: ''
---

prismaを入れます  
[Getting started with Prisma Migrate \| Prisma Documentation](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#create-a-baseline-migration) を参考にしました  

```bash
npm install --save-dev prisma
```

初期化します  

```bash
npx prisma init --datasource-provider sqlite
```

`.env` と `prisma/schema.prisma` が作られます  
`.env` は `.gitignore` に入れておいたほうがいいです  

`prisma/schema.prisma` が

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

になっています  

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

を追記して、データベースに反映していきます  
自分でかかずに、他のデータからインポートするときは [Prismaでsqliteのデータベースからスキーマを作る](/prisma-sqlite-import) にまとめてあります  

```bash
npx prisma migrate dev --name init
```

これで `prisma/migrations/20240921070138_init/migration.sql` ファイルが作らsqliteに反映されました  
sqliteのデータベースファイルは `./prisma/dev.db` に作られています  

sqliteつないでみるには [SQLiteの使い方](/sqlite-howto) を参考にしてください  

`prisma/schema.prisma` にmodelを増やしてみます

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  published Boolean @default(true)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```

```bash
npx prisma migrate dev --name add_post
```

これで `prisma/migrations/20240921070510_add_post/migration.sql` ファイルが作られました

`schema.prisma` を変更、`migrate dev` でマイグレーションファイルを作っていくのが基本でよさそうです  

## 特例

migrationファイルを作らずに、直接データベースを変更するには
  
```bash
npx prisma db push
```

一から環境を作るときにはすべてのマイグレーションファイルを適用するには

```bash
prisma migrate deploy
```

Prisma clientを生成するには

```bash
npx prisma generate
```

データベースをリセットしたかったら

```bash
npx prisma migrate reset
```

## まとめ

最低限抑えられたかとおもいます

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ejjJEu" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81TSrzkmecL._SY466_.jpg" alt="Next.js、Prisma、GraphQL Code Generatorで作るフルスタックWebアプリケーション 技術の泉シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Next.js、Prisma、GraphQL Code Generatorで作るフルスタックWebアプリケーション 技術の泉シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
