---
title: 'ShopifyテーマでAdd to cartボタンを表示する方法'
date: '2023-09-07'
updated: ''
---

Shopify テーマの中で Add to cart ボタンを足す方法を調べました

ドキュメントを見ると
[Cart API reference](https://shopify.dev/docs/api/ajax/reference/cart)
という api があります

これを使ってフォームを実装すればカートに商品の追加はできるのですが、ヘッダーにあるカートアイコンに数量のバッチの更新がされません  
（リロードすれば更新される）

公式テーマをよく読むと  
`assets/product-form.js` [link](https://github.com/Shopify/dawn/blob/main/assets/product-form.js)  
というファイルがあり、この中で商品追加後の処理が書かれてました

HTML のカスタムエレメントで描かれているので、これをテーマ内で呼び出してあげれば使えます

呼び出し方は `snippets/buy-buttons.liquid` [link](https://github.com/Shopify/dawn/blob/main/snippets/buy-buttons.liquid) とかを参考にするとよさそうです

At to cart ボタンを表示するのに

```html
{% render 'buy-buttons', block: block, product: product, product_form_id:
product_form_id, show_pickup_availability: true %}
```

といったコードを書いてあげれば一旦表示はできます

見た目が気に入らなければ `snippets/buy-button.liquid` をコピーして新しい snippets を作るとかしてカスタマイズしてあげればいいです
