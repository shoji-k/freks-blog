---
title: 'GitHub ActionsでCypressを動かしてみた'
date: '2019-11-28'
---

GitHub ActionsでCypressを動かしてみました

動かすときの料金は  
[About billing for GitHub Actions \- GitHub ヘルプ](https://help.github.com/ja/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions)

で、public repositoryはfreeです

[cypress\-io/github\-action: GitHub Action for running Cypress end\-to\-end tests](https://github.com/cypress-io/github-action) がよさそうで使ってみました

View on Marketplace のボタンを押して入れておきます

![View on Marketplace button](/github-action-cypress/cypress_actions_1.png)

Use latest version のボタンを押して有効化します

![Use latest version button](/github-action-cypress/cypress_actions_2.png)

あとは使いたいGitHubのrepositoryを表示、Actionsページを開きます  

右にあるボタン Skip this: Set up a workflow yourself を押して、ymlを書きました  

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

右の Start commit で別PR作るようにして見ました  
push のたびにCI動作します  

で、結果を見てうまくいったのでできました

REAEMEにバッチを表示するには  
[ワークフローを設定する \- GitHub ヘルプ](https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository)  
を見て設定しました  

設定したリポジトリは  
[shoji\-k/nutrit](https://github.com/shoji-k/nutrit/tree/dd8cc67f94fac432b985eca63cad3f9d3be84357)
なので参考にしてください  

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07JLJSDMJ&linkId=92706a9853fe3ec1baf49ccc32614907"></iframe>