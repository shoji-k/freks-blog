---
title: 'GatsbyでMarkdown記法に更新日を追加表示する'
date: '2022-02-21'
updated: ''
---

markdown に updated を追記、更新日を手動で入れるようにしてみました

この記事だとこんな感じです

```md
---
title: 'GatsbyでMarkdown記法に更新日を追加表示する'
date: '2022-02-21'
updated: ''
---
```

graphql で、markdownRemark のデータ取得に `updated`を追記

```js
export const query = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date
        updated
      }
    }
  }
`
```

これで動かすとエラーになるので、全投稿のマークダウンファイルに `updated` を足します  
マークダウンファイルは `posts` ディレクトリに入れていたので、sed 使って `updated: ""` を行追加

```bash
find posts -type f -name "*.md" | xargs sed -i -e 3a"updated: \"\""
```

あとはブログ記事内に更新日を表示するように jsx を変更

```js
{
  post.frontmatter.updated && (
    <div style={{ fontSize: '.8rem' }}>updated: {post.frontmatter.updated}</div>
  )
}
```

を出したいところに足しました

型を付けたかったらこの辺が参考になりそうな気がします（未確認）  
[Customizing the GraphQL Schema | Gatsby](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-type-definitions)

コードみたい方はこちらの[コミット](https://github.com/shoji-k/freks-blog/commit/62064fe46c3c53abb3ada9f151479ad6f40a7bf9) を参考にしてください
