---
title: 'ShopifyのApp Proxyを安全に使う'
date: '2024-10-01'
updated: ''
---

[ShopifyのApp Proxyを使ってみる](/shopify-app-proxy) でApp Proxyを試してみました  
誰でもAPIを呼べると困るのでどうなってるか調べてみました

App Proxyで `https://(your store).myshopify.com/apps/sample` のURLを用意しました  
Proxy経由後は `https://talented-duplicate-preferences-revolution.trycloudflare.com/sample` をたたくようになってます

## 直接Proxy経由後のAPIを呼ぶ

```bash
curl -L https://talented-duplicate-preferences-revolution.trycloudflare.com/sample
```

呼ばれたAPI側を見てみると

```bash
[shopify-app/INFO] Query does not contain a signature value.
```

でアクセスできません  



## まとめ


PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
