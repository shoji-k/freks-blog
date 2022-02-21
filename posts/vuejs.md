---
title: 'Vue.js はじめ'
date: '2019-08-10'
updated: ""
---

Vue.js をやることになったので調べたことをまとめました

基本的には公式ドキュメントを読んでます  
[はじめに — Vue\.js](https://jp.vuejs.org/v2/guide/)

## 導入

src で直接 vue.js を読み込んで使える

```
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

1 ページだけ Vue.js を入れるのに便利  
ただ、仕事でアプリを作るんだったら、webpack が出てきてコンパイルする

Vue CLI v3 からは

```
vue create (app name)
```

で選択肢が出てくるので選んでいくと、ベースができる

## 基本

Vue インスタンスを HTML の id にくっつける  
data に渡したものが id つけた tag 内で使える

```
<div id="app">
{{ title }}
</div>

<script>
new Vue({
  data: {
    title: 'Hey yo'
  }
}).$mount('#app')
</script>
```

テンプレート構文で HTML のプロパティを操作できる  
プロパティ名に `v-bind:` をつける  
渡す値は data の値が渡せる

```
<div id="app">
  <button v-bind:title="buttonTitle" v-bind:disable="!canSend">Send</button>
</div>

<script>
new Vue({
  data: {
    buttonTitle: 'Hey yo',
    canSend: false
  }
}).$mount('#app')
</script>
```

filter で出力文字列を変換できる

```
<div id="app">
  {{ value | capitalize }}
</div>

<script>
new Vue({
  data: {
    value: 'abcde'
  },
  filters: {
    capitalize: function (s) {
      return s.toUpperCase();
    }
  }
}).$mount('#app')
</script>
```

computed で計算した値を返す  
これは再計算が必要になるまでキャッシュが効く

```
<div id="app">
  {{ salesPrice }}
</div>

<script>
new Vue({
  data: {
    price: 1000
  },
  computed: {
    salesPrice: function(n) {
      return this.price * 0.8
    }
  }
}).$mount('#app')
</script>
```

methods は関数を用意、キャッシュされず毎回計算される

```
<div id="app">
  <button v-on:click="send">Send</button>
</div>

<script>
new Vue({
  methods: {
    send: function(e) {
      alert('hello')
    }
  }
}).$mount('#app')
</script>
```

ディレクティブで DOM 操作ができる  
v-if は DOM 非表示、v-show は style="display: none"  
DOM 操作のほうがコストが高いので頻繁に変わるものは v-show

```
<div id="app">
  <p v-if="true">hey</p>
  <p v-show="false">yo</p>
</div>
```

ディレクティブで class と style

```
<div id="app">
  <p v-bind:class="{hey: true, yo: false}">hey</p>
  <p v-bind:style="{color: 'red', cursor: 'pointer'}">yo</p>
</div>
```

ディレクティブで for  
key をつけないと DOM の差分更新ができなくてパフォーマンスが悪くなる

```
<div id="app">
  <ul>
    <li v-for="item in items" v-bind:key="item.id">{{item.name}}</li>
  </ul>
</div>

<script>
new Vue({
  data: {
    items: [
      { id: 1, name: 'hey'},
      { id: 2, name: 'yo'},
    ]
  }
}).$mount('#app')
</script>
```

ディレクティブで入力値を受け取る  
v-on:input で入力するたびに変更を受け取り、v-on:change でフォーカスが外れたときに変更を受け取る  
v-on は@、v-bind は:だけに省略できる  
methods で関数セット用意

```
<div id="app">
  <input v-on:input="setValue" v-bind:value="value">
  <input @input="setValue" :value="value">
</div>

<script>
new Vue({
  data: {
    value: ''
  },
  methods: {
    setValue: function(e) {
      this.value = e.target.value
    }
  }
}).$mount('#app')
</script>
```

v-model を使うと v-on:input と v-bind:value をまとめて書ける

```
<div id="app">
  <input v-model="value">
</div>

<script>
new Vue({
  data: {
    value: ''
  }
}).$mount('#app')
</script>
```
