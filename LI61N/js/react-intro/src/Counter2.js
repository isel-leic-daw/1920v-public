import React from 'react'

// Now the component is a constructor function
// let instance = new Counter(...)
// instance.render()

export default class Counter extends React.Component {
  constructor (props) {
    super(props)
    console.log('ctor')
    this.state = { counter: 0 }

    this.handleDec = this.handleDec.bind(this)
    this.handleInc = this.handleInc.bind(this)
  }

  handleDec () {
    this.update(-1)
  }

  handleInc () {
    this.update(+1)
  }

  render () {
    // console.log('render')
    return (
      <div>
        <button onClick={() => { this.handleDec() }}>-</button>
        <button onClick={this.handleDec}>-</button>
        {this.state.counter}
        <button onClick={this.handleInc}>+</button>
      </div>
    )
  }

  componentDidMount () {
    // this.intervalId = setInterval(() => this.update(1), 1000)
  }

  componentWillUnmount () {
    // clearInterval(this.intervalId)
  }

  update (delta) {
    // console.log('update')
    this.setState((oldState) => ({ counter: oldState.counter + delta }))
  }

  componentDidUpdate (oldProps, oldState) {
    const { callback } = this.props
    if (callback && oldState.counter !== this.state.counter) {
      callback(this.state.counter)
    }
  }
}
