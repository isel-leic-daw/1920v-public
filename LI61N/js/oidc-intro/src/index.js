import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { userManager } from './oidc'

import { Log } from 'oidc-client'

userManager.signinPopupCallback()
Log.logger = console

ReactDOM.render(
  <App />,
  document.getElementById('container')
)
