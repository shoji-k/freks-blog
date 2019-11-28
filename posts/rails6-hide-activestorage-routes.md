---
title: 'Rails6でActiveStorage関連のroutes情報を非表示にする'
date: '2019-11-25'
---

Rails6 で ActiveStorage 関連の routes を表示しないようにしてみました

Rails 6.0.1 で確認

routes 一覧は

```
rails routes
```

のコマンドで表示されます

config/application.rb に以下を追記

```ruby
module App
  class Application < Rails::Application

    # 省略

    initializer(:remove_activestorage_routes, after: :add_routing_paths) do |app|
      app.routes_reloader.paths.delete_if { |path| path =~ /activestorage/ }
    end
  end
end
```

Active Storage を使うときにはもとに戻さないと行けないので注意
