---
title: 'stripe-cliのapt updateエラー'
date: '2024-06-06'
updated: ''
---

久しぶりに `sudo apt update` したらエラーが出ました

```bash
W: An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: https://packages.stripe.dev/stripe-cli-debian-local stable InRelease: The following signatures were invalid: EXPKEYSIG DEEBD57F917C83E3 Stripe <security@stripe.com>
W: Failed to fetch https://packages.stripe.dev/stripe-cli-debian-local/dists/stable/InRelease  The following signatures were invalid: EXPKEYSIG DEEBD57F917C83E3 Stripe <security@stripe.com>
W: Some index files failed to download. They have been ignored, or old ones used instead.
```

使っているUbuntuは

```bash
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.3 LTS
Release:        22.04
Codename:       jammy
```

Windows 11 のWSL2で使っています  

[Stripe CLI を使ってみる \| Stripe のドキュメント](https://docs.stripe.com/stripe-cli#install) の `apt` のところに解決法が書いてありました

> 2024 年 4 月 5 日に、Stripe は apt を使用して Stripe CLI をインストールできるように Stripe CLI の GPG キーを変更しました

次のコマンドを実行します

```bash
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
```

これで発生しなくなりました

<hr />

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4aRaXM2" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71soeH9BOlL._SY522_.jpg" alt="改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
