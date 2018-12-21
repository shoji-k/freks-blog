---
title: "ESLintとPrettierをともに使う"
date: "2018-12-21"
---

[Prettier · Opinionated Code Formatter](https://prettier.io/)  
を導入してみました  
ESlintをすでに使っていたところから始めました  

## install

[Install · Prettier](https://prettier.io/docs/en/install.html)

```
yarn add prettier --dev --exact
```

## config

[Options · Prettier](https://prettier.io/docs/en/options.html)

$ vim .prettierrc

```
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true
}
```

$ vim .prettierignore

```
package.json
```

## ESLintを一緒に使う

[Integrating with ESLint · Prettier](https://prettier.io/docs/en/eslint.html)

を読んで

[eslint\-plugin\-prettier:](https://github.com/prettier/eslint-plugin-prettier)

ESLintにPrettierを実行してもらうプラグイン  
コード整形ルールは、PrettierでやるのでESLintのコード整形のルールは削除する  
そのため

[eslint\-config\-prettier](https://github.com/prettier/eslint-config-prettier)

を入れるとESLintのコード整形ルールを無効にしてくれる

```
yarn add --dev eslint-plugin-prettier eslint-config-prettier
```

設定は[ここ](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)をみる

$ vim .eslint.json

```
{
  "extends": [
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

を追加
これでPrettierの整形ルールをみて、ESLintでエラーになる  
Prettierの整形ルールでESLintがエラーになってしまう場合、rulesに追記する  

既存で使っていたコード整形のルールを.eslint.jsonからは削除した  

Prettierのルールを用意

$ vim .prettierrc

```
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true
}
```

$ vim .prettierignore

```
package.json
```

PrettierとESLintで重複した設定があるか見るには  

```
$ eslint --print-config . | eslint-config-prettier-check
```

CLIでPrettierをかけるなら  

```
$ prettier --write src/**/*.js
```

とかでかけます  

最終的にはReactプロジェクトで[eslint\-plugin\-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md)も使っていたので  

$ vim .eslint.json

```
{
  "extends": [
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier/react"
  ],
  "plugins": [
    "prettier",
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "es6": true
  },
  "rules": {
    "prettier/prettier": "error",
    "react/prop-types": 0
  }
}
```

となりました

