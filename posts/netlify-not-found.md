---
title: 'Netlify+React RouterでNot Foundになる'
date: '2019-05-03'
---

React でアプリを作っててローカルでは大丈夫なのに、Netlify でデプロイした環境だと、ダイレクトに URL にアクセスできなくなりました

![netlify not found](/netlify-not-found/netlify-not-found.png)

になります  
クリックして URL 遷移すると正しく動きます

使ってるパッケージは

- "react": "16.8.6",
- "react-router-dom": "5.0.0"

直し方は  
[Redirects \| Netlify](https://www.netlify.com/docs/redirects/#history-pushstate-and-single-page-apps)
ここでした

\_redirects ファイルを作って公開ディレクトリに置きました

```
/*    /index.html   200
```

これをデプロイすると解決
