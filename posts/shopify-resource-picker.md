---
title: 'Shopify Resource Pickerを使ってみる'
date: '2024-10-04'
updated: ''
---

Shopify appを作っています  
Shopify Resource Pickerを使ってみました  
商品とかを選ぶ機能を作るに便利です  

公式ドキュメントは [App Bridge](https://shopify.dev/docs/api/app-bridge-library)  
このあたり

`shopify app init` で作成したアプリにはApp Bridgeがすでに使えるようになっています  

```jsx
export default function Index() {
  const openResourcePicker = async () => {
    const selected = await shopify.resourcePicker({type: 'product'});
    console.log(selected);
  }
  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <Button onClick={openResourcePicker}>Open Resource Picker</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
```

こんな感じでResource Pickerを開くことができます  
選ばれた商品が `selected` に入ってるのでそれを使って何かすることができます  

古い [ResourcePicker](https://shopify.dev/docs/api/app-bridge/previous-versions/actions/resourcepicker#react) の書き方は

```jss
function MyApp() {
  return (
    <Provider config={config}>
      <ResourcePicker resourceType="Product" open />
    </Provider>
  );
}
```

ですが、これは `This is a legacy API.` で非推奨なので新しい書き方にしましょう  

## まとめ

検索すると古いやり方を見かけるので、新しいやり方にしましょう  
公式ドキュメントを見るのがいいですね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
