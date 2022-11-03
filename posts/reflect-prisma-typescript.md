---
title: 'Prismaでスキーマ変更をTypeScriptに反映させる'
date: '2022-11-03'
updated: ''
---

VSCode で開発中に Prisma でスキーマ変更したあと

```bash
npx prisma db generate
```

とか

```bash
npx prisma db push
```

を実行すればいいのですが、いつまでたっても TypeScript が古いエラーを出すときは  
VSCode で

`Ctrl + Shift + P > Restart TS Server`

で反映されました
