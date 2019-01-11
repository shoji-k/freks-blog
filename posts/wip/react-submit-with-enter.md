---
title: "ReactでInputフォームのEnterキーで処理を行う"
date: "2019-12-31"
---

React version 16.4.2 でinputフォームでのEnterキーを押して処理をしたかった際、

```
<Input
  type="password"
  placeholder="input password"
  name="password"
  onKeyPress={e =>
    e.preventDefault()
    if (e.key == 'Enter') {
      signIn()
    }
  }
/>
```

としてたのですが、ホットリロードを入れると動かなかったり...

[React & event\.preventDefault\(\) – Eric Clemmons – Medium](https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46)  
を読んだりして
``` e.preventDefault() ```
を入れ忘れてました..

```
<Input
  type="password"
  placeholder="input password"
  name="password"
  onKeyPress={e =>
    if (e.key == 'Enter') {
      e.preventDefault()
      signIn()
    }
  }
/>
```

Enterキーのときだけにしないとキー入力できなくなってしまいます
