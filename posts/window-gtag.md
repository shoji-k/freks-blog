---
title: 'window.gtagに型をつける'
date: '2024-11-05'
updated: ""
---

TypeScript + gtag.js を使っている環境で `window.gtag` がTypeScriptで未定義エラーになるので解決してみました  

## 解決方法

```bash
npm install @types/gtag.js
```

tsconfig.json にtypesを追加

```json
{
  "compilerOptions": {
    "types": ["gtag.js"]
  }
}
```

これで `Gtag.Gtag` が使えるようになります

```ts
declare global {
  interface Window {
    gtag: Gtag.Gtag;
  }
}
```

## まとめ

Google タグは導入してしまえば便利ですね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
