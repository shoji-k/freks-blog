---
title: 'TypeScriptで関数の引数の型を取る'
date: '2024-06-29'
updated: ''
---

```ts
function someFunc: (value: string) {
  return value;
}
```

という関数があったときに引数の型を取りたい場合は、以下のように書けます

```ts
type Value = Parameters<typeof someFunc>[0];
```

## まとめ

たまに使う時があります
