import React from 'react'

/**
 * Component used to edit a temperature value.
 * 
 * @param {*} props - The props object with the following properties:
 *  initialValue  - the initial temperature value.
 *  disabled      - a boolean value indicating whether the component is disabled or not. Default is false.
 *  onChange      - the callback function to be used whenever the temperature is changed by the user. The 
 *                  function receives the temperature values initialValue and newValue.
 */
class TemperatureControl extends React.PureComponent {

  handleEditButtonClick = () => {
    this.setState( { editing: true } )
  }

  handleCancelButtonClick = () => {
    this.setState( { editing: false, value: this.props.initialValue } )
  }

  handleDoneButtonClick = () => {
    this.setState( { editing: false } )
    this.props.onChange(this.props.initialValue, this.state.value)
  }

  handleInputChange = (event) => {
    this.setState( { value: event.target.value } )
  }

  renderEditingMode() {
    let currentValue = this.state.value || this.props.initialValue
    return (
      <div className="ui mini input">
        <input type="number" placeholder="Enter new value..." value={currentValue} onChange={this.handleInputChange} /> &nbsp;
        <div className="ui small basic icon buttons">
          <div className="ui red basic button" onClick={this.handleCancelButtonClick}>
            <i className="close icon" />
          </div>
          <div className="ui green basic button" onClick={this.handleDoneButtonClick}>
            <i className="check icon" />
          </div>
        </div>
      </div>
    )
  }

  renderNonEditingMode() {
    const buttonClass = this.props.disabled ? 'ui disabled loading basic blue button' : 'ui basic blue button'
    return (
      <div style={{ visibility: this.props.editable ? "visible" : "hidden", height: "30pt" }}>
        <div className={buttonClass} onClick={this.handleEditButtonClick}>
            <i className="edit icon" />Edit
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  render() {
    return !this.state.editing ? this.renderNonEditingMode() : this.renderEditingMode()
  }
}

export default TemperatureControl