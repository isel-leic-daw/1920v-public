import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

let len = 10

setInterval(() => {
  ReactDOM.render(
    React.createElement(App, { len: len }),
    document.getElementById('container')
  )
  if (len > 0) {
    len -= 1
  }
}, 2 * 1000)
