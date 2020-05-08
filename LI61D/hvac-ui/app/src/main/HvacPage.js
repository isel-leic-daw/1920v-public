import React from 'react'
import HvacControl from './hvac/HvacControl'
import TemperatureFragment from './temperature/TemperatureFragment'

/**
 * Gets an implementation of the TemperatureService contract that handles the errors thrown by the received
 * service implementation by calling the given error handler.
 * @param {*} temperatureService  - the service used to interact with the API's temperature resource
 * @param {*} errorHandler        - the function to be called to handle the error
 */
function wrapWithErrorHandler(temperatureService, errorHandler) {
  return {
    getTemperatureInfo: async () => {
      try { return await temperatureService.getTemperatureInfo() }
      catch(error) { errorHandler(error); throw error }
    },

    updateTargetTemperature: async (newValue) => {
      try { return await temperatureService.updateTargetTemperature(newValue) }
      catch(error) { errorHandler(error); throw error }
    }
  }
}

/**
 * Component used to display the HVAC's page
 * 
 * @param {*} props - The props object with the following properties:
 *    hvacService         - the service used to interact with the API's HVAC resource
 *    temperatureService  - the service used to interact with the API's temperature resource
 */
class HvacPage extends React.Component {

  async componentDidMount() {
    try {
      const powerState = await this.props.hvacService.getPowerState()
      this.setState( { powerState, errorMessage: undefined } )
    }
    catch (error) {
      console.error(error)
      this.setState( { errorMessage: "Could not reach the HVAC API" } )
    }
  }

  handlePowerStateChanged = async (newValue) => {
    try {
      this.setState({ updating: true })
      const powerState = await this.props.hvacService.updatePowerState(newValue)
      this.setState({ powerState, updating: false, errorMessage: undefined })
    }
    catch (error) {
      console.error(error)
      this.setState( { errorMessage: "Could not reach the HVAC API" } )
    }
  }

  handleTemperatureServiceError = (error) => {
    console.error(error)
    this.setState( { errorMessage: "Could not reach the HVAC API" } )
  }

  maybeRenderError() {
    return this.state && this.state.errorMessage ? (
        <div className="ui negative massive message">
          <div className="header">Something went wrong</div>
          <p>{this.state.errorMessage}</p>
        </div>
    ) : undefined
  }

  render() {
    const errorMessage = this.maybeRenderError()
    const powerState = (!this.state || this.state.updating || errorMessage) ? '' : this.state.powerState.value
    const control = errorMessage ? errorMessage : <HvacControl powerState={powerState} onChange={this.handlePowerStateChanged} />
    return ( 
      <>
        {control}
        <TemperatureFragment temperatureService={wrapWithErrorHandler(this.props.temperatureService, this.handleTemperatureServiceError)} 
            errorState={errorMessage !== undefined} />
      </>
    )
  }
}

export default HvacPage
