import React from 'react'
import TemperatureCard from './TemperatureCard'

/**
 * Component used to display the fragment with the HVAC's temperature control
 * 
 * @param {*} props - The props object with the following properties:
 *    temperatureService  - the service used to interact with the API's temperature resource
 *    errorState          - a boolean value indicating whether the component should be displayed on its error state. 
 *                          Default is false.
 */
class TemperatureFragment extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      temperature: { 
        current: { value: "", label: "Current" },
        target: { value: "", label: "Target" }
      }
    }
  }

  async componentDidMount() {
      this.props.temperatureService.getTemperatureInfo().then((temperature) => {
        if (temperature)
          this.setState( { temperature } )
      })
  }

  handleTargetTemperatureChanged = async (oldValue, newValue) => {
    this.setState({ updating: true })
    console.log(`Old value = ${oldValue}; New value = ${newValue}`)
    this.props.temperatureService.updateTargetTemperature(newValue).then((updatedTemperature) => {
      if (updatedTemperature) {
        console.log(`Result is ${JSON.stringify(updatedTemperature)}`)
        this.setState({ temperature: updatedTemperature, updating: false })
      }
    })
  }
  
  render() {
    return (
      <div className="ui text container">
        <div className="ui centered cards">
          <TemperatureCard value={this.state.temperature.current.value} 
              label={this.state.temperature.current.label} errorState={this.props.errorState} />

          <TemperatureCard value={this.state.temperature.target.value} 
              label={this.state.temperature.target.label} 
              editable={true} disabled={this.state.temperature.target.value === "" || this.state.updating} 
              onChange={this.handleTargetTemperatureChanged} errorState={this.props.errorState} />
        </div>
      </div>
    )
  }
}

export default TemperatureFragment
