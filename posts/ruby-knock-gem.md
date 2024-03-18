---
title: 'knock gemのコードリーディングをしてみる'
date: '2024-03-18'
updated: ''
---

すでにArchivedされているgemですが  
[nsarno/knock: Seamless JWT authentication for Rails API](https://github.com/nsarno/knock)  
を読み解いてみます

GitHub repositoryをgit cloneして手元の好きなエディタでコードを読んでもいいですが、お気軽に
<https://vscode.dev/github/nsarno/knock/>  
にアクセスして読んでみます

GitHubにあれば、`https://vscode.dev/github/(username)/(repository)`でブラウザ上のVSCodeで開いてコードを読むことができ便利

## Gemの概要と使い方の流れ

knock gemは、ログイン時にjwtを発行してログイン管理するgemです

まずはREADME.mdを読む

ログインに使うモデル（Userモデルとか）に `has_secure_password` が必要

[ActiveModel::SecurePassword::ClassMethods has_secure_password](https://api.rubyonrails.org/v7.1.3.2/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password)

一番親のApplicationControllerに `include Knock::Authenticable` を追加

```ruby
class ApplicationController < ActionController::API
  include Knock::Authenticable
end
```

そして使うコントローラーに `before_action :authenticate_user` を追加

```ruby
class SecuredController < ApplicationController
  before_action :authenticate_user

  def index
    # etc...
  end

  # etc...
end
```

これでログインしてないとアクセスできないようになります

<https://github.com/nsarno/knock/blob/master/app/controllers/knock/auth_token_controller.rb> の create に `email` と `password` を送信すると、jwtが返ってきます

実際に使うには

```ruby
# routes.rb

post 'user_token' => 'user_token#create'
```

user_token_controller.rb を用意

```ruby
class UserTokenController < Knock::AuthTokenController
end
```

として POST /user_token に email と password を送信すると

```json
{
  "jwt": "eyJ0xxxxxxxxxxxxxx"
}
```

といったjwtが返ってきます

そしてアクセスしたいapiのheaderに

`Authorization: Bearar eyJ0xxxxxxxxxxxxxx` と先ほど取得したjwtをつけて送信するとアクセスできるようになります

## コードリーディング

knock gemのデフォルトの使い方でコードを読んでいきます

ログイン管理に使うモデルは `User`  

まずはログイン処理から

<https://github.com/nsarno/knock/blob/8e8b3e8d29eccb83a83ea2449e006250f025632a/app/controllers/knock/auth_token_controller.rb#L7>

`class AuthTokenController > create` を読み進めていきます

```txt
POST /user_token
{"auth": {"email": "foo@bar.com", "password": "secret"}}
```

といったアクセスをすると

`before_action :authenticate`  
`User.find_by(email: auth_params[:email])` でユーザーを探し  
`user.authenticate(auth_params[:password])` でパスワードが正しいか確認  

正しい `email` と `password` じゃない場合  
`Knock.not_found_exception_class` の例外をなげて  
<https://github.com/nsarno/knock/blob/master/app/controllers/knock/application_controller.rb> でその例外をキャッチ  
`head :not_found` を返す  

正しい `email` と `password` の場合  
`render json: AuthToken.new payload: { sub: user.id }` でjwtを生成して返す

`AuthToken` は
<https://github.com/nsarno/knock/blob/master/app/model/knock/auth_token.rb> の `model` で jwt を組み立ててます
