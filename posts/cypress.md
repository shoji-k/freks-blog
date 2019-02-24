---
title: "CUI環境にCypressを導入してみた"
date: "2019-02-14"
---

このブログはGatsbyでできてて、Ubuntu 18.04 の上でこのブログを作ってるのですが、Cypressを使い始めました  
UbuntuはCUIで使っていて、画面ないです  

yarnの導入済みなので、まずインストール

```
$ yarn add --dev cypress
```

いるものをインストール  

[Dependencies \| Cypress Documentation](https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup)

```
$ sudo apt update
$ sudo apt install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
```

cypress.jsonがないとWarningがでるので

$ vim cypress.json

```
{
  baseUrl: "http://localhost:8000"
}
```

とアクセスするベースのUrlの設定だけ用意しました  
Gatsbyの開発モードのデフォルトURLです  

シンプルに画面にアクセスしてh1タグをチェックするテストを1つ用意

$ vim cypress/integration/sample_spec.js

```
describe('Access Test', function() {
  it('can access top page', function() {
    cy.visit('/')

    cy.get('h1').should('contain', 'freks blog')
  })
})
```

Gatsbyを起動しておいて

```
$ yarn start
```

画面なしで実行してみる

$ yarn run cypress run

```
yarn run v1.13.0
$ /mnt/c/Users/shoji/ws/repos/freks-blog/node_modules/.bin/cypress run

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:    3.1.5                                                                              │
  │ Browser:    Electron 59 (headless)                                                             │
  │ Specs:      1 found (access_spec.js)                                                           │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running: access_spec.js...                                                               (1 of 1)


  Access Test
    ✓ can access top page (846ms)


  1 passing (868ms)


  (Results)

  ┌──────────────────────────────┐
  │ Tests:        1              │
  │ Passing:      1              │
  │ Failing:      0              │
  │ Pending:      0              │
  │ Skipped:      0              │
  │ Screenshots:  0              │
  │ Video:        true           │
  │ Duration:     0 seconds      │
  │ Spec Ran:     access_spec.js │
  └──────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /mnt/c/Users/shoji/ws/repos/freks-blog/cypress/videos/access_spec.js.mp4 (0 seconds)


====================================================================================================

  (Run Finished)


      Spec                                                Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔ access_spec.js                            869ms        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    All specs passed!                           869ms        1        1        -        -        -

Done in 10.02s.
```

とテスト通ったっぽいです  
動画も ```cypress/videos/access_spec.js.mp4``` と撮ってくれます  

あっさり導入できていいです
