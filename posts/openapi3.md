---
title: 'OpenAPI3を使い始めてみた'
date: '2019-12-16'
---

API Documentのために [OpenAPI3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md)  を使ってみました  
Swaggerはビジネス色が強くなってしまったため、OpenAPI3に分離したという認識（どこかで読んでそうだったはず..）  

また Rails で [committee](https://github.com/interagent/committee) gem を使って API の形が正しいか rspec でテストがかきたくてはじめました

## Stoplight Studio

OpenAPI3のフォーマットを読んで書いていくのは大変なので

[Stoplight Studio \| OpenAPI Design, Planning & Modeling Tool](https://stoplight.io/studio/)

を使いました  
ブラウザ上でも使えるしアプリもあります  

GUIで定義をしていくと OpenAPI3 になるので便利です

## committee gem

Rails + [committee](https://github.com/interagent/committee) gem でAPIドキュメントが古くならないようにテストいれました

参考) [OpenAPI3\.0を導入してみました \- アクトインディ開発者ブログ](https://tech.actindi.net/2019/03/11/090000)

### 必須でないフィールドでもnullが入ってくるとエラーになる  

Stoplight Studioで定義して、required: falseにしていてもnullが入るとエラーになる  
OpenAPI3から、`nullable: true`ができたので設定してやるといい  
Stoplight Studioで設定できないので、手動で追記する  

```json
"user": {
  "title": "user",
  "type": "object",
  "properties": {
    "client_lawyer_type": {
      "type": "string",
      "nullable": true
    }
  }
}
```

### 未定義のフィールドがあるとエラーにする

stoplight studioで定義を作成すると、フィールドが追加されてもエラーにならない  
`"additionalProperties": false` を手で追記するとエラーにできる  

```json
{
  "type": "object",
  "properties": {
    "foo": {
      "type": "string"
    },
    "bar": {
      "type": "number"
    },
  },
  "additionalProperties": false
}
```

参考リンク  

- [OpenAPI 3 Tutorial| SwaggerHub](https://app.swaggerhub.com/help/tutorials/openapi-3-tutorial)

