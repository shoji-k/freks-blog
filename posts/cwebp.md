---
title: 'cwebpで画像をWebPに変換する'
date: '2023-11-11'
updated: '2024-09-19'
---

[squoosh\-cliで画像を軽量にしてみた \| freks blog](/squoosh-cli/) で、npm package `@squoosh/cli` を使っていましたが開発とまってるようです

代わりに

[cwebp  \|  WebP  \|  Google for Developers](https://developers.google.com/speed/webp/docs/cwebp?hl=ja)

で、webpへの変換をしてみました

<https://chromium.googlesource.com/webm/libwebp>  
で、git cloneするかtarファイルをダウンロード、展開します

buildする手順は `doc/building` に含まれてます  
もしくは、[Building](https://chromium.googlesource.com/webm/libwebp/+/HEAD/doc/building.md) を見て

Linux使っていたので、Unix系のコマンド実行

```bash
make -f makefile.unix
```

`examples/cwebp` が作成されます

```bash
cp examples/cwebp /usr/local/bin
```

とかしておいて、`cwebp` コマンドが使えるようにしておきます

```bash
cwebp input.png -o output.webp 
```

とかでwebpファイルが作れます

いっきに置換したいなら  

```bash
find . -maxdepth 1 -name "*.jpg" -exec sh -c 'cwebp "$1" -o "${1%.jpg}.webp"' _ {} \;
```

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
