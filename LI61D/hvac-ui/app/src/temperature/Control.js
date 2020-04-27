import React from 'react'

/**
 * Component used to edit a temperature value.
 * 
 * @param {*} props - The props object with the following properties:
 *  disabled      - a boolean value indicating whether the component is disabled or not. Default is false.
 *  editable      - a boolean value indicating whether the component is editable or not. Default is true.
 */
class Control extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  handleEditButtonClick = () => {
    this.setState( { editing: true } )
  }

  renderEditingMode() {
    return (
      <div className="ui mini input">
        <input type="number" placeholder="Enter new value..." /> &nbsp;
        <div className="ui small basic icon buttons">
          <div className="ui red basic button" >
            <i className="close icon" />
          </div>
          <div className="ui green basic button">
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

export default Control