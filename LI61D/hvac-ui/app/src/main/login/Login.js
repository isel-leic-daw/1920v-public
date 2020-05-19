import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { getLoginService as LoginService} from './Service'
import LoginPage from './LoginPage'

import LoginContext from './LoginContext'

/**
 * Component that decorates its children with the behaviour of ensuring that the user is logged in.
 */

export class Login extends React.Component {

  constructor(props) {
    super(props)
    this.service = LoginService()
    this.state = { isLoggedIn: this.service.isLoggedIn() }
  }
  
  handleLogin = () => {
    this.setState( {isLoggedIn: this.service.isLoggedIn()} )
  }

  render() {
    const shouldLogIn = !this.state || !this.state.isLoggedIn
    return (
      <Switch>
        <Route exact path="/login">
          { shouldLogIn ? 
              <LoginPage service={this.service} onLogin={this.handleLogin} /> :
              <Redirect to="/" />
          }
        </Route>
        <Route>
          { shouldLogIn ? 
              <Redirect to="/login" /> : 
              <LoginContext.Provider value={{loginService: this.service}}>{this.props.children}</LoginContext.Provider> 
          }
        </Route>
      </Switch>
    )
  }
}