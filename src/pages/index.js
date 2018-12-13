import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default ({data}) => {
  return (
    <Layout>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({node}) => {
        return (
          <div key={node.id}>
            <h3>
              {node.frontmatter.title}
              <small style={{color: '#bbb'}}> - {node.frontmatter.date}</small>
            </h3>
          </div>
        )
      })}
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
        }
      }
    }
  }
`
