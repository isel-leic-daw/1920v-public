import React from 'react'
import TemperatureCard from './TemperatureCard'

/**
 * Component used to display the fragment with the HVAC's temperature control
 * 
 * @param {*} props - The props object with the following properties:
 *    temperatureService  - the service used to interact with the API's temperature resource
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

  async fetchTemperatureInfo() {
    return this.props.temperatureService.getTemperatureInfo().then((temperature) => {
      if (temperature) { this.setState( { temperature } ) }
    })
  }

  async componentDidMount() {
    this.fetchTemperatureInfo().then(() => { 
      this.timerId = setInterval(() => { 
        this.fetchTemperatureInfo()
      }, 10000)
    })
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    // TODO: cancel ongoing requests, if they exist
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
