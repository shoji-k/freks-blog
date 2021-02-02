---
title: "Firebase Storageの保存バイト数を減らす"
date: "2021-02-02"
---


Firebase storageの保存バイト数が、アップロードしたファイルの割に大きすぎるのに気づきました

![storage usage](/reduce-firebase-function-storage/storage_usage.png)

アップロードしたファイルの容量合わせても10MBもないのに、570MBにもなっている

調べるとFirebase functionをデプロイする際に、docker containerが作られるらしくそのimageが残ってるらしい...

Firebaseの管理画面だとこれ以上のことがわからなかったのですが、
Firebaseの実態は、Google Cloud PlatformなのでGCPの管理画面で確認できました  

![google cloud platform storage](/reduce-firebase-function-storage/google-cloud-platform-storage.png)

URLだと https://console.cloud.google.com/storage/browser でプロジェクト選んだところです  

gcf-sources-626516263841-us-central1 は、Firebase Functionで必要なもの
xxxxx.appspot.com は、Firebase Storageでアップロードしたファイル  
が入ってました

us.artifacts.xxxxx.appspot.com	が docker containerが入っているっぽいです  
これを消すだけでもよさそうですが、毎回たまるのもいやなので自動で消えるようにしてみました

us.artifacts.xxxxx.appspot.com を選択、ライフサイクルを開く、ルールの追加

アクションの選択 > 削除  
オブジェクト条件の選択 > 日数 > 3日

にしてみました

![google cloud platform storage life event](/reduce-firebase-function-storage/google-cloud-platform-storage-life-event.png)