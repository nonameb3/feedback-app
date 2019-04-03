import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmail from '../../utills/validateEmails'
import FILEDS from './formFields'

export class SurveyForm extends Component {
  onSubmit = value => {
    console.log(value)
    this.props.onSubmit(value)
  }

  renderField() {
    return FILEDS.map(({label, name}) => {
      return(
        <Field
          key={name}
          label={label}
          name={name}
          component={SurveyField}
        />
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <form autoComplete="off" onSubmit={this.props.handleSubmit(value=>this.onSubmit(value))}>
          {this.renderField()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>  
          </button>
        </form>
      </React.Fragment>
    )
  }
}

function validate(values) {
  let error = {}

  error.recipients = validateEmail(values.recipients || '')
  for (let {name} of FILEDS) {
    if(!values[name]) {
      error[name] = `${name} must have values.`
    }
  }

  return error
}

export default reduxForm({
  validate,
  form:'serveyForm',
  destroyOnUnmount: false
})(SurveyForm)
