import React, { Component } from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { FetchUser } from '../actions'

// const Header = () => <h2>Header</h2>
import Header from './Header'
import Landing from './Landing'
const Dashbord = () => <h2>Dashbord</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

export class App extends Component {
  componentDidMount() {
    this.props.FetchUser()
  }

  render() {
    return (
      
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Route path="/" component={Landing} exact/>
          <Route path="/surveys" component={Dashbord} exact/>
          <Route path="/surveys/new" component={SurveyNew}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { FetchUser })(App)
