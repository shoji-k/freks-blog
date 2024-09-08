import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function About({ data: { site }, location }) {
  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title="Privacy Policy" />
      <h2>プライバシーポリシー</h2>
      <p>
        本ウェブサイト上で提供するサービスにおけるユーザーの個人情報の取扱いについて以下のとおりプライバシーポリシーを定めます。
      </p>
      <h3>広告の配信について</h3>
      <p>
        当サイトはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
      </p>
      <p>
        第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。
      </p>
      <h3>アクセス解析ツールについて</h3>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
      </p>
      <p>
        このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
      </p>
      <p>
        このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </p>
      <p>
        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          target={'_blank'}
          rel="noreferrer"
        >
          こちら
        </a>
        をご覧ください。
      </p>
      <h3>著作権</h3>
      <p>
        当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。
      </p>
      <p>
        記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接ご連絡下さい。確認後、対応させて頂きます。
      </p>
      <h3>免責事項</h3>
      <p>当サイトの記事は管理人の主観により書いています。</p>
      <p>
        当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
      </p>
      <p>
        当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </p>
      <h3>お問い合わせ窓口</h3>
      <p>本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。</p>
      <p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzzPv3xY_zUgPtTosyFz01Hba8dwfzxj31_rUEGAy7hAudWA/viewform?usp=sf_link">
          お問い合わせ
        </a>
      </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
