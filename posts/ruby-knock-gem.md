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

ログインします  
<https://github.com/nsarno/knock/blob/master/app/controllers/knock/auth_token_controller.rb> の create に `email` と `password` を送信すると、jwtが返ってきます

実際に使うにはコントローラーを用意します  
ここでは `UserTokenController#create` を用意  

```ruby
# routes.rb

post 'user_token' => 'user_token#create'
```

user_token_controller.rb を用意  
`Knock::AuthTokenController` を継承  

```ruby
class UserTokenController < Knock::AuthTokenController
end
```

POST /user_token に email と password を送信すると

```json
{
  "jwt": "eyJ0xxxxxxxxxxxxxx"
}
```

といったjwtが返ってきます

そしてアクセスしたいapiのheaderに

`Authorization: Bearer eyJ0xxxxxxxxxxxxxx` と先ほど取得したjwtをつけて送信するとアクセスできるようになります

## コードリーディング

knock gemのデフォルトの使い方でコードを読んでいきます

ログイン管理に使うモデルは `User`  

### ログイン処理

<https://github.com/nsarno/knock/blob/8e8b3e8d29eccb83a83ea2449e006250f025632a/app/controllers/knock/auth_token_controller.rb#L7>

`class AuthTokenController > create` を読み進めていきます

```txt
POST /user_token
{"auth": {"email": "foo@bar.com", "password": "secret"}}
```

といったアクセスをすると

`before_action :authenticate` が動いて  
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

### APIアクセス

ログインしてないと使えないAPIには `before_action :authenticate_user` を設置  
そのAPI Headerに `Authorization: Bearer eyJ0xxxxxxxxxxxxxx` を付与してアクセスします  

`authenticate_user` はどこにも定義されていません  
定義されてないメソッドが呼ばれたときは `method_missing` が呼ばれます  

`method_missing` が `Knock::Authenticable` で定義されています  
<https://github.com/nsarno/knock/blob/8e8b3e8d29eccb83a83ea2449e006250f025632a/lib/knock/authenticable.rb#L23>  

`authenticate_user` は、`current_user` のメソッドを呼び、
API Headerの `Authorization: Bearer eyJ0xxxxxxxxxxxxxx` をdecode、jwtの中身を取り出して
`User.find_by(id: payload['sub'])` でユーザーを探し、`current_user` として返します

### jwtの中身

`Knock::AuthToken.new` で生成したりデコードしたりしてます  
<https://github.com/nsarno/knock/blob/8e8b3e8d29eccb83a83ea2449e006250f025632a/app/model/knock/auth_token.rb#L9>  

#### 生成

`Knock::AuthToken.new(payload: payload)` でjwtを生成  
payloadの中身 `exp` や `aud` をセットしてます  
`exp` はデフォルトでは1日です  

#### デコード

`Knock::AuthToken.new(token: token)` でjwtをdecode  
デコードのアルゴリズムが違ったり `exp` が過ぎていたら jwt gemのdecodeで例外を投げます  

## まとめ

knock gemを使うのをやめる案件があったのでgemの中身を読み解いてみました  
Userモデルを変えられたり、`authenticate_user` や `current_user` のメソッド名を変えられたりするので  
メタプログラミングが使われてるところは読みづらいですが、小さめのgemでした

PR

Rubyを深堀するの読んでみたい本です  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3J1aqvr" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71KrmcyShVL._SY466_.jpg" alt="Rubyのしくみ -Ruby Under a Microscope" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Rubyのしくみ -Ruby Under a Microscope</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
