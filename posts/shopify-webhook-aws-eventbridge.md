---
title: 'ShopifyでAmazon EventBridgeでWebhookを使う'
date: '2024-09-27'
updated: ''
---

AWS Consoleにログインして、Amazon EventBridgeを開きます  

Integration > Partner event sources を開いて `Shopify` を選びます

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge.webp)

手順が出るので上からやればいいようです  

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge-shopify.webp)

Step.2 はShopify Partner Consoleでやります  

Appを選んで Configuration の Amazon EventBridgeの項目のCreate Sourceを開きます

![AWS EventBridge](/shopify-webhook-aws-eventbridge/shopify-eventbridge.webp)

項目を入力、Create

![AWS EventBridge](/shopify-webhook-aws-eventbridge/shopify-eventbridge-form.webp)

AWS Consoleに戻り、Step.3、Partner event sourcesページを開きます  
すると先ほどShopify Partnerコンソールで作ったレコードができています  

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge-source-list.webp)

レコードを選んで `Associate with event bus` ボタンをクリック  

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge-source.webp)

チェック入れずにそのまま進めます  

AWS EventBridge側が用意できました  

shopify.app.toml の設定

```toml
[webhooks]
  topics = ["orders/create"]
  address = "https://events.us-east-1.amazonaws.com/..."
```

Ruleの作成

Build event pattern






PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
