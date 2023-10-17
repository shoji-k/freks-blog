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
      <div style={{ minHeight: 'calc(100vh - 220px)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '2rem' }}>{post.frontmatter.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '.8rem' }}>
          <div style={{ fontSize: '.8rem', paddingRight: '1rem' }}>
            created: {post.frontmatter.date}
          </div>
          {post.frontmatter.updated && (
            <div style={{ fontSize: '.8rem' }}>updated: {post.frontmatter.updated}</div>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <small>
        This site is managed by <a href="/about">freks</a>
      </small>
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
        date
        updated
      }
    }
  }
`
