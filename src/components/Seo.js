import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export function Seo({ description, lang = 'ja', meta = [], keywords = [], title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const titleTemplate =
          title === data.site.siteMetadata.title
            ? title
            : `%s | ${data.site.siteMetadata.title}`
        const metaDescription =
          description || data.site.siteMetadata.description
        const siteUrl = data.site.siteMetadata.siteUrl || 'https://blog.freks.jp'
        const author = 'kobayashi_shoji'

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={titleTemplate}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:image',
                content: `${siteUrl}/logo.png`,
              },
              {
                property: 'og:image:width',
                content: 498,
              },
              {
                property: 'og:image:height',
                content: 484,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                property: 'twitter:image',
                content: `${siteUrl}/logo.png`,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
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
