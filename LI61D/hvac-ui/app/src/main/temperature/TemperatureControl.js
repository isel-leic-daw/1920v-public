import React from 'react'

/**
 * Component used to edit a temperature value.
 * 
 * @param {*} props - The props object with the following properties:
 *  disabled      - a boolean value indicating whether the component is disabled or not. Default is false.
 *  editable      - a boolean value indicating whether the component is editable or not. Default is true.
 *  initialValue  - the initial temperature value.
 *  onChange      - the callback function to be used whenever the temperature is changed by the user. The 
 *                  function receives the temperature values initialValue and newValue.
 */
class TemperatureControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  handleEditButtonClick = () => {
    this.setState( { editing: true } )
  }

  handleSubmitButtonClick = () => {
    this.setState( { editing: false } )
    this.props.onChange(this.props.initialValue, this.state.currentValue)    
  }

  handleCancelButtonClick = () => {
    this.setState( { editing: false } )
  }

  handleChangeEvent = (event) => {
    this.setState( { currentValue: event.target.value } )
  }

  renderEditingMode() {
    const currentValue = this.state.currentValue || this.props.initialValue
    return (
      <div className="ui mini input">
        <input type="number" placeholder="Enter new value..." value={currentValue} onChange={this.handleChangeEvent} /> &nbsp;
        <div className="ui small basic icon buttons">
          <div className="ui red basic button" onClick={this.handleCancelButtonClick}>
            <i className="close icon" />
          </div>
          <div className="ui green basic button" onClick={this.handleSubmitButtonClick}>
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

  render() {
    return !this.state.editing ? this.renderNonEditingMode() : this.renderEditingMode()
  }
}

export default TemperatureControl