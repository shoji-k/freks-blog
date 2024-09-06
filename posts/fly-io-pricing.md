---
title: 'Fly.ioは無料でつかえなかった'
date: '2024-09-08'
updated: ""
---

[Fly.io](https://fly.io/)の料金表を見ると Pay As Yo Go プランが $0 / mon + Usage となってました

<img src="/fly-io-pricing/flyio-pricing.webp" alt="flo.io pricing" style="width: 20rem; height: auto;">

使った分だけ取られそうですが、Free allowanceあるし、無料でいけるかもと使ってました  

ある日ダッシュボードを見ると、課金されていました

[Fly\.io Resource Pricing · Fly Docs](https://fly.io/docs/about/pricing/) をよく読むと

`There are no free allowances on the Pay As You Go plan` とあり無料分なくなってました  

Machine1つで最低 `$0.0027 / hour` かかるし  
Volumeは `$0.15/GB per month of provisioned capacity` かかるようです

## まとめ

ドキュメントはちゃんと読みましょう

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
