import React from 'react'

import { UserManager } from 'oidc-client'

var settings = {
  authority: 'http://localhost:8080/openid-connect-server-webapp',
  client_id: 'app',
  redirect_uri: 'http://localhost:9000/index.html',
  popup_redirect_uri: 'http://localhost:9000/redirect.html',
  response_type: 'code',
  scope: 'openid email read-projects',
  loadUserInfo: true
}

export const userManager = new UserManager(settings)

export class OidcDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: false
    }
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.handleSignout = this.handleSignout.bind(this)
  }

  render () {
    return !this.state.authenticated
      ? (
        <div>
          <button onClick={this.handleAuthentication}>Get User</button>
        </div>
      ) : (
        <>
          <pre>
            {JSON.stringify(this.state.user, null, '\t')}
          </pre>
          <button onClick={this.handleSignout}>Sign out</button>
        </>
      )
  }

  async handleAuthentication () {
    let user = await userManager.getUser()
    if (!user) {
      try {
        user = await userManager.signinPopup()
      } catch (error) {
        console.log(error)
        this.setState({
          error: error
        })
        return
      }
    }
    this.setState({
      authenticated: true,
      user: user
    })
  }

  async handleSignout () {
    userManager.signoutPopup()
    this.setState({
      authenticated: false
    })
  }
}
