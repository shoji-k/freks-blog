---
title: 'RSpec はじめ'
date: '2019-08-08'
---

RSpec を始めるときの手順

## 始める

RSpec の gem を入れます

\$ vim Gemfile

```
group :development, :test do
  gem 'rspec-rails', '~> 3.8'
end
```

bundle install して初期設定

```
$ bundle install
$ rails generate rspec:install
```

## 設定を調整

\$ vim .rspec

```
--require spec_helper
--format documentation
```

format = documentation のほうが見やすいです  
![format_documentation](/rspec/format_not_document.webp)

デフォルト  
![format_not_documentation](/rspec/format_document.webp)

## 起動を早くする

spring-commands-rspec gem を入れます

\$ vim Gemfile

```
group :development, :test do
  gem 'spring-commands-rspec', '~> 1.0.4'
end
```

インストール

```
bundle install
```

bin/rspec で呼べるようにする  
すでに bin/rspec が存在してたら消してから

```
bundle exec spring binstub rspec
```

これで bin/rspec で呼べます

## サンプル

User model

```
RSpec.describe User, type: :model do
  it 'is valid with email, name, password' do
    user = User.new(
      email: 'foobar@sample.com',
      name: 'foobar',
      password: 'password',
      password_confirmation: 'password'
    )
    expect(user).to be_valid
  end

  it 'is invalid without name' do
    user = User.new(
      email: 'foobar@sample.com',
      password: 'password',
      password_confirmation: 'password'
    )
    expect(user).to be_valid
  end

end
```

## FactoryBot

\$ vim Gemfile

```
group :development, :test do
  gem 'factory_bot_rails', '~> 5.0.2'
end
```

インストール

```
bundle install
```

ジェネレーターでファイルを用意

```
bin/rails g factory_bot:model user
```

\$ vim spec/factories/users.rb

```
FactoryBot.define do
  factory :user do
    name { 'sample user' }
    email { 'foo@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
```

これで User Factory が用意できました

テストを書き直すと

```
RSpec.describe User, type: :model do
  it 'is valid with email, name, password' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  it 'is invalid without name' do
    expect(FactoryBot.build(:user, name: nil)).not_to be_valid
  end
end
```

これでテストは通ります  
複数ユーザーを用意したときに email アドレスがかぶってしまうので Factory を少し書き換え

```
FactoryBot.define do
  factory :user do
    name { 'sample user' }
    sequence(:email) { |n| "sample#{n}@sample.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
```

sequence を使うと、create するたびに新しい email が作られます
