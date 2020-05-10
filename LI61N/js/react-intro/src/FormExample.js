import React from 'react'

export default class FormExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (event) {
    console.log(event.target.value)
    this.setState({ value: event.target.value.toUpperCase() })
  }

  render () {
    return (
      <form>
        <input type='text' value={this.state.value} onChange={this.handleOnChange} />
      </form>
    )
  }
}
