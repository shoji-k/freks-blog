---
title: "「Warning: React version not specified in eslint-plugin-react settings.」を解決する"
date: "2019-02-13"
---

このブログはGatsbyで作ってるんですが、eslintをかけるとWarningエラーがでました

解決したときのバージョン

```
"gatsby": "2.0.118",
"eslint": "5.13.0",
"eslint-plugin-react": "7.12.4",
```

eslintをかけると  

```
$ ./node_modules/.bin/eslint src
Warning: React version not specified in eslint-plugin-react settings. See https://github.com/yannickcr/eslint-plugin-react#configuration .
```

と、Warningが出てるのに気づきました  
リンク先を見てもよくわからないので、調べると解決するには  

$ vim .eslintrc.json

```
  "settings": {
    "react": {
      "version": "detect"
    }
  },
```

を指定するのがよさそうでした  
これでWarningでなくなりました  

参考にしたリンク  
- [Warning: React version not specified in eslint\-plugin\-react settings\. · Issue \#1955 · yannickcr/eslint\-plugin\-react](https://github.com/yannickcr/eslint-plugin-react/issues/1955)
- [Set eslint React version to 'detect' by Aljullu · Pull Request \#1300 · woocommerce/wc\-admin](https://github.com/woocommerce/wc-admin/pull/1300)
