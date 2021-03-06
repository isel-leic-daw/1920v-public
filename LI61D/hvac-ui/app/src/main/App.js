import React, { useState, useContext, useEffect } from 'react'
import './App.css'
import HvacPage from './HvacPage'
import LoginPage from './login/LoginPage'
import { getTemperatureService as TemperatureService } from './temperature/Service'
import { getHvacService as HvacService } from './hvac/Service'
import { getHomeService as HomeService} from './home/Service'

import { Route, Switch, Redirect } from "react-router-dom"
import LoginContext from './login/LoginContext'

// TODO: this should be an environment variable
const API_BASE_URL = 'http://localhost:3000/api'
const HOME_PATH = '/hvac'

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

function RouteRenderer({ homeInfo, authToken }) {

  // Do we have a link with the 'temperature' rel-type? If so, we are good to go.
  const isOnline = homeInfo && homeInfo.resources.temperature
  const temperatureService = !isOnline ? undefined : 
        TemperatureService(new URL(`${API_BASE_URL}${homeInfo.resources.temperature.href}`), API_BASE_URL, authToken)
  
  // Do we have a link with the 'power_state' rel-type? If so, we enable power control in the UI.
  const hvacService = !homeInfo || !homeInfo.resources.power_state ? undefined : 
        HvacService(new URL(`${API_BASE_URL}${homeInfo.resources.power_state.href}`), API_BASE_URL, authToken) 

  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
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
function App(){

  const context = useContext(LoginContext)
  const homeService = HomeService(new URL(`${API_BASE_URL}${HOME_PATH}`), context.loginService.getToken())

  const [ homeInfo, setHomeInfo ] = useState()

  // The effect only executes when its dependency fails the Object.is check
  useEffect(() => {
    homeService.getHomeInfo().then((info) => setHomeInfo(info))
  }, [homeService])

  return (
    <div className="App">
      { !homeInfo ? 
            <Loading /> : 
            <RouteRenderer homeInfo={homeInfo} authToken={context.loginService.getToken()} />
      }
    </div>
  )
}

export default App
