import React, { Component } from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { FetchUser } from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

export class App extends Component {
  componentDidMount() {
    this.props.FetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { FetchUser })(App)
