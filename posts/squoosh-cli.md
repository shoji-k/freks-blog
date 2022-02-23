---
title: 'squoosh-cliで画像を軽量にしてみた'
date: '2022-02-21'
updated: ""
---

[WebP image format \| Can I use\.\.\. Support tables for HTML5, CSS3, etc](https://caniuse.com/webp) の通り、Webp がだいたいのブラウザで使えるので、このブログの PNG 画像を全部 Webp にしてみました

[squoosh/cli at dev · GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli)  
を使って、コマンドラインで一気に変換します

```bash
npm i -g @squoosh/cli
```

でグローバルに squoosh をインストール

かんたんな Ruby スクリプトで squoosh を実行して置換しました

<script src="https://gist.github.com/shoji-k/240ac05ff114af77557c79786ca1b3d0.js"></script>

squoosh-cli を動かすと Warning が出てしまうのですが、解決できず無視してます

squoosh-cli の例

```bash
"squoosh-cli --webp '{}' -d cloudwatch-logs cloudwatch-logs/*.png "
⠋ (node:6726) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 13 unpipe listeners added to [WriteStream]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)
(node:6726) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 13 error listeners added to [WriteStream]. Use emitter.setMaxListeners() to increase limit
(node:6726) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 13 close listeners added to [WriteStream]. Use emitter.setMaxListeners() to increase limit
(node:6726) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 13 finish listeners added to [WriteStream]. Use emitter.setMaxListeners() to increase limit
1/1 ✔ Squoosh results:
 cloudwatch-logs/cloudwatch-logs-list.png: 7.70KB
  └ cloudwatch-logs/cloudwatch-logs-list.webp → 8.55KB (111%)
```

あとは、記事内の png 拡張子を webp に変えてあげます  
ブログ記事が posts ディレクトリ内にマークダウンで書いてるので

```bash
find ./posts/ -type f -name "*.md" | xargs sed -i s/.png/.webp/g
```

あとは、変更の差分を見て、不要に変えてしまったところを直して対応完了  
画像サイズが削減されていい感じです
