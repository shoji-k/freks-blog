---
title: "Rails 6でknock gemが動かない"
date: "2019-08-19"
---

追記) 続編をかきました [Rails 6でknock gemが動かない - 続編](https://blog.freks.jp/rails6-knock-2)

新しく始めたプロジェクトでRails + Vue.jsの構成にしてみてて、  
Railsはapi mode、Vue.jsがフロントエンドで組みました  

Railsは 6.0.0 と 6.0.0pre2 の両方を試しました  

APIの認証にjwtを使ったので、  
[nsarno/knock: Seamless JWT authentication for Rails API](https://github.com/nsarno/knock)  
を採用したのですが、エラーも出ず動かず..  

新しいautoloader zeitwerk だと動かないようで

$ vim config/application.rb

```
config.autoloader = :classic
```

を追記、これで動くようにはなりました