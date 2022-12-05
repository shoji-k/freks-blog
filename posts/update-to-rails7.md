---
title: 'Rails7にあげてみた'
date: '2022-12-05'
updated: ''
---

Rails 6.1.7 -> 7.0.4 にあげてみました
ただし、ほぼ api mode で使っていたものです  
Ruby は 3.1.2 を使っています

[Rails アップグレードガイド \- Rails ガイド](https://railsguides.jp/upgrading_ruby_on_rails.html)
をよく読みます

Gemfile の rails を 7.0.4 にして `bundle update rails` をします

そのあと

```bash
# bin/rails app:update
    conflict  config/boot.rb
Overwrite /app/config/boot.rb? (enter "h" for help) [Ynaqdhm] d
- ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)
+ ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

- require 'bundler/setup' # Set up gems listed in the Gemfile.
+ require "bundler/setup" # Set up gems listed in the Gemfile.
- require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
+ require "bootsnap/setup" # Speed up boot time by caching expensive operations.
Retrying...
Overwrite /app/config/boot.rb? (enter "h" for help) [Ynaqdhm] a
       force  config/boot.rb
       exist  config
    conflict  config/application.rb
       force  config/application.rb
    conflict  config/environment.rb
       force  config/environment.rb
       exist  config/environments
    conflict  config/environments/development.rb
       force  config/environments/development.rb
    conflict  config/environments/production.rb
       force  config/environments/production.rb
    conflict  config/environments/test.rb
       force  config/environments/test.rb
       exist  config/initializers
      create  config/initializers/assets.rb
      create  config/initializers/content_security_policy.rb
    conflict  config/initializers/cors.rb
       force  config/initializers/cors.rb
    conflict  config/initializers/filter_parameter_logging.rb
       force  config/initializers/filter_parameter_logging.rb
    conflict  config/initializers/inflections.rb
       force  config/initializers/inflections.rb
      create  config/initializers/new_framework_defaults_7_0.rb
      create  config/initializers/permissions_policy.rb
File unchanged! The supplied flag value not found!  config/application.rb
       exist  bin
    conflict  bin/rails
       force  bin/rails
    conflict  bin/rake
       force  bin/rake
    conflict  bin/setup
       force  bin/setup
        gsub  db/schema.rb
       rails  active_storage:update
Copied migration 20221201065026_remove_not_null_on_active_storage_blobs_checksum.active_storage.rb from active_storage

After this, check Rails upgrade guide at https://guides.rubyonrails.org/upgrading_ruby_on_rails.html for more details about upgrading your app.
```

設定が一新されるので、差分を見ながら取り込んでいきます
できたら

```bash
bundle exec rubocop -a
bin/rpec
```

してエラーを潰していきます  
bullet のエラーがでたので直したのがほとんどです

念のため development mode で動作確認
