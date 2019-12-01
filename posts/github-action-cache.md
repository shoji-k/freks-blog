---
title: 'GitHub ActionsでCacheを使ってみた'
date: '2019-12-02'
---

[GitHub Actions で RSpec を動かしてみた \| freks blog](https://blog.freks.jp/github-action-rspec/) で bundle install が時間かかるのでキャッシュを使ってみました

環境はもちろん同じく

Ruby 2.6.5  
Rails 6.0.1  
PostgreSQL 12

で

[Cache · Actions · GitHub Marketplace](https://github.com/marketplace/actions/cache)

を使います

用意されてる `.github/workflows/ruby.yml` を変更したのが

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
      - name: Cache bundle directory
        uses: actions/cache@v1
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gem-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gem-
      - name: Prepare bundler
        run: |
          gem install bundler
          bundle config path vendor/bundle
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

で、足したところが

```
    - name: Cache bundle directory
      uses: actions/cache@v1
      with:
        path: vendor/bundle
        key: ${{ runner.os }}-gem-${{ hashFiles('**/Gemfile.lock') }}
        restore-keys: |
          ${{ runner.os }}-gem-
    - name: Prepare bundler
      run: |
        gem install bundler
        bundle config path vendor/bundle
        bundle install --jobs 4 --retry 3
```

の `name: Cache bundle directory` と `bundle config path vendor/bundle` です  
bundle install されるディレクトリを指定、それをキャッシュ、次回実行時にキャッシュから戻して、bundle install が早くなります

これで今のところうまく動いています

設定したリポジトリは  
[Use cache in github actions flow by shoji\-k · Pull Request \#7 · shoji\-k/rails\-sandbox](https://github.com/shoji-k/rails-sandbox/pull/7/commits/4c8e7f5ef432dee74e97db6ee7b1c699920a05c5)  
なので参考にしてください

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07JLJSDMJ&linkId=92706a9853fe3ec1baf49ccc32614907"></iframe>
