---
title: 'Twig tips'
date: '2019-11-07'
---

## 使える変数をすべて見る

```
{{ dump() }}
```

こうするとキーだけ見られる

```
{{ dump(_context|keys) }}
```
