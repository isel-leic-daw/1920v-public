import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './main/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Login } from './main/login/Login'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Login>
        <App />
      </Login>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
