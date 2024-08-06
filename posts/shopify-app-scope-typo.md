---
title: 'shopify app deployでUnexpected system error'
date: '2024-08-06'
updated: ''
---

Remix使っているShopifyアプリを作っています  

[Shopify appのscopesの変更を反映させる](/shopify-app-update-scopes) の自分の記事を見てscopesを変更しようと  
`shopify app deploy` するとエラーが...

```bash
╭─ error ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                                                    │
│                                                                                                                                    │
│  The Partners GraphQL API responded unsuccessfully with errors:                                                                    │
│                                                                                                                                    │
│  [                                                                                                                                 │
│    {                                                                                                                               │
│      "message": "Unexpected system error",                                                                                         │
│      "extensions": {                                                                                                               │
│        "code": "500"                                                                                                               │
│      }                                                                                                                             │
│    }                                                                                                                               │
│  ]                                                                                                                                 │
│                                                                                                                                    │
│  Request ID: c7810882-cf8e-41b6-9b38-1c6fc56e63fd-1722927462                                                                       │
│                                                                                                                                    │
│                                                                                                                                    │
│  To investigate the issue, examine this stack trace:                                                                               │
│    at makeRequest (home/user/.nvm/versions/node/v20.16.0/lib/node_modules/@shopify/cli/dist/chunk-3REVOIEW.js:50408)               │
│    at processTicksAndRejections (node:internal/process/task_queues:95)                                                             │
│    at async debugLogResponseInfo                                                                                                   │
│    (home/user/.nvm/versions/node/v20.16.0/lib/node_modules/@shopify/cli/dist/chunk-3REVOIEW.js:50444)                              │
│    at (home/user/.nvm/versions/node/v20.16.0/lib/node_modules/@shopify/cli/dist/chunk-YXPGPWR2.js:4671)                            │
│    at (home/user/.nvm/versions/node/v20.16.0/lib/node_modules/@shopify/cli/dist/chunk-EID6L4PR.js:42849)                           │
│                                                                                                                                    │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

見ろっていうファイルを見ても内容分からず...

原因は、APIのscopesの設定でした  

`shopify.app.toml` で

```toml
[access_scopes]
scopes = "read_location,read_orders"
```

としていたのですが、タイポでした...

```toml
[access_scopes]
scopes = "read_locations,read_orders"
```

`read_location` から `read_locations` に変更したら `shopify app deploy` で反映されました

違うところを疑ってて時間がかかってしまいました
