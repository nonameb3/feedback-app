import React, { Component } from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

const Header = () => <h2>Header</h2>
const Dashbord = () => <h2>Dashbord</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

export class App extends Component {
  render() {
    return (
      <div>
        React App
      </div>
    )
  }
}

export default App
