import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const len = 10

ReactDOM.render(
  React.createElement(App, { len: len }),
  document.getElementById('container')
)
