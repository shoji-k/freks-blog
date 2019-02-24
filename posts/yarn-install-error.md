---
title: "yarn install で \"ENOENT: no such file or directory, copyfile\" エラー"
date: "2018-12-15"
---

しばらく触ってなかった環境でyarn installすると

```
error An unexpected error occurred: "ENOENT: no such file or directory, copyfile '/home/user/.cache/yarn/v4/npm-graphql-config-2.2.1-5fd0ec77ac7428ca5fb2026cf131be10151a0cb2/node_modules/graphql-config/lib/__tests__/endpoint-extension/resolve.d.ts' -> '/mnt/c/Users/user/sample/node_modules/graphql-config/lib/__tests__/endpoint-extension/resolve.d.ts'".
```

とエラーがでました  
環境は、Windows Subsystem for Linux の Ubuntu 16 です  

2018-12-10時点でnode, yarnを最新にしてもだめでした

結局

```
yarn cache clear
```

で直りました
