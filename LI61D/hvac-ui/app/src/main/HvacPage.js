import React from 'react'
import HvacControl from './hvac/HvacControl'
import TemperatureFragment from './temperature/TemperatureFragment'
import HvacContext from './HvacContext'

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
 *    hvacService         - the service used to interact with the API's HVAC resource. Maybe undefined,
 *                          in which case the power controls are disabled.
 *    temperatureService  - the service used to interact with the API's temperature resource
 */
class HvacPage extends React.Component {

  async componentDidMount() {
    if (!this.props.hvacService) {
      this.setState( { powerState: { value: '---' }, errorMessage: undefined })
      return Promise.resolve()
    }

    try {
      const powerStateResource = await this.props.hvacService.getPowerState()
      const powerState = this.props.hvacService.convertToPowerState(powerStateResource)
      this.setState( { powerState, errorMessage: undefined, sirenResource: powerStateResource } )
    }
    catch (error) {
      console.error(error)
      this.setState( { errorMessage: "Could not reach the HVAC API" } )
    }
  }

  handlePowerStateChanged = async (newValue) => {
    try {
      this.setState({ updating: true })
      const updateAction = this.props.hvacService.getPowerStateUpdateAction(this.state.sirenResource)
      const powerStateResource = await this.props.hvacService.updatePowerState(newValue, updateAction)
      const powerState = this.props.hvacService.convertToPowerState(powerStateResource)
      this.setState({ powerState, updating: false, errorMessage: undefined, sirenResource: powerStateResource })
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

  powerControlCapability() {
    return this.props.hvacService && this.state && this.state.sirenResource && 
              this.props.hvacService.getPowerStateUpdateAction(this.state.sirenResource) ? 
              this.handlePowerStateChanged : undefined
  }

  render() {
    const errorMessageElement = this.maybeRenderError()
    const powerState = (!this.state || this.state.updating || errorMessageElement) ? '' : this.state.powerState.value
    const powerControlPlaceholder = errorMessageElement ? errorMessageElement : 
            <HvacControl  powerState={powerState} 
                          onChange={this.powerControlCapability()} />
    return ( 
      <HvacContext.Provider value={{ errorMessage: this.state && this.state.errorMessage ? this.state.errorMessage : undefined }}>
        {powerControlPlaceholder}
        <TemperatureFragment temperatureService={wrapWithErrorHandler(this.props.temperatureService, this.handleTemperatureServiceError)} />
      </HvacContext.Provider>
    )
  }
}

export default HvacPage
