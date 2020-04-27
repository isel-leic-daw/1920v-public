import React from 'react'
import TemperatureCard from './TemperatureCard'
import LifeCycle from './LifeCycle'

/**
 * Component used to display the HVAC's temperature page
 * 
 * @param {*} props - The props object with the following properties:
 *    temperatureService - the service used to interact with the API's temperature resource
 */
class TemperaturePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      temperature: { 
        current: { value: 30, label: "Current" },
        target: { value: 25, label: "Target" }
      }
    }
  }

  temperatureChanged = async (oldValue, newValue) => {
    this.setState({ updating: true })
    console.log(`Old value = ${oldValue}; New value = ${newValue}`)
    const updatedTemperature = await this.props.temperatureService.updateTarget(newValue)
    console.log(`Result is ${JSON.stringify(updatedTemperature)}`)
    this.setState({ temperature: updatedTemperature, updating: false })
  }
  
  render() {
    return (
      <div className="ui text container">
        <div className="ui centered cards">
          <TemperatureCard value={this.state.temperature.current.value} label={this.state.temperature.current.label} />
          <TemperatureCard value={this.state.temperature.target.value} label={this.state.temperature.target.label} 
              editable={true} disabled={this.state.updating} onChange={this.temperatureChanged} />
        </div>
        <LifeCycle />
      </div>
    )
  }
}

export default TemperaturePage
