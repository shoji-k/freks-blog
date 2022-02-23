---
title: "Renovateにパッケージを新しくしてもらう"
date: "2018-12-28"
updated: ""
---

[Renovate \| Automated Dependency Updates](https://renovatebot.com/)  
を使って、Githubで公開しているリポジトリのnode packagesなどを新しくするようにしました  

package.jsonとかphpのcomposer.jsonを見てくれます  

## install

Github Market PlaceでRenovateを有効にします

[Renovate · GitHub Marketplace](https://github.com/marketplace/renovate)

GitHubにログインしておいて  

![renovate github marketplace](/renovate/renovate_github_marketplace.webp)

"Set up ad free trial" から進んで

![renovate github marketplace](/renovate/renovate_github_marketplace_2.webp)

Planを選んで進めます  

リポジトリを対象にするか選べるので、全部にしておきました  
リポジトリのdefault branchを対象に古くなってたらPull Request(PR)を送ってきてくれます  

初回のPRはこれでした  

![renovate first pull request](/renovate/renovate_pr.webp)

リポジトリに対してRenovateを有効にするには、最初のPRをmergeします  
merge後、1時間に最大2つPRを送ってくれるそうです  

## 設定

Pull Requestでなくてmergeしてほしいとか設定変えられるようです  

[Configure Renovate \(Onboarding PR\) \| Renovate Docs](https://renovatebot.com/docs/configure-renovate/)

## まとめ

バージョンアップがあるとPull Requestが来るので楽でいいです  
テストコード書いておかないと、取り入れにくいですが..  
