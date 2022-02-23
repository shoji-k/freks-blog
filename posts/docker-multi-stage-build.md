---
title: 'Dockerのmuti-stage buildsを使ってみた'
date: '2020-06-26'
updated: ""
---

Dockerのmuti-stage buildsを使ってみました

[Use multi\-stage builds \| Docker Documentation](https://docs.docker.com/develop/develop-images/multistage-build/)

フロントエンド React + バックエンドRails で試してみました  
Webpackerは使ってなくて、pureなReactです

`npm run build` とかして吐き出されたファイルをRails imageに含めてみました

こんなDockerfileになりました(だいぶ省略してます)

```
FROM node:12 AS frontend

WORKDIR /front
COPY frontend/ /front/
RUN npm install
RUN npm run build

FROM ruby:2.6.5

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install --without development test

COPY . /app
COPY --from=frontend /front/dist/ /app/public/

# 省略
```

これで、`npm run build` してできたファイルをRails imageに含められました  

途中、Dockerfileでコメントを


```
COPY --from=frontend /front/dist/ $APP_HOME/public/ # for multi-stage build
```

とか書いていると、以下のそんなファイルはないというエラーになってはまりました  

```
Step 20/20 : COPY --from=frontend /front/dist/ $APP_HOME/public/　# for multi-stage build
COPY failed: stat /var/lib/docker/aufs/mnt/600a491c9ba2b4dd39056a3a8566806d9651f6e4a89fb78079f77bb1c9d7e30c/app/public: no such file or directory
```

コメントは行途中から書くとだめでした  
