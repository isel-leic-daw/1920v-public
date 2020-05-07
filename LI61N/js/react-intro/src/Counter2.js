import React from 'react'

// Now the component is a constructor function
// let instance = new Counter(...)
// instance.render()

export default class Counter extends React.Component {
  constructor (props) {
    super(props)
    console.log('ctor')
    this.state = { counter: 0 }
  }

  render () {
    // console.log('render')
    return (
      <div>
        <button onClick={() => this.update(-1)}>-</button>
        {this.state.counter}
        <button onClick={() => this.update(+1)}>+</button>
      </div>
    )
  }

  componentDidMount () {
    this.intervalId = setInterval(() => this.update(1), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  update (delta) {
    // console.log('update')
    this.setState((oldState) => ({ counter: oldState.counter + delta }))
  }
}
