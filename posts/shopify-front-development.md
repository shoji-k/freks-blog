---
title: 'Shopifyのユーザーページの改造'
date: '2024-09-21'
updated: ''
---

Shopifyでユーザーが使うフロント画面でデータをロードして、変更する機能を作りたいので調べています  

## theme app extensions

Shopifyが持っているデータを表示するなら  
[About theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions)  
が使えそうです  

[shopify theme extensionを作ってみる](/shopify-theme-extension) で試したようにProductのmetafieldの情報を出せたりします  

ただし  
[Restrictions | Theme app extension configuration](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration#restrictions)  
にあるようにContact information, Shipping method, Payment method, and Order statusページには使えません  

## app proxies

外部のデータを表示するなら `App proxy` が使えそうです  
[Display dynamic store data with app proxies](https://shopify.dev/docs/apps/build/online-store/display-dynamic-data)

## checkoutページ

Checkoutページをカスタマイズするには  
[Technologies for customizing Shopify checkout](https://shopify.dev/docs/apps/build/checkout/technologies)  

## Storefront API

## Subscription UI


PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
