---
title: 'GA4をReact.jsで使ってみる'
date: '2024-11-07'
updated: ''
---

Google Analytics 4 (GA4) をReact.jsで使ってみました  
Vite + TypeScript + React.jsの構成、ライブラリは使わずにやります  

GA4の準備は [GA4を使ってみる](/ga4) で用意したものを使います  

## 下調べ

Google検索やChatGPTでざっとみましたが、古い情報な気がしたので公式ドキュメントを見ます  

[Measure single\-page applications  \|  Google Analytics  \|  Google for Developers](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=en&implementation=browser-history)

SPAの場合は、History APIを使ってトラッキングできるようです  
[React Router v6](https://reactrouter.com/en/6.27.0) を使って、`createBrowserRouter` でルーティングすればよさそうです  

1箇所、Google Analyticsの設定が必要そうなので見ます

## Google Analyticsの設定

Settings > Data collection and modification > Data Streams > Web でプロパティを選んで  
Events > Enhanced measurement の設定 > Page views で Show advanced settings を開く  

Page changes based on browser history events にチェックを入れます  
これでHistory APIのトラッキングできるようです

## コード追加

React.jsのコンポーネントにGoogle Tag Managerを追加します  
フックの形にしました  

```tsx
import { useEffect } from 'react';

function initialize(gtmId: string) {
  const script = document.createElement('script');
  script.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.cssText = 'display:none;visibility:hidden';
  noscript.appendChild(iframe);

  document.body.prepend(noscript);
}

export function useGTM() {
  const GTM_ID = import.meta.env.VITE_GOOGLE_TAB_MANAGER_ID;

  useEffect(() => {
    if (GTM_ID) {
      initialize(GTM_ID);
    }
  }, [GTM_ID]);
}
```

react-router-domを読み込んだあとくらいに `useGTM()` を読み込めばトラッキングのコードが挿入されます

あとは環境変数 `VITE_GOOGLE_TAB_MANAGER_ID` に Google Tag ManagerのIDを設定します  
`.env`に追記するとかデプロイ先のサーバーに設定するとかですね

あとは動かしてみて計測されたら完了です  

前はlocalhostで動かすと計測されなかった気がしますが、今回は計測されました

## まとめ

この手の調べ物はGoogle検索とか古い情報が使えないのでいまだに公式ドキュメントを見るのがいいですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MGfCq3" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81AziSQNDUL._SY522_.jpg" alt="How Google Works (日本経済新聞出版)" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">How Google Works (日本経済新聞出版)</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
