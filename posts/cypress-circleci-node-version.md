---
title: 'CircleCIでCypressを動かすNode versionを指定する'
date: '2021-11-08'
updated: ""
---

このブログでもCircleCIでCI回してて、Cypressのテストを通してます  
新しめのGatsbyを使っていて、Node versionが古くエラーが出たのでCIで使うNode versionを指定してみました

[CircleCI Developer Hub \- cypress\-io/cypress](https://circleci.com/developer/ja/orbs/orb/cypress-io/cypress)
を使っていて、executorを変えるとNode versionを変えられそうです

circleci/config.yml

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          executor: cypress/base-14
```

引用: https://circleci.com/developer/ja/orbs/orb/cypress-io/cypress using-node14

ただしこれだと、node 14でも古めなのが使われていました

新しめのNode 14を使うために  
https://circleci.com/developer/ja/orbs/orb/cypress-io/cypress#usage-custom-executor  
を使いました

circleci/config.yml

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.29.0
executors:
  node_executor:
    docker:
      - image: 'cypress/base:14.17.3'
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start
          wait-on: 'http://localhost:8000'
          executor: node_executor
```

指定したDocker imageで動くようで、これでNode 14.17.3でCI走らせられました 🎉
