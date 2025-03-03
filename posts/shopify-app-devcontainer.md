---
title: 'VSCode Dev ContainerのShopify appがネットワークエラーになる'
date: '2025-03-03'
updated: ''
---

Shopify appをVSCode Dev Containerで動かしてみました  

Dev Containerの設定をして起動

```bash
npm run dev
```

すると、`shopify app dev` が起動して、Cloudflaredが使われて外部からアクセスできるURLが発行されます  
Shopifyの管理画面でそのShopify appを開くと、ネットワークエラーが発生

ターミナルを見てみると

```bash
Error forwarding web request: Error: connect ECONNREFUSED 127.0.0.1:46593
```

Docker containerが外からアクセスできないからみたいです  

`shopify app dev` は内部で `vite` が動いているので、`vite` の設定を変えてみました  

vite.config.ts を変更します  

```ts
  server: {
    host: true,
  }
```

`host: true` を追加しました

これでアクセスできるようになりました  
外部ネットワークからアクセスできるようになったので意味を理解して使いましょう

## まとめ

Shopify cliにちょっと詳しくなれました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
