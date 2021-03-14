---
title: 'stripe-ruby-mock gemを読んでみた'
date: '2021-03-14'
---

[stripe\-ruby\-mock/stripe\-ruby\-mock: A mocking library for testing stripe ruby](https://github.com/stripe-ruby-mock/stripe-ruby-mock)
を読んでみました

stripe gem を mock してあげて、実際の Stripe にアクセスせずテストしやすくする gem です

読み方は [Ruby gem の読み方](/read-ruby-gem) にまとめてます

まずは [README\.md](https://github.com/stripe-ruby-mock/stripe-ruby-mock/blob/v3.1.0/README.md) をざっと読
む  
[stripe-ruby-mock.gemspec](https://github.com/stripe-ruby-mock/stripe-ruby-mock/blob/v3.1.0/stripe-ruby-mock.gemspec) を見て、依存している gem を確認  
gem のソースコードのディレクトリ構造やファイルをざっと見て把握

README に戻って、一番最初に `StripeMock.start` を呼んでるようなので該当するソースコードを探します  
grep して探しました

[stripe\-ruby\-mock/instance\.rb at v3\.1\.0 · stripe\-ruby\-mock/stripe\-ruby\-mock](https://github.com/stripe-ruby-mock/stripe-ruby-mock/blob/v3.1.0/lib/stripe_mock/api/instance.rb#L7)

```ruby
module StripeMock
  # 省略
  def self.start
    return false if @state == 'live'
    @instance = instance = Instance.new
    Stripe::StripeClient.send(:define_method, :execute_request) { |*args, **keyword_args| instance.mock_request(*args, **keyword_args) }
    @state = 'local'
  end
```

`Stripe::StripeClient.send` で stripe-ruby gem のメソッド呼び出しを乗っ取っているようです

StripeMock.Instance を呼び出しているので、そのファイルを読みます  
[lib\/stripe_mock\/instance.rb](https://github.com/stripe-ruby-mock/stripe-ruby-mock/blob/HEAD/lib/stripe_mock/instance.rb)

これに処理が色々書かれているのがわかります

`include StripeMock::RequestHandlers::Cards` などたくさん読んでて、`\lib\stripe_mock\request_handlers\*` に stripe-ruby の代わりになる処理を書いているようです

何ができるかざっと知りたいときは、[テストコード](https://github.com/stripe-ruby-mock/stripe-ruby-mock/tree/v3.1.0/spec)を読むのも参考になります

Stripe Refunds で payment intent での処理がなかったので PR 送りたかったのですが、すでにありました  
[Adds some basic call/response mocking of refunds for payment intents by hammerdr · Pull Request \#732 · stripe\-ruby\-mock/stripe\-ruby\-mock](https://github.com/stripe-ruby-mock/stripe-ruby-mock/pull/732/files)

取り込まれてほしいんですが、README にあるように手が足りないそうです
