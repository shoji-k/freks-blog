import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function OneBlog({
  data: { site, markdownRemark: post },
  location,
}) {
  console.log(location, location.pathname === "/programmer_books/")
  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <div style={{ minHeight: 'calc(100vh - 220px)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '2rem' }}>{post.frontmatter.title}</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: '.8rem',
          }}
        >
          <div style={{ fontSize: '.8rem', paddingRight: '1rem' }}>
            created: {post.frontmatter.date}
          </div>
          {post.frontmatter.updated && (
            <div style={{ fontSize: '.8rem' }}>
              updated: {post.frontmatter.updated}
            </div>
          )}
        </div>
        {location.pathname !== '/programmer_books/' && (
          <div style={{ width: '100%', marginBottom: '2rem' }}>
            <Link
              to="/programmer_books/"
              className="no-decoration"
              style={{
                border: '1px solid #ccc',
                padding: '.3rem 1rem .1rem 1rem',
                background: '#f5f5f5',
                width: 'calc(100% - 2rem)',
                display: 'inline-block',
              }}
            >
              おすすめ記事: 出会ってよかったプログラマー本
            </Link>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <hr />
      <small>
        Amazonのアソシエイトとして、blog.freks.jp
        は適格販売により収入を得ています。
      </small>
      <br />
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
