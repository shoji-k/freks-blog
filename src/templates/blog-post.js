import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function OneBlog({
  data: { site, markdownRemark: post },
  location,
}) {
  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h2 style={{ fontSize: '2rem' }}>{post.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

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
      }
    }
  }
`
