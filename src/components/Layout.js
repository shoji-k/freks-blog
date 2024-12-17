import React, { Component } from 'react'
import { Link } from 'gatsby'

const Header = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  if (location.pathname == rootPath) {
    return (
      <div style={{ display: 'grid' }}>
        <div style={{ gridRow: 1, gridColumn: 1 }}>
          <h1 style={{ margin: 0 }}>{title}</h1>
        </div>
        <div style={{ gridRow: 1, gridColumn: 2, paddingTop: '.2rem' }}>
          <Link
            to="/about"
            style={{ textAlign: 'right' }}
            className="no-decoration"
          >
            <div style={{ fontSize: '1rem' }}>about</div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid' }}>
      <div style={{ gridRow: 1, gridColumn: 1 }}>
        <Link to="/" className="no-decoration">
          <h1 style={{ fontSize: '1.31951rem' }}>{title}</h1>
        </Link>
      </div>
      {location.pathname != '/about' && (
        <div style={{ gridRow: 1, gridColumn: 2, paddingTop: '1.2rem' }}>
          <Link
            to="/about"
            style={{ textAlign: 'right' }}
            className="no-decoration"
          >
            <div style={{ fontSize: '1rem' }}>about</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export class Layout extends Component {
  render() {
    const { location, title, children } = this.props
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '800px',
          padding: '1rem',
        }}
      >
        <Header location={location} title={title} />
        {children}
      </div>
    )
  }
}
