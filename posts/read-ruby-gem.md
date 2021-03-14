---
title: 'Ruby gemの読み方'
date: '2021-03-13'
---

Ruby gem のコードを読むときにやっていること

### GitHub repository でざっと読む

[GitHub1s](https://github1s.com/) がブラウザ上で VSCode 動くので、さっと見るのに便利です

https://github.com/rails/rails だったら  
https://github1s.com/rails/rails に URL を変えてみます

他にも似たサービスはあるようです  

### 手元で読む

GitHub Repository を clone してくる、  
もしくは、すでに bundle install されて使っていたら

```
$ bundle info rails
  * rails (6.1.2.1)
        Summary: Full-stack web application framework.
        Homepage: https://rubyonrails.org
        Path: /home/user/.rbenv/versions/2.6.5/lib/ruby/gems/2.6.0/gems/rails-6.1.2.1
```

と、Gemfile のある場所で `bundle info` で場所がわかります  
`bundle open` でエディタで開くこともできます

実際に Gem を読むのは次の記事で  
[stripe-ruby-mock gem を読んでみた](/read-stripe-ruby-mock-gem)
