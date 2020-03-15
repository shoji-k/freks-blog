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

