import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location} title="Not Found">
      <h1>Not Found</h1>
      <p>お探しのページが見つかりませんでした。</p>
      <p>
        <Link to="/">トップページに戻る</Link>
      </p>
    </Layout>
  )
}

export const Head = () => <Seo title="Not Found" />
