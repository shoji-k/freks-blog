import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function Top({
  data: { site, allMarkdownRemark: posts },
  location,
}) {
  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title={site.siteMetadata.title} />
      <h4>{posts.totalCount} Posts</h4>
      {posts.edges.map(({ node }) => (
        <Link to={node.fields.slug} key={node.id}>
          <h3>
            {node.frontmatter.title}
            <small style={{ color: '#bbb' }}> - {node.frontmatter.date}</small>
          </h3>
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
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
