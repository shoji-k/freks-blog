---
title: 'GraphQLのメンタルモデル'
date: '2024-09-12'
updated: ''
---

Shopify appをつくっていて、GraphQLを使っていて使い方がRESTで使う時と違ったので整理

[Thinking in Graphs \| GraphQL](https://graphql.org/learn/thinking-in-graphs/)
にある

<img src="https://graphql.org/nextImageExportOptimizer/business_layer.68bf746f-opt-640.WEBP" alt="Business Logic Layer" style="width: 30rem;" />  

のようにGraphQLはRootコンポーネント（一番上）でデータを取る思想のようです

[Lee Byron - Exploring GraphQL at react-europe 2015 | YouTube](https://youtu.be/WQLzZf34FJ8?si=f34PsZzeHgF7xUTu) が参考になります

React(JSX) + GraphQLで考えてみると

```graphql
{
  me {
    name
    age
    profilePicture {
      url
    }
    events {
      title
      date
    }
  }
}
```

とかのQueryを投げてデータを受け取れば

```jsx
function Me({ name, age }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
    </div>
  );
}

function ProfilePicture({ url }) {
  return <img src={url} />;
}

function Event({ title, date }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{date}</p>
    </div>
  );
}
```

のようにコンポーネントを作ってデータを表示できると考えるとよさそうです  

RESTだと `ProfilePicture` コンポーネントでAPI叩いてデータ取ったりもできますが、やらない思想だと思います  

## まとめ

まだ、あまり自信ないところです  
GraphQLさわってはいましたが、ちゃんとドキュメントを読んだ方がよさそうです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4gjb5aS" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/71eY+JKm+PL._SY466_.jpg" alt="初めてのGraphQL ―Webサービスを作って学ぶ新世代API" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">初めてのGraphQL ―Webサービスを作って学ぶ新世代API</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
