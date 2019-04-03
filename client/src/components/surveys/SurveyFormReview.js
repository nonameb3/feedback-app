import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FIELDS from './formFields'
import { SubmitForm } from '../../actions'

export class SurveyFormReview extends Component {
  renderContent() {
    return FIELDS.map(({label,name})=>{
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{this.props.formValue.values[name]}</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Review form!</h2>
        {this.renderContent()}
        <button className="btn-flat yellow draken-3 white-text" onClick={this.props.onCancle}>
          Cancle
        </button>
        <button className="btn-flat green right white-text" onClick={()=>this.props.SubmitForm(this.props.formValue.values, this.props.history)}>
          Submit
          <i className="material-icons right">email</i>  
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { formValue: state.form.serveyForm }
}

export default connect(mapStateToProps, { SubmitForm })(withRouter(SurveyFormReview))
