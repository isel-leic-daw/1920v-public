import React from 'react'

let count = 0;

/**
 * Component used to illustrate the more relevant lifecycle callbacks
 */
class LifeCycle extends React.Component {

  constructor(props) {
    super(props)
    this.instanceID = count++
    console.log(`LifeCycle constructor() for ${this.instanceID}`)
  }

  componentDidMount() {
    console.log(`LifeCycle componentDidMount() for ${this.instanceID}. Lets setup asynchronous work (e.g. network requests).`)
  }

  componentWillUnmount() {
    console.log(`LifeCycle componentWillUnmount() for ${this.instanceID}. Lets cleanup (e.g. cleanup pending asynchronous work).`)
  }

  render() {
    console.log(`LifeCycle render() for ${this.instanceID}. This is a pure function!!!`)
    return <div></div>
  }

  /*
  // Deprecated lifecycle callbacks
  UNSAFE_componentWillMount() {
    console.log('LifeCycle componentWillMount()')
  }

  UNSAFE_componentWillReceiveProps() {
    console.log('LifeCycle componentWillReceiveProps()')
  }

  UNSAFE_componentWillUpdate() {
    console.log('LifeCycle componentWillReceiveProps()')
  }
  */
}

export default LifeCycle