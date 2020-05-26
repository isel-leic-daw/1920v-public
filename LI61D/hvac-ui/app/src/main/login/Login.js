import React, { useState } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { getLoginService as LoginService} from './Service'
import LoginPage from './LoginPage'

import LoginContext from './LoginContext'

/**
 * Component that decorates its children with the behaviour of ensuring that the user is logged in.
 */
export function Login({ children }) {

  const service = LoginService()
  const [logInState, setLoggedIn] = useState({ isLoggedIn: service.isLoggedIn() })

  function handleLogin() {
    setLoggedIn({isLoggedIn: service.isLoggedIn()})
  }

  return (
    <Switch>
      <Route exact path="/login">
        { !logInState.isLoggedIn ? <LoginPage service={service} onLogin={handleLogin} /> : <Redirect to="/" /> }
      </Route>
      <Route>
        { !logInState.isLoggedIn ? 
            <Redirect to="/login" /> : 
            <LoginContext.Provider value={{loginService: service}}>{children}</LoginContext.Provider> 
        }
      </Route>
    </Switch>
  )
}