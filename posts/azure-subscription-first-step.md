---
title: 'Azureのサブスクリプションを組織で使う'
date: '2024-02-22'
updated: ''
---

Azureを組織で使いたくて、課金を組織でまとめるのに分からなかったのでまとめます

まず、次の図を理解するのが必要でした

![Azure resouce structure](/azure-subscription-first-step/azure-resource-structure.webp)

Management Groups -> 一番大きいまとめ  
Subscriptions -> 課金  
Resource Groups -> 各サービスをまとめたもの  
Resources ->　各サービス(DBとかAzure OpenAIとか)

の順で関連があります  
それぞれの階層ごとにAccess Control(IAM) があり、そこに使える人とかを指定していきます

この概念が必要でした

Azureアカウントを作ったら  
[Azure セットアップ ガイド \- Microsoft Azure](https://portal.azure.com/#view/Microsoft_Azure_Resources/QuickstartPlaybookBlade/guideId/intro-azure-setup)  
をやるのが一番理解できました

具体的に必要だった作業はSubscriptionを作ったら  
[Azure ロールベースのアクセス制御を使用して Azure 環境へのアクセスを管理する \- Cloud Adoption Framework \| Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/cloud-adoption-framework/ready/azure-setup-guide/manage-access#grant-subscription-access)  
でした

機能が多すぎてちょっとドキュメント読むくらいじゃ到底わからず、腰を据えてドキュメントを読み込む必要がありました  

Microsoft Learningとかドキュメントが豊富なのはいいと思います  
読みたいものにたどり着くのが大変かもしれません  

PR

AIの進化がすごいので [ChatGPT/LangChainによるチャットシステム構築［実践］入門) <small>(このリンクは、アフィリエイトリンクです)</small> を読んでます
