import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { HandleToken } from '../actions'

export class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="feedback-app"
        description="5$ for 5 email"
        amount={500}
        token={token => this.props.HandleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    )
  }
}

export default connect(null,{ HandleToken })(Payment)
