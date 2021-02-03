---
title: 'Firebase Storageの保存バイト数を減らす'
date: '2021-02-04'
---

Firebase storage の保存バイト数が、アップロードしたファイルの割に大きすぎるのに気づきました

![storage usage](/reduce-firebase-function-storage/storage_usage.png)

アップロードしたファイルの容量合わせても 10MB もないのに、570MB にもなっている

調べると Firebase function をデプロイする際に、docker container が作られるらしくその image が残ってるらしい...

Firebase の管理画面だとこれ以上のことがわからなかったのですが、
Firebase の実態は、Google Cloud Platform なので GCP の管理画面で確認できました

![google cloud platform storage](/reduce-firebase-function-storage/google-cloud-platform-storage.png)

URL だと https://console.cloud.google.com/storage/browser でプロジェクト選んだところです

gcf-sources-626516263841-us-central1 は、Firebase Function で必要なもの
xxxxx.appspot.com は、Firebase Storage でアップロードしたファイル  
が入ってました

us.artifacts.xxxxx.appspot.com が docker container が入っているっぽいです  
これを消すだけでもよさそうですが、毎回たまるのもいやなので自動で消えるようにしてみました

us.artifacts.xxxxx.appspot.com を選択、ライフサイクルを開く、ルールの追加

アクションの選択 > 削除  
オブジェクト条件の選択 > 日数 > 3 日

にしてみました

![google cloud platform storage life event](/reduce-firebase-function-storage/google-cloud-platform-storage-life-event.png)

2 日後くらいに確認すると、無事数百 kB へ減っていました
