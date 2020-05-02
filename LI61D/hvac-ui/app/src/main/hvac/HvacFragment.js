import React from 'react'
import HvacControl from './HvacControl'

/**
 * Component used to display the fragment with the HVAC's enabled state control
 * 
 * @param {*} props - The props object with the following properties:
 *    hvacService - the service used to interact with the API's HVAC resource
 */
class HvacFragment extends React.Component {

  async componentDidMount() {
    const powerState = await this.props.hvacService.getPowerState()
    this.setState( { powerState } )
  }

  handlePowerStateChanged = async (newValue) => {
    this.setState({ updating: true })
    const powerState = await this.props.hvacService.updatePowerState(newValue)
    this.setState({ powerState, updating: false })
  }
  
  render() {
    const powerState = (!this.state || this.state.updating || !this.state.powerState.value) ? '' : this.state.powerState.value
    return <HvacControl powerState={powerState} onChange={this.handlePowerStateChanged} />
  }
}

export default HvacFragment
