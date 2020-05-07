import React from 'react'

export default class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { counter: 0 }
  }

  update (delta) {
    this.setState(({ counter }) => ({ counter: counter + delta }))
  }

  render () {
    return (
      <div>
        <button onClick={() => this.update(-1)}>-</button>
        <span>{this.state.counter}</span>
        <button onClick={() => this.update(1)}>+</button>
      </div>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.counter !== this.state.counter && this.props.notify) {
      this.props.notify(this.state.counter)
    }
  }
}
