import React, { Component } from 'react'
import { rhythm } from '../utils/typography'

class Layout extends Component {
  render() {
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <h1>freks blog</h1>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
