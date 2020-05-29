function temperatureInfoFromSiren(sirenContent) {
  return {
    current: { value: sirenContent.properties.current, label: 'Current' },
    target: { value: sirenContent.properties.target, label: 'Target' }
  }
}

let temperatureService = undefined

/**
 * Function used to obtain the service associated to the temperature resource
 * @param {URL} resourceUrl - The URL of the temperature resource
 */
export function getTemperatureService(resourceUrl, apiBaseUrl, authToken) {

  if (!temperatureService || authToken !== temperatureService.authToken 
    || resourceUrl.toString() !== temperatureService.resourceUrl) {

    temperatureService = {
      resourceUrl: resourceUrl.toString(),
      authToken,
      getTemperatureInfo: async () => {
        console.log(`TemperatureService.getTemperatureInfo()`)
        const response = await fetch(resourceUrl, {
          headers: { 'Authorization': authToken }
        })
        const content = await response.json()
        return temperatureInfoFromSiren(content)
      },

      updateTargetTemperature: async (newValue) => {
        console.log(`TemperatureService.updateTarget(${newValue})`)
        // TODO: Remove this dependency to an hard-coded resource URL
        const response = await fetch('http://localhost:3000/api/temperature/target', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
          body: JSON.stringify({ value: newValue })
        })
        const content = await response.json()
        return temperatureInfoFromSiren(content)
      }
    }
  }

  return temperatureService
}

/**
 * Function used to obtain a mocked version of the service associated to the temperature resource
 */
export function getMockedTemperatureService() {
  const temperatureInfo = { 
    current: { value: 25, label: "Current" },
    target: { value: 25, label: "Target" }
  }
  
  return {
    getTemperatureInfo: async () => {
      console.log(`MockedTemperatureService.getTemperatureInfo()`)
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(temperatureInfo), 5000)
      })    
    },

    updateTargetTemperature: async (newValue) => {
      console.log(`MockedTemperatureService.updateTarget(${newValue})`)
      return new Promise((resolve, reject) => {
        setTimeout(() => { temperatureInfo.target.value = newValue; resolve(temperatureInfo) }, 5000)
      })    
    }
  }
}
