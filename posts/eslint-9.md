---
title: 'ESLint 8から9にする'
date: '2024-12-03'
updated: ""
---

Remix + Viteで作ってるアプリのESLintが8系だったので9に上げてみました  
ESLint 9はflat configとかいって、設定ファイルが `eslint.config.js` になったりしてます

[Configuration Migration Guide \- ESLint \- Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/migration-guide) を参考にしました  

ESLint 9にして `npm install && npm run lint` すると

```bash
Oops! Something went wrong! :(

ESLint: 9.16.0

ESLint couldn't find an eslint.config.(js|mjs|cjs) file.

From ESLint v9.0.0, the default configuration file is now eslint.config.js.
If you are using a .eslintrc.* file, please follow the migration guide
to update your configuration file to the new format:

https://eslint.org/docs/latest/use/configure/migration-guide

If you still have problems after following the migration guide, please stop by
https://eslint.org/chat/help to chat with the team.
```

Migration Guideに

```bash
npx @eslint/migrate-config .eslintrc.json
```

があったのですが、使っていたファイルが `.eslintrc.js` だったので、`.eslintrc.js` に対して実行してみました

```bash
npx @eslint/migrate-config .eslintrc.js

Migrating .eslintrc.js

WARNING: This tool does not yet work great for .eslintrc.(js|cjs|mjs) files.
It will convert the evaluated output of our config file, not the source code.
Please review the output carefully to ensure it is correct.


Wrote new config to ./eslint.config.mjs

You will need to install the following packages to use the new config:
- globals
- @eslint/compat
- @eslint/js
- @eslint/eslintrc

You can install them using the following command:

npm install globals @eslint/compat @eslint/js @eslint/eslintrc -D
```

`.eslintrc.js` は得意じゃないそうですが、`eslint.config.mjs` に変換してくれました  

指示通りのパッケージをインストールしておきます  

```bash
npm install globals @eslint/compat @eslint/js @eslint/eslintrc -D
```

lint実行してみる  

```bash
$ npm run lint

> lint
> eslint --cache --cache-location ./node_modules/.cache/eslint .


Oops! Something went wrong! :(

ESLint: 9.16.0

SyntaxError: Identifier 'fixupConfigRules' has already been declared
```

エラーの通り

```tsx
import { fixupConfigRules, fixupPluginRules, fixupConfigRules } from "@eslint/compat";
```

と `fixupConfigRules` が2つあるので1つ消して再実行  

めちゃくちゃエラーが出ると思ったらbuild後のファイルをlintしていたので、無視するように指定

```js
export default [
  {
    ignores: ["public/*", "build/*"],
  },
  // ...続きは省略
];
```

これで無事にlintが通りました

## まとめ

ドキュメントはちゃんと読みましょう

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
