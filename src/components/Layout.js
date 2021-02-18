import React, { Component } from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

const Header = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  if (location.pathname == rootPath) {
    return <h1 style={{ marginTop: 0 }}>{title}</h1>
  }

  return (
    <Link to="/">
      <h1 style={{ fontSize: '1.31951rem' }}>{title}</h1>
    </Link>
  )
}

class Layout extends Component {
  render() {
    const { location, title, children } = this.props
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header location={location} title={title} />
        {children}
      </div>
    )
  }
}

export default Layout
