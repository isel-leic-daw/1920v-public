import React from 'react'
import './App.css'
import HvacPage from './HvacPage'
import { getTemperatureService as TemperatureService } from './temperature/Service'
import { getHvacService as HvacService } from './hvac/Service'
import { getHomeService as HomeService} from './home/Service'

import { Route, Switch, Redirect } from "react-router-dom"

// TODO: this should be an environment variable
const API_BASE_URL = "http://localhost:8080"
const HOME_PATH = "/hvac"

/**
 * Component used to display a loading message.
 */
function Loading() {
  return (
    <div className="ui very padded text container ">
      <div className="ui icon massive message">
        <i className="notched circle loading icon"></i>
        <div className="content">
          <div className="header">Just one second</div>
        </div>
      </div>
    </div>
  )
}

/**
 * Component used to display a message stating that tghe HVAC API is offline.
 */
function Offline() {
  return (
    <div className="ui very padded text container ">
      <div className="ui icon massive error message">
        <i className="wrench icon"></i>
        <div className="content">
          <div className="header">HVAC API is offline</div>
        </div>
      </div>
    </div>
  )
}

function RouteRenderer({ homeInfo }) {
  // Do we have a link with the 'temperature' rel-type? If so, we are good to go.
  const isOnline = homeInfo && homeInfo.resources.temperature
  const temperatureService = !isOnline ? undefined : 
        TemperatureService(new URL(homeInfo.resources.temperature.href, API_BASE_URL))
  
  // Do we have a link with the 'power_state' rel-type? If so, we enable power control in the UI.
  const hvacService = !homeInfo || !homeInfo.resources.power_state ? undefined : 
        HvacService(new URL(homeInfo.resources.power_state.href, API_BASE_URL)) 

  return (
    <Switch>
      <Route exact path="/login">
        <></>
      </Route>
      <Route exact path="/hvac">
        { isOnline ? 
              <HvacPage hvacService={hvacService} temperatureService={temperatureService} /> : 
              <Offline />
        }
      </Route>
      <Route>
        <Redirect to="/hvac" />
      </Route>
    </Switch>
  )
}

/**
 * The application's root component
 */
class App extends React.Component {

  async componentDidMount() {
    const homeService = HomeService(new URL(HOME_PATH, API_BASE_URL))
    const homeInfo = await homeService.getHomeInfo()
    this.setState( { homeInfo } )
  }

  render() {
    return (
      <div className="App">
        { !this.state ? <Loading /> : <RouteRenderer homeInfo={this.state.homeInfo} />}
      </div>
    )
  }
}

export default App
