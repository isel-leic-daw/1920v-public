
/**
 * Function used to obtain the service associated to the temperature resource
 */
function getTemperatureService() {

  return {
    updateTarget: async (newValue) => {
      // TODO: Implement it for real. For now I mock it
      const updatedTemperature = { 
        current: { value: 30, label: "Current" },
        target: { value: newValue, label: "Target" }
      }
      console.log(`TemperatureService.updateTarget()`)
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(updatedTemperature), 5000)
      })    
    }
  }
}

export default getTemperatureService