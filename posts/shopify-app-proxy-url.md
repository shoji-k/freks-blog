---
title: 'Shopify App ProxyのURLを変更する'
date: '2025-02-25'
updated: ''
---

[ShopifyのApp Proxyを使ってみる](/shopify-app-proxy) でApp Proxyは用意しました  

[Display dynamic store data with app proxies](https://shopify.dev/docs/apps/build/online-store/display-dynamic-data) が公式ドキュメントですが、App ProxyのURLを変更する方法ではまったのでメモ  

`shopify.app.toml` の app proxy のURLを変更してデプロイします  
開発モードでURL自動変更する設定なら、`npm run dev` で変更が反映されます  

Shopify Partner Dashboard > App > Configuration > App proxy のところでURLが変更されたか確認できますし  
ここで手動でURLも変えられます  

![app proxy in partner console](/shopify-app-proxy-url/app-proxy-in-partner-console.webp)

ただ、ここだけ変えてもインストール済のアプリへ反映されません  

インストール済のアプリは、Shopifyの管理者コンソールへログイン  
Settings > Apps and sales channel > 対象のアプリ > App proxy のところにURLがあるのでこれを変更します  

![app proxy in app](/shopify-app-proxy-url/app-proxy-in-app.webp)

こっちの変更も必要でした

## まとめ

ドキュメントに見当たらなくてはまりました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
