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
