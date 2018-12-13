import React, { Component } from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

const Header = ({ location }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  if (location.pathname == rootPath) {
    return (
      <h1>freks blog</h1>
    )
  }

  return (
    <Link to="/">
      <h3>freks blog</h3>
    </Link>
  )
}

class Layout extends Component {
  render() {
    const { location, children } = this.props
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header location={location} />
        {children}
      </div>
    )
  }
}

export default Layout
