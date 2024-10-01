---
title: 'ShopifyでAmazon EventBridgeでWebhookを使う'
date: '2024-09-30'
updated: ''
---

ShopifyのWebhookをAmazon EventBridgeを使う方法を試してみました  

[Subscribe to a webhook topic](https://shopify.dev/docs/apps/build/webhooks/subscribe/get-started?framework=remix&deliveryMethod=eventBridge)  
が公式のドキュメントですが、これだけだと分からなかったので、いろいろ調べてやってみました  

## 事前準備

Shopify appを作っておきます
Shopify Partner Consoleで変更してたら、手元のShopify appに反映させたいので

```bash
npm run dev -- --reset
```

しておきます

## AWSコンソールでAmazon EventBridgeを作成

AWS Consoleにログインして、Amazon EventBridgeを開きます  

Integration > Partner event sources を開いて `Shopify` を選びます

<img src="/shopify-webhook-aws-eventbridge/aws-eventbridge.webp" alt="AWS EventBridge" style="width: 40rem;" />

手順が出るので上からやればいいようです  

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge-shopify.webp)

Step.1のAWS account IDを控えておきます  
ログインユーザー固有のものでここでなくても見れます　　

Step.2 はShopify Partner Consoleでやります  

## Shopify Partner ConsoleでAmazon EventBridgeの設定

Shopify Partner Consoleを開きます  
用意しておいたShopify appを選んでConfiguration > Amazon EventBridge > Create Sourceを開きます

![Amazon EventBridge](/shopify-webhook-aws-eventbridge/shopify-eventbridge.webp)

項目を入力、Create

![Create EventBridge](/shopify-webhook-aws-eventbridge/shopify-eventbridge-form.webp)

これでAWS EventBridgeのレコードができているはずです

## AWS管理画面でAmazon EventBridgeの設定

AWS Consoleに戻りStep.3の作業をします  
Partner event sourcesページを開きます  
すると先ほどShopify Partnerコンソールで作ったレコードができています  

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge-source-list.webp)

レコードを選んで `Associate with event bus` ボタンをクリック  

![AWS EventBridge](/shopify-webhook-aws-eventbridge/aws-eventbridge-source.webp)

チェック入れずにそのまま進めます  

AWS EventBridge側が用意できました  

Amazon EventBridge > Partner event sources のできたレコードを選んでPartner event source ARNを控えておいて次のaddressに使います  

![AWS EventBridge detail](/shopify-webhook-aws-eventbridge/eventbridge.webp)

## Shopify Appの設定

手元のShopify appのソースコードを開きます  

shopify.app.toml の設定

```toml
[webhooks]
  topics = ["orders/create"]
  address = "arn:aws:events:us-east-2::event-source/aws.partner/shopify.com/..."
```

`topics` にWebhookをしかけたいイベント、`address` に先ほど控えたPartner event source ARNを入れます  

手元の設定の変更をShopify Partner Consoleに反映させます

```bash
shopify app deploy
```

これでShopify AppでWebhookが動くようになりました

## AWS管理画面でAmazon EventBridgeのRuleを作成

Amazon EventBridge > Event buses で作られたレコードを選択

![event buses](/shopify-webhook-aws-eventbridge/event-buses.webp)

Ruleを作ります、Create Ruleをクリック

![Rule detail](/shopify-webhook-aws-eventbridge/rule-detail.webp)

用意したEvent busを選びます

![build event pattern](/shopify-webhook-aws-eventbridge/build-event-pattern.webp)

AWS events or EventBridge partner eventsを選択

![Sample event - optional](/shopify-webhook-aws-eventbridge/sample-event.webp)

Sample event - optionalは変更なし

![Event pattern](/shopify-webhook-aws-eventbridge/event-pattern.webp)

Use pattern formを選択  
Shopify > All Eventsを選択  

![target](/shopify-webhook-aws-eventbridge/select-target.webp)

Webhookを受けた先のターゲットを選びます  
今回は簡単に確認できるCloudWatch log groupにしておきました  
指定したグループが勝手に作られます  

![tag](/shopify-webhook-aws-eventbridge/tag.webp)

tagは任意で設定  

これでEventBridgeの設定は完了です  

## 動作確認

Shopify appを起動しておきます  

```bash
npm run dev
```

これで今回はOrderが作られたらWebhookを呼ぶようにしたので、Shopify管理画面からOrderを手動で作ってみます  

するとCloudWatch logにShopifyのイベントが表示されました  

![CloudWatch logs](/shopify-webhook-aws-eventbridge/cloudwatchlogs.webp)

## まとめ

知らないShopify WebhookとなれないAmazon EventBridgeで苦労しました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
