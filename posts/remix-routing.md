---
title: '「世界の一流は「雑談」で何を話しているのか」を読んだ'
date: '2024-10-21'
updated: ""
---

Remixのルーティングを理解するため、かみ砕いていきます  
[Route File Naming \| Remix](https://remix.run/docs/en/main/file-conventions/routes) を見るのがいいですが、例が足りないと思うので補足
分かりにくかったところの例を足しています  

`app/route.tsx` が一番の大元のファイル  
その中の `<Outlet />` で続くファイルを読み込む  

ドットでURLが区切られ、`_` で始まるものはURLには現れません  

| ファイル                          | url      | layout                                      |
|-----------------------------------|----------|---------------------------------------------|
| app/routes/_index.tsx             | /        | --                                          |
| app/routes/landing.tsx            | --       | --                                          |
| app/routes/landing._index.tsx     | --       | --                                          |
| app/routes/landing.one.tsx        | /one     | app/routes/landing.tsx                      |
| app/routes/landing.one.two.tsx    | /one/two | app/routes/landing.tsx + app/routes/landing.one.tsx |

`/one/two` にアクセスしたときに  
`app/routes/landing.one.tsx` に `<Outlet >` がなかったら、`app/routes/landing.one.two.tsx` は読み込まれません  

`/one` にアクセスしたときに
`app/routes/landing.one.tsx` の `<Outlet >` は無視されます  

| ファイル                          | url      | layout                                      |
|-----------------------------------|----------|---------------------------------------------|
| app/routes/_auth.tsx             | --       | --                                          |
| app/routes/_auth.login.tsx       | /login       | app/routes/_auth.tsx                    |

`_` で始まるファイルはURLには現れないので、layoutファイルを変えることができます  

ただし、`_index.tsx` は特殊なファイルのため、`app/routes/_index.login.tsx` はできません  
`Index routes must not have child routes. Please remove all child routes from route path "/".` のエラーになります  

## まとめ

欲しかった系の本ではなかったです  
面白味はないけどビジネスマンには役立つのだと思います

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4dXq7Rb" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81+GCNCIJvL._SY466_.jpg" alt="世界の一流は「雑談」で何を話しているのか" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">世界の一流は「雑談」で何を話しているのか</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
