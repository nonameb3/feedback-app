import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Payment from './Payment'

export class Header extends Component {
  renderContact() {
    switch(this.props.auth){
      case null:
        return 'waiting'
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        )
      default:
        return [
          <li key="1"><Payment/></li>,
          <li key="3" style={{margin:'0px 10px'}}>credit:{this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ]
    }
  }

  logout() {
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
            to={this.props.auth ? '/surveys' : '/'}
            className="brand-logo"
          >
            Feedback App
          </Link>
          <ul className="right hide-on-med-and-down">
            {this.renderContact()}
          </ul>
        </div>
      </nav>
    )
  }
}

function setStateToProps(state) {
  return { auth: state.auth }
}

export default connect(setStateToProps)(Header)
