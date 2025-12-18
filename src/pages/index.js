import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

export default function Top({
  data: { site, allMarkdownRemark: posts },
  location,
}) {
  const showAll =
    process.env.NODE_ENV === 'development' || location.search === '?all'
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // クエリパラメータから初期値を取得
  function getFilterFromQuery() {
    if (typeof window === 'undefined') return ''
    const params = new URLSearchParams(window.location.search)
    return params.get('filter') || ''
  }

  const [filter, setFilter] = useState(getFilterFromQuery())

  // フィルタ変更時にURLを書き換え
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (filter) {
      params.set('filter', filter)
    } else {
      params.delete('filter')
    }
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
    window.history.replaceState(null, '', newUrl)
  }, [filter])

  // 戻るボタンなどでURLが変わったときにfilterを復元
  useEffect(() => {
    const onPopState = () => {
      setFilter(getFilterFromQuery())
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const onChangeFilter = (e) => {
    const f = e.target.value
    setFilter(f)
  }

  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <p>
        <input
          type="text"
          placeholder="Filter title"
          className="input-filter"
          value={filter}
          onChange={onChangeFilter}
        />
      </p>
      <p>{posts.totalCount} Posts</p>
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
      {posts.edges
        .filter(({ node }) => {
          if (showAll) return true
          const postDate = new Date(node.frontmatter.date)
          return postDate <= today
        })
        .filter(({ node }) => {
          return (
            filter === '' ||
            node.frontmatter.title.toLowerCase().includes(filter.toLowerCase())
          )
        })
        .map(({ node }) => (
          <Link to={node.fields.slug} key={node.id} className="no-decoration">
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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

export const Head = ({ data: { site } }) => (
  <Seo title={site.siteMetadata.title} />
)