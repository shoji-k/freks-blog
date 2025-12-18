---
title: 'モバイルブラウザでタイトルとURLをコピーする'
date: '2025-12-18'
updated: ''
---

PCブラウザだとChrome拡張とかでタイトルとURLをコピーできて便利です  
[Create Link](https://chromewebstore.google.com/detail/create-link/gcmghdmnkfdbncmnmlkkglmnnhagajbm?hl=ja) を使っています

スマホのブラウザだとChrome拡張とかが入れられないので不便です  
javascriptスニペットでタイトルとURLをコピーしてみます

```js
javascript:(() => {
  const u = location.origin + location.pathname;
  const t = document.title;
  const text = `[${t} ${u}]`;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const ok = document.execCommand("copy");
    if (!ok) throw new Error();
  } catch {
    alert("Failed to copy to clipboard.");
  } finally {
    document.body.removeChild(textarea);
  }
})();
```

minimizeしたものが

```js
javascript:(()=>{const t=document.title,u=location.origin+location.pathname,a=document.createElement("textarea");a.value=`[${t} ${u}]`;document.body.append(a);a.select();document.execCommand("copy");a.remove()})();
```

ちょこっと解説すると、タイトルとURLをメディアウィキ形式 例 `[url title]` でコピーします  
`navigator.clipboard.writeText` はボタン押した後のイベントなどで使えて、いきなり使えないので一工夫  
一旦、textareaを作ってタイトルとURLを保持、それをコピーすることでクリップボードに入れてます  

使い方はjavascriptスニペットをコピーして、モバイルブラウザのブックマークに保存  

Google ChromeとかBraveだと、どのページでもいいのでブックマーク  
ブックマークの編集でタイトルをcopy(なんでもいいが後で打ちやすいもの)、URLにjavascriptスニペットを保存します  

タイトルとURLをコピーしたいページを開いて、URLバーに `copy` を打つと候補に出てくるjavascriptスニペットを選択  
これでコピーされます  
URLバーに `javascript: ~~~` と打ち込むのと同じ動きです  

モバイルブラウザBravenの例  

<img src="/copy-title-in-mobile/brave.png" width="300" style="width: 300px; border: 1px solid #ccc;" alt="">

ブックマークの選択では動きませんでした  

### markdown版

```js
javascript:(() => {
  const u = location.origin + location.pathname;
  const t = document.title;
  const text = `[${t}](${u})`;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const ok = document.execCommand("copy");
    if (!ok) throw new Error();
  } catch {
    alert("Failed to copy to clipboard.");
  } finally {
    document.body.removeChild(textarea);
  }
})();
```

minimizeしたものが

```js
javascript:(()=>{const t=document.title,u=location.origin+location.pathname,a=document.createElement("textarea");a.value=`[${t}](${u})`;document.body.append(a);a.select();document.execCommand("copy");a.remove()})();
```

## まとめ

モバイルでもChrome拡張とか使える用になったらいいですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MxHA7x" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
