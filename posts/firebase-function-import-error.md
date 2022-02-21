---
title: "firebase functionを読み込もうとしたときのエラー「'firebase' refers to a UMD global, but the current file is a module.」対策"
date: "2020-12-06"
updated: ""
---

Next.js + TypeScript + Firebase Firestore + Functions で開発中に

Next.js から Functions を叩きたくて  
[アプリから関数を呼び出す  \|  Firebase](https://firebase.google.com/docs/functions/callable)  
を参考に

```ts
import 'firebase/functions'

const addMessage = firebase.functions().httpsCallable('addMessage')
```

としたらエラーが発生します

```
'firebase' refers to a UMD global, but the current file is a module. Consider adding an import instead.
```

ぐぐっても TypeScript 定義を直すとかがでてきたのですが、解決方法は firebase も import するでした

```ts
import firebase from 'firebase'
import 'firebase/functions'

const addMessage = firebase.functions().httpsCallable('addMessage')
```
