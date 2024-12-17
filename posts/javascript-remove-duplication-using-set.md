---
title: "JavascriptのSetでArrayの重複を除く"
date: "2021-02-11"
updated: ""
---

[JavascriptのMapを使う](/javascript-map/)で紹介したMapも便利ですが、Setも便利なので紹介します

詳しくは
[Set \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set)

> Set オブジェクトは、プリミティブ値やオブジェクト参照を問わず、あらゆる型で一意の値を格納できます

なので

```javascript
let mySet = new Set()

mySet.add(1)           // Set [ 1 ]
mySet.add(5)           // Set [ 1, 5 ]
mySet.add(5)           // Set [ 1, 5 ] // 重複した値は増えない
```

という使い方です、これを利用し、Arrayの重複を省きたいときに

```javascript
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
console.log([...new Set(numbers)])
// [2, 3, 4, 5, 6, 7, 32]
```

と使えて便利です

あとは、集合演算に使えるのが便利そうです  
[Set \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations)
