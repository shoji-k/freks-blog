---
title: 'Shopify App Proxy Calculate a digital signature Remix TypeScript版'
date: '2025-02-21'
updated: ''
---

[ShopifyのApp Proxyを使ってみる](/shopify-app-proxy) でApp Proxyは用意しました  

[Display dynamic store data with app proxies](https://shopify.dev/docs/apps/build/online-store/display-dynamic-data)  
の Calculate a digital signature を Remix で作った Shopify app でやってみます

Rubyのコードを TypeScript で書き換え

```typescript
import crypto from 'crypto';

// Shopify Partner Dashboard > App > Client secret から取得
const SHARED_SECRET = "abcd"; // TODO: 環境変数などに保存してコードに書かないようにする

function isValidDigitalSignature(url: URL) {
  const queryParams = Object.fromEntries(url.searchParams);

  const signature = queryParams.signature;
  delete queryParams.signature;

  const sortedParams = Object.keys(queryParams)
    .sort()
    .map((key) => `${key}=${queryParams[key]}`)
    .join("");

  const calculatedSignature = crypto
    .createHmac("sha256", SHARED_SECRET)
    .update(sortedParams)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(calculatedSignature, "hex"),
  );
}
```

SHARED_SECRETは、Shopify Partner Dashboard > App > Client secret から取得します  
環境変数とかにしてコードに書かないようにするのが良いです  

これで不正なアクセスをはじけるようになりました

## まとめ

公式ドキュメントにあったらいい内容でした

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
