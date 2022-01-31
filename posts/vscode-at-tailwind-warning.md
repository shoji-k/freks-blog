---
title: 'VSCodeで@tailwindが認識できない'
date: '2022-01-31'
---

[Create React App](https://create-react-app.dev/) で [TailWind css](https://tailwindcss.com/) を
[Install Tailwind CSS with Create React App \- Tailwind CSS](https://tailwindcss.com/docs/guides/create-react-app) のとおりに入れたら
`@tailwind` が VSCode で認識できない Warning が出ました

VSCode に伝えてあげる必要があるので [microsoft/vscode-custom-data: Documentation and sample for using VS Code custom data format](https://github.com/microsoft/vscode-custom-data) を使いました

今回必要なのは [vscode-css-languageservice/customData.md at main · microsoft/vscode-css-languageservice](https://github.com/microsoft/vscode-css-languageservice/blob/main/docs/customData.md)

まず `.vscode/settings.json` がなければ作ります

```json
{
  "css.customData": ["./.vscode/custom.css-data.json"]
}
```

場所はどこでもいいですが、`*.css-data.json` にしとくのがよさそうです

`.vscode/custom.css-data.json` を作成します

```json
{
  "version": 1.1,
  "atDirectives": [
    { "name": "@tailwind", "description": "to use tailwind things" }
  ]
}
```

これで Waning 消えました
