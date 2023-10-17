import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function Top({
  data: { site, allMarkdownRemark: posts },
  location,
}) {
  const showAll =
    process.env.NODE_ENV === 'development' || location.search === '?all'
  const today = moment().startOf('day')

  const [filter, setFilter] = useState('')

  const onChangeFilter = (e) => {
    const f = e.target.value
    setFilter(f)
  }

  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Seo title={site.siteMetadata.title} />
      <p>
        <input
          type="text"
          placeholder="Filter title"
          style={{ width: '100%' }}
          onChange={onChangeFilter}
        />
      </p>
      <p>{posts.totalCount} Posts</p>
      {posts.edges
        .filter(
          ({ node }) =>
            showAll || today.diff(node.frontmatter.date, 'days') >= 0
        )
        .filter(({ node }) => {
          return (
            filter === '' ||
            node.frontmatter.title.toLowerCase().includes(filter.toLowerCase())
          )
        })
        .map(({ node }) => (
          <Link to={node.fields.slug} key={node.id} class="no-decoration">
            <h2 style={{ fontSize: '1.31951rem', marginTop: '2rem' }}>
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
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
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
