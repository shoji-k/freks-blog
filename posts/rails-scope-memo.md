---
title: "Railsのscopeでnilになる場合はallが返る"
date: "2018-12-18"
updated: ""
---

Railsで勘違いしていたのでメモ

```
class Post < ActiveRecord::Base
  scope :by_author, -> author { where(author: author) }
end
```

みたいなコードがあるときに

```
post = Post.by_author('Sample')
```

で、Sampleというauthorがいない場合、nilが返ってきそうだけど、allで返ってくる

参考) [ActiveRecord scope with first returns all records · Issue \#13647 · rails/rails](https://github.com/rails/rails/issues/13647)

バグを出してしまったので注意する
