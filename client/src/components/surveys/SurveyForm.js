import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'

const FILEDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'email' }
]

export class SurveyForm extends Component {
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
        <form autoComplete="off" onSubmit={this.props.handleSubmit(vaule=>console.log(vaule))}>
          {this.renderField()}
          <button>Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default reduxForm({
  form:'serveyForm'
})(SurveyForm)
