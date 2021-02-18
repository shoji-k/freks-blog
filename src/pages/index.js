import React from 'react'
import { Link, graphql } from 'gatsby'
import moment from 'moment'
import { rhythm } from '../utils/typography'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function Top({
  data: { site, allMarkdownRemark: posts },
  location,
}) {
  const showAll =
    process.env.NODE_ENV === 'development' || location.search === '?all'
  const today = moment().startOf('day')

  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title={site.siteMetadata.title} />
      <p>{posts.totalCount} Posts</p>
      {posts.edges
        .filter(
          ({ node }) =>
            showAll || today.diff(node.frontmatter.date, 'days') >= 0
        )
        .map(({ node }) => (
          <Link to={node.fields.slug} key={node.id}>
            <h2 style={{ fontSize: '1.31951rem', marginTop: rhythm(2) }}>
              {node.frontmatter.title}
              <small style={{ color: '#bbb' }}>
                {' '}
                - {node.frontmatter.date}
              </small>
            </h2>
          </Link>
        ))}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
