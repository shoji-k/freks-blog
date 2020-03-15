---
title: 'GitHub ActionsでRSpecを動かしてみた'
date: '2019-12-01'
---

[GitHub Actions で Cypress を動かしてみた \| freks blog](https://blog.freks.jp/github-action-cypress/) に続いて、RSpec を動かしてみました

Ruby 2.6.5  
Rails 6.0.1  
PostgreSQL 12

で試しました

Repository のページを開いて、Actions タブを開いて、Ruby のテンプレートを参考にしました

試行錯誤した結果、yaml は以下に

```yml
name: Ruby CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:12
        ports:
          - 5432:5432
        env:
          POSTGRES_USER: pguser
          POSTGRES_PASSWORD: password
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5
    container:
      image: ruby:2.6.5
      env:
        RAILS_ENV: test
        RAILS_DATABASE_HOST: postgres # this is needed
        RAILS_DATABASE_USER: pguser
        RAILS_DATABASE_PASSWORD: password
    steps:
      - uses: actions/checkout@v1
      - name: Prepare bundler
        run: |
          gem install bundler
          bundle install --jobs 4 --retry 3
        working-directory: ./src
      - name: Prepare database
        run: |
          bin/rails db:create
          bin/rails db:schema:load
        working-directory: ./src
      - name: Run test
        run: bin/rspec
        working-directory: ./src
```

となりました

はまったのは Rails から localhost の PostgreSQL にアクセスできなくて  
container の env に

```
  RAILS_DATABASE_HOST: postgres # this is needed
```

を追記したところです  
docker-compose のようにサービス名がつくようです  
参考にしたリンク）[Solved: Re: Github Actions services not reachable \- GitHub Community Forum](https://github.community/t5/GitHub-Actions/Github-Actions-services-not-reachable/m-p/30739#M538)

`working-directory: ./src` は試したリポジトリに Rails が src 内にあるためで

サンプルで見かけた

```
    - name: Set up Ruby 2.6
      uses: actions/setup-ruby@v1
      with:
        ruby-version: 2.6.3
```

だと、試したときに 2.6.5 がなかったので、`container`を指定しています

これで今のところうまく動いています

設定したリポジトリは  
[Prepare RSpec GitHub Action by shoji\-k · Pull Request \#5 · shoji\-k/rails\-sandbox](https://github.com/shoji-k/rails-sandbox/pull/5/commits/803d66cf95ecd40089af736386e299555a4bd218)
なので参考にしてください


