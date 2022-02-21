---
title: 'Rails 6でknock gemが動かない 続編'
date: '2019-12-17'
updated: ""
---

[Rails 6でknock gemが動かない \| freks blog](https://blog.freks.jp/rails6-knock/) の続編です  

今回試したのは

Rails 6.0.2  
knock 2.1.1  

Rails 6 のautloader zeitwerkを利用して動くようになったのでメモ  

$ vim config/application.rb

```
config.autoloader = :classic
```

としていた autoloader の設定を消してやります

[nsarno/knock: Seamless JWT authentication for Rails API](https://github.com/nsarno/knock) のREADME通り設定、エラーがでます    

```
NoMethodError:
undefined method `render_error' for #<Api::V1::TodosController:0x0000558e6dc82818>
Did you mean?  rendered_format
```

knock gem内で、zeitwerkのルールに合わないところがあるのだと思われ  
ApplicationControllerで定義したメソッドが呼べなくなっています

ApplicationController

```rb
class Api::V1::ApplicationController < ActionController::API
    include Knock::Authenticable

    def render_error(model)
    # 省略
    end
end
```

調べてみると..

[Rails 6 zeitwerk autoload problem with gem · Issue \#36381 · rails/rails](https://github.com/rails/rails/issues/36381#issuecomment-511185972)
を見つけました

$ vim config/initializers/eager_load_knock.rb

```
require "knock/version"
require "knock/authenticable"
```

を追記

さっそく試してみると動作しました！  