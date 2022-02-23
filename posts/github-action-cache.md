---
title: 'GitHub ActionsでCacheを使ってみた'
date: '2019-12-02'
updated: ""
---

[GitHub Actions で RSpec を動かしてみた \| freks blog](https://blog.freks.jp/github-action-rspec/) で bundle install が時間かかるのでキャッシュを使ってみました

環境はもちろん同じく

Ruby 2.6.5  
Rails 6.0.1  
PostgreSQL 12

で

[Cache · Actions · GitHub Marketplace](https://github.com/marketplace/actions/cache)

を使います

[Caching dependencies to speed up workflows \- GitHub Help](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/caching-dependencies-to-speed-up-workflows)  
を参考に、用意されてる `.github/workflows/ruby.yml` を変更したのが

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
docker image layer のキャッシュをしたかったのですが、November mid in 2019 に出てる？らしいのですが見当たらなかったので、また今度

設定したリポジトリは  
[Use cache in github actions flow by shoji\-k · Pull Request \#7 · shoji\-k/rails\-sandbox](https://github.com/shoji-k/rails-sandbox/pull/7/commits/4c8e7f5ef432dee74e97db6ee7b1c699920a05c5)  
なので参考にしてください


