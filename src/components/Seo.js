import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export function Seo({ description, meta = [], keywords = [], title }) {
  const data = useStaticQuery(detailsQuery)
  const titleTemplate =
    title === data.site.siteMetadata.title
      ? title
      : `${title} | ${data.site.siteMetadata.title}`
  const metaDescription =
    description || data.site.siteMetadata.description
  const siteUrl = data.site.siteMetadata.siteUrl || 'https://blog.freks.jp'
  const author = 'kobayashi_shoji'

  return (
    <>
      <title>{titleTemplate}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}/logo.png`} />
      <meta property="og:image:width" content="498" />
      <meta property="og:image:height" content="484" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={`${siteUrl}/logo.png`} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}
    </>
  )
}

const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
