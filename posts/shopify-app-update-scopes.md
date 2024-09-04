---
title: 'Shopify appのscopesの変更を反映させる'
date: '2024-08-02'
updated: ''
---

Shopify appを久しぶりに作るのとになりました  
最新のShopify cliをいれるところから始め

```bash
$ shopify version
Current Shopify CLI version: 3.64.1
```

appのAPIのアクセス許可のscopesの設定を変えても反映されなくてはまりました

[Manage app config files](https://shopify.dev/docs/apps/build/cli-for-apps/manage-app-config-files) を読むとよかったです

だめだったときの `shopify.app.toml`

```toml
# This file stores configurations for your Shopify app.

scopes = "read_orders, write_products"
```

`shopify app config link` をすると、Shopify appの情報を取ってきて更新されます  
更新後の `shopify.app.toml`

```toml
# Learn more about configuring your app at https://shopify.dev/docs/apps/tools/cli/configuration

client_id = "xxxxxx"
name = "app-sandbox"
handle = "app-sandbox-1"
application_url = "https://example.com/"
embedded = true

[build]
include_config_on_deploy = true

[access_scopes]
# Learn more at https://shopify.dev/docs/apps/tools/cli/configuration#access_scopes
scopes = ""

[auth]
redirect_urls = [ "https://example.com/api/auth" ]

[webhooks]
api_version = "2024-07"

[[webhooks.subscriptions]]
topics = [ "app/uninstalled" ]
uri = "/webhooks"

[pos]
embedded = false
```

scopesを更新したら `shopify app deploy` で反映されました

アプリがどうなってるかは  [Shopify Partners](https://partners.shopify.com/) で確認できます  
アプリ選択 > Api Access

### まとめ

久しぶりにさわるとRemix化されてたり、変化が結構ありました

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
