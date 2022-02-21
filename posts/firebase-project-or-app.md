---
title: "開発用と本番用のFirebaseを分けるにはプロジェクトごと分けるのが良さそう"
date: "2020-12-21"
updated: ""
---

開発中に使っているFirebaseと本番リリースするFirebaseを分けるときに迷ったので調べました

プロジェクトごと分けるか、アプリの追加があるので分けるか、どちらかでしたが、結論はプロジェクトごと分ける、でした

[Firebase プロジェクトについて理解する](https://firebase.google.com/docs/projects/learn-more?hl=ja#best-practices)
に

```
一般に、アプリ間で同じデータと構成を共有しないのであれば、それぞれのアプリを異なる Firebase プロジェクトに登録することを強くおすすめします。
```

とあります  

アプリも追加を試しましたが、変わるのは

```
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxxx.firebaseio.com",
  projectId: "xxxxxxxxxxxx",
  storageBucket: "xxxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxx"
};
```

のappIdとmeasurementIdだけで、AuthやFirestoreごと分けたい用途にはあいませんでした