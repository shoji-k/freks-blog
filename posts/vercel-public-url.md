---
title: 'Vercelのデプロイ後のURLを取得する'
date: '2020-11-26'
---

Next.jsで開発してて、`/pages/api` にAPIを立てたときに、フルのURLを取りたかったら、
Vercelの環境変数を設定することで、取れました

Vercelでプロジェクトを開いて、Project Settings > Environment Variables

![Vercel environment variables settings](/vercel-public-url/vercel-environment-variables.png)

Reference to System Environment Variable を選んで  
VERCEL_URLを選ぶと、好きな環境変数名で取れるようになります

ローカル環境で使うときは

```
vercel dev pull
```

でVercelで設定した環境変数が、`.env` にダウンロードされますが、VERCEL_URLは空になります  

```
const url = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'
```

として使いました  
Vercelにデプロイしたら、そのURLが入ってきます  

参考) [Environment Variables \- Vercel Documentation](https://vercel.com/docs/platform/environment-variables)
