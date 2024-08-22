---
title: 'React.js + Rails API modeでファイルをアップロードする'
date: '2024-06-28'
updated: '2024-08-22'
---

Userにavatar画像をアップロードする例を考えます  
RailsはActive Storageを使います  

Ruby 3.2.2  
Rails 7.0.6
React.js 18.2.0 の環境で確認しています

## ポイント

React.jsでは、`FormData` を `'Content-Type': 'multipart/form-data'` で送信  
Railsでは特別必要なことはしなくていい  

## 実装例

[Active Storage の概要 \- Railsガイド](https://railsguides.jp/active_storage_overview.html) を見てActive Storageを設定  
Railsで、Userデータを作成するAPIを用意  

route.rbに増やしたりして、コントローラーを作成  
コントローラーのコードは普通のUser作成APIと同じですが、Strong Parametersにavatarを追加して緩和しておきました  
`User.column_names` は、手抜きなので必要なものに絞ったほうがいいです  

```rb
class UsersController < ApplicationController

  def create
    attendee_profile = User.new(user_params)
    attendee_profile.save!

    render json: attendee_profile, status: :created
  end

private

  def user_params
    params.require(:attendee_profile).permit(User.column_names, :avatar)
  end
end
```

React.jsでアップロード

```ts
const formValues: { avatar: File } = {
  avatar: avatarFile,
}

const body = new FormData();
body.append('users[avatar]', formValues.avatar);

await fetch('sample.com/users', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
    body: body,
  });
```

といった感じでアップロードできます  
fetchの場合は、`'Content-Type': 'multipart/form-data'` を指定するとおかしくなるので注意です  

参考: [fetch で multipart/form\-data を送る時は Content\-Type を指定してはいけない](https://zenn.dev/kariya_mitsuru/articles/25c9aeb27059e7)

axiosなら指定してうまくいきました

## まとめ

いつも思い出すのが大変なので、メモしておきました
