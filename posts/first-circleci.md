---
title: "はじめてのCircleCI"
date: "2019-02-15"
updated: "2024-10-24"
---

[CircleCI](https://circleci.com/)を使ってみたくて、このブログのリポジトリに入れてみました

前回の記事 [CUI環境にCypressを導入してみた \| freks blog](/cypress/) でCypressでテスト書いたのでこれを動かしてみます  

## CircleCIを入れてみる

[CircleCI](https://circleci.com/)にアクセスしてアカウントを用意、GitHubと連携させます  
リポジトリがずらっと並ぶので、このブログのリポジトリを選択  

CircleCI用の設定ファイルをリポジトリに入れるのですが、設定ファイルは

[Hello World \- CircleCI](https://circleci.com/docs/2.0/hello-world/#section=getting-started)

を見ると

```bash
vim .circleci/config.yml  
```

に書くようです

[Continuous Integration \| Cypress Documentation](https://docs.cypress.io/guides/guides/continuous-integration.html#Examples) と
[cypress\-example\-kitchensink/circle\.yml at master · cypress\-io/cypress\-example\-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink/blob/master/circle.yml)  
のCypressのドキュメントを参照するとCircleCI OrbsでCypress用を使うようでした  
サンプルだとよくわからないし、うまく動かなかったので
[CircleCI Orb Registry \- cypress\-io/cypress](https://circleci.com/orbs/registry/orb/cypress-io/cypress)
を見て、設定ファイルを用意

このcommitをリポジトリに入れました  
[add circleci yml · shoji\-k/freks\-blog@5db2acb](https://github.com/shoji-k/freks-blog/commit/5db2acb0cdcae828a34f036bdf5cbb8655f61504)

git push するとCircleCIでCypressのテストが実行されるようになりました  

GitHubのREADMEにバッチが出したかったので、
CircleCIで、対象のリポジトリを選択、設定 > Notifications > Status Badges に貼り付けるコードがあるので、READMEに貼り付けました

一旦動いたのでまた、詳しくなろうと思います
