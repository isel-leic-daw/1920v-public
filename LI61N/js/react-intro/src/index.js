import React from 'react'
import ReactDOM from 'react-dom'

const items = ['DAW', 'CN']

function List({items}) {
  return React.createElement('ul', {},
    items.map(item => React.createElement('li', {key: item}, item)))
}

const _e_ = (name, props, ...children) => React.createElement(name, props, ...children)

function List2({items}) {
  return _e_('ul', {},
    items.map(item => _e_('li', {key: item}, item)))
}


function List3({item}) {
  return(
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  )
}

ReactDOM.render(
  React.createElement(List3, {items}),
  document.getElementById('container')
)
