---
title: 'GitHub ActionsでCypressを動かしてみた'
date: '2019-11-28'
---

GitHub Actions で Cypress を動かしてみました

動かすときの料金は  
[About billing for GitHub Actions \- GitHub ヘルプ](https://help.github.com/ja/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions)

で、public repository は free です

[cypress\-io/github\-action: GitHub Action for running Cypress end\-to\-end tests](https://github.com/cypress-io/github-action) がよさそうで使ってみました

View on Marketplace のボタンを押して入れておきます

![View on Marketplace button](/github-action-cypress/cypress_actions_1.webp)

Use latest version のボタンを押して有効化します

![Use latest version button](/github-action-cypress/cypress_actions_2.webp)

あとは使いたい GitHub の repository を表示、Actions ページを開きます

右にあるボタン Skip this: Set up a workflow yourself を押して、yml を書きました

```yml
name: End-to-end tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v1
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v1
          with:
            start: npm start
```

右の Start commit で別 PR 作るようにして見ました  
push のたびに CI 動作します

で、結果を見てうまくいったのでできました

REAEME にバッチを表示するには  
[ワークフローを設定する \- GitHub ヘルプ](https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository)  
を見て設定しました

設定したリポジトリは  
[shoji\-k/nutrit](https://github.com/shoji-k/nutrit/tree/dd8cc67f94fac432b985eca63cad3f9d3be84357)
なので参考にしてください

追記)  
[GitHub Actions で RSpec を動かしてみた \| freks blog](https://blog.freks.jp/github-action-rspec/) を後日やってみました


