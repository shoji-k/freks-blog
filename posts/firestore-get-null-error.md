---
title: 'Firebase Storeで"FirebaseError: Null value error."ではまった'
date: '2021-01-04'
updated: ""
---

ローカルで、Next.js + Firebaseの開発をしていたときにFirebase Emulatorをつかってやっていました  

その際に

```
firebase.firestore().doc(path)
```

で確実に存在するのに

```
FirebaseError: Null value error. for 'get' @ L37
```

のエラーがでました  
意味がわからなくて、コードをこねくりまわしましたが、
Firebase Emulatorを使うのをやめたところ、

```
FirebaseError: Missing or insufficient permissions.
```

のエラーになりました  
firestore ruleに違反してただけでした...

[react\-firebase\-hooks](https://github.com/CSFrequency/react-firebase-hooks)使ってたりしてバグかと疑い、2時間くらい溶かしてしまいました...