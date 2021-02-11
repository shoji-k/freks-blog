---
title: "JavascriptのMapを使う"
date: "2021-02-10"
---

JavascriptのMapを使わずに、ついObjectでやってしまっているので違いをまとめてみた

詳しくは
[Map \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)

上リンク内のMapのコードを引用しつつ整理してみます

```javascript
let contacts = new Map()
contacts.set('Jessie', {phone: "213-555-1234", address: "123 N 1st Ave"})
contacts.has('Jessie') // true
contacts.get('Hilary') // undefined
contacts.set('Hilary', {phone: "617-555-4321", address: "321 S 2nd St"})
contacts.get('Jessie') // {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.delete('Raymond') // false
contacts.delete('Jessie') // true
console.log(contacts.size) // 1
```

これをObject使うと

```javascript
let contacts = {}
contacts.Jessie = {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.hasOwnProperty('Jessie') // true
contacts.Hilary // undefined
contacts.Hilary = {phone: "617-555-4321", address: "321 S 2nd St"}
contacts.Jessie // {phone: "213-555-1234", address: "123 N 1st Ave"}
delete o.Raymond // true <- Mapと異なる結果
delete o.Jessie // true
Object.keys(o).length // 1
```

となり、Mapのほうが統一感あってよいです

さらにプロパティでループしたいとき、Mapだと

```javascript
for (let [key, value] of contacts) {
  console.log(key, value)
}
// Hilary {phone: "617-555-4321", address: "321 S 2nd St"}
```

もしくはforEachも使えるので

```javascript
contacts.forEach(function(value, key) {
  console.log(key, value)
})
// Hilary {phone: "617-555-4321", address: "321 S 2nd St"}
```

Objectだと

```javascript
for (let key of Object.keys(contacts)) {
  console.log(key, contacts[key])
}
// Hilary {phone: "617-555-4321", address: "321 S 2nd St"}
```

Mapのほうがすっきり書けます

MapはArrayと組み合わせても使えて

```javascript
let kvArray = [["キー1", "値1"], ["キー2", "値2"]];
let myMap = new Map(kvArray)
console.log(myMap)
// Map(2) {"キー1" => "値1", "キー2" => "値2"}
```

とArrayからMapを作れます  
MapからArrayにするには

```javascript
console.log(Array.from(myMap))
console.log([...myMap])
// [["キー1", "値1"], ["キー2", "値2"]]
```

のどちらでもできます
