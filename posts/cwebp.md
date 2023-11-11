---
title: 'cwebpで画像をWebPに変換する'
date: '2023-11-11'
updated: ''
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
