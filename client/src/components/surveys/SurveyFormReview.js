import React, { Component } from 'react'
import { connect } from 'react-redux'

export class SurveyFormReview extends Component {
  render() {
    return (
      <div>
        <h2>Review form!</h2>
        <button className="btn-flat yellow draken-3" onClick={this.props.onCancle}>
          Cancle
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { formValue: state.form.serveyForm }
}

export default connect(mapStateToProps)(SurveyFormReview)
