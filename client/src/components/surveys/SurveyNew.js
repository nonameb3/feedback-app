import React, { Component } from 'react'
import SurveyForm from './SurveyForm'
import SurveyReview from './SurveyFormReview'

export class surveyNew extends Component {
  state = {
    review: false
  }

  randerContent() {
    if(this.state.review) {
      return <SurveyReview onCancle={()=>this.setState({review:false})} />
    }

    return <SurveyForm onSubmit={()=>this.setState({review:true})} />
  }

  render() {
    return (
      <div>
        {this.randerContent()}
      </div>
    )
  }
}

export default surveyNew
