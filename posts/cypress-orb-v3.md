---
title: 'Cypress orb version 3へバージョンアップする'
date: '2023-03-30'
updated: ''
---

cypress-io/cypress@2.2.0 -> cypress-io/cypress@3 orb へバージョンアップにあげてみました  
けっこう手こずりました

`.circleci/config.yml` が

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@2.2.0
executors:
  node_executor:
    docker:
      - image: 'cypress/base:18.14.1'
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start
          wait-on: 'http://localhost:8000'
          executor: node_executor
```

から変更していきます

新しめの Gatsby を動かすのに使っていたため、Node 18 以降が必要で、executor を変えてました
`npm start` してから立ち上がるまで時間がかかるため、`wait-on` で立ち上がるのを待つようにしてました

公式ドキュメント https://circleci.com/developer/orbs/orb/cypress-io/cypress  
を眺めるところから始めました

- `wait-on` をするところがない
- Node version を変える parameters がない

ので、自分で変えていかないと、ということで

### `wait-on` で `npm start` が立ち上がりきるのを待つ

https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server  
の公式ドキュメントの通り、
[start-server-and-test](https://github.com/bahmutov/start-server-and-test) を使うことにしました

`package.json` に script を追加

```json
{
  "scripts": {
    "start": "gatsby develop -H 0.0.0.0",
    "test": "cypress run",
    "ci": "start-server-and-test start http://localhost:8000 test"
  }
}
```

`npm run ci` を CI で動かすようにして解決

### Node 18 で動かす

公式ドキュメント https://circleci.com/developer/orbs/orb/cypress-io/cypress  
commands のところのサンプル

```yml
version: '2.1'
orbs:
  cypress: cypress-io/cypress@3
jobs:
  install-and-persist:
    executor: cypress/default
    steps:
      - cypress/install
      - persist_to_workspace:
          paths:
            - .cache/Cypress
            - project
          root: ~/
  run-tests-in-parallel:
    executor: cypress/default
    parallelism: 8
    steps:
      - attach_workspace:
          at: ~/
      - cypress/run-tests:
          cypress-command: npx cypress run --component --parallel --record
workflows:
  use-my-orb:
    jobs:
      - install-and-persist:
          name: Install & Persist To Workspace
      - run-tests-in-parallel:
          name: Run Tests in Parallel
          requires:
            - Install & Persist To Workspace
```

を参考に executor を変えていきました

結果、こんな感じです

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
executors:
  docker:
    description: |
      Single Docker container used to run Cypress Tests
    docker:
      - image: cimg/node:<< parameters.node-version >>-browsers
    parameters:
      node-version:
        default: '18.14.1'
        description: |
          The version of Node to run your tests with.
        type: string
jobs:
  install:
    executor: docker
    steps:
      - cypress/install
      - persist_to_workspace:
          paths:
            - .cache/Cypress
            - project
          root: ~/
  run-tests:
    executor: docker
    steps:
      - attach_workspace:
          at: ~/
      - cypress/run-tests:
          cypress-command: npm run ci
workflows:
  workflow:
    jobs:
      - install:
          name: Install
      - run-tests:
          name: Run Tests
          requires:
            - Install
```

### 結末

これで無事動くようになりました  
Orb は Cypress のコマンドをいい感じにまとめたものなので Orb Source を読み解いていくしかないですね
