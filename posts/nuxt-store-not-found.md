---
title: 'Nuxt + Vuexで $store not found になった'
date: '2020-01-04'
---

Nuxtちょっとやってみるかと思って、Todoアプリ作ってたんですが
NuxtでVuexを使う際に `$store not found` になって少しハマりました  
原因はシンプルで

before

```vue
computed: {
  todos: () => {
    return this.$store.state.todos.list
  }
},
```

after

```vue
computed: {
  todos() {
    return this.$store.state.todos.list
  }
},
```

だめだったほうは、allow function にしてました..  
うろ覚えでやるとだめですね

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07X6F1C2P&linkId=7de7d200e7d25b3722775773f374162f"></iframe>