import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Feedback App</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="collapsible.html">Login with Google</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
