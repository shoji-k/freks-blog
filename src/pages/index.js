import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default function Top({ data, location }) {
  return (
    <Layout location={location}>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
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
