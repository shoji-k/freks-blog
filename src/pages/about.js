import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function About({ data: { site }, location }) {
  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title="about" />
      <p>
        このブログは{' '}
        <a href="https://twitter.com/kobayashi_shoji">@kobayashi_shoji</a>{' '}
        が運営しています
      </p>
      <p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzzPv3xY_zUgPtTosyFz01Hba8dwfzxj31_rUEGAy7hAudWA/viewform?usp=sf_link">
          お問い合わせ
        </a>
      </p>
      <p>
        <a href="/privacy-policy/">プライバシーポリシー</a>
      </p>
      <hr />
      <p>
        <a
          href="https://amzn.asia/40oqmnA"
          target="_blank"
          rel="noopener noreferrer"
        >
          🎁 Amazon wishlist
        </a>
      </p>
      <p>
        <a
          href="https://www.paypal.com/paypalme/freks"
          target="_blank"
          rel="noopener noreferrer"
        >
          😊 Sponsor?
        </a>
      </p>
      <p>
        <a
          href="https://www.buymeacoffee.com/freks"
          target="_blank"
          rel="noopener noreferrer"
        >
          ☕ Buy me a coffee?
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
