import React from 'react'
import TemperatureCard from './TemperatureCard'

/**
 * Component used to display the fragment with the HVAC's temperature control
 * 
 * @param {*} props - The props object with the following properties:
 *    temperatureService - the service used to interact with the API's temperature resource
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
    const temperatureInfo = await this.props.temperatureService.getTemperatureInfo()
    this.setState( { temperature: temperatureInfo } )
  }

  handleTargetTemperatureChanged = async (oldValue, newValue) => {
    this.setState({ updating: true })
    console.log(`Old value = ${oldValue}; New value = ${newValue}`)
    const updatedTemperature = await this.props.temperatureService.updateTargetTemperature(newValue)
    console.log(`Result is ${JSON.stringify(updatedTemperature)}`)
    this.setState({ temperature: updatedTemperature, updating: false })
  }
  
  render() {
    return (
      <div className="ui text container">
        <div className="ui centered cards">
          <TemperatureCard value={this.state.temperature.current.value} 
              label={this.state.temperature.current.label} />

          <TemperatureCard value={this.state.temperature.target.value} 
              label={this.state.temperature.target.label} 
              editable={true} disabled={this.state.temperature.target.value === "" || this.state.updating} 
              onChange={this.handleTargetTemperatureChanged} />
        </div>
      </div>
    )
  }
}

export default TemperatureFragment
