---
title: 'VSCode Dev Container内のShopify app起動エラー'
date: '2025-03-14'
updated: ''
---

Remix で Shopify app を開発しています  
新しいPCで環境を作って、VSCode Dev Containerの中で `shopify app dev` するとエラーが発生

```bash
 ╭─ error ──────────────────────────────────────────────────────────────────────────────────────────────────╮
 │                                                                                                          │
 │  EACCES: permission denied, open                                                                         │
 │  '/usr/local/share/npm-global/lib/node_modules/@shopify/cli/bin/cloudflared'                             │
 │                                                                                                          │
 │  What to try:                                                                                            │
 │    • Run the command again                                                                               │
 │    • Add the flag `--tunnel-url {URL}` to use a custom tunnel URL                                        │
 │                                                                                                          │
 ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

パーミッションがないらしいので付与してみました

```bash
sudo chown -R $(whoami) /usr/local/share/npm-global
```

これでもう一度試すと動きました

## まとめ

さくっと直せてよかったです  
ほかのところを疑ったりしがちです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
