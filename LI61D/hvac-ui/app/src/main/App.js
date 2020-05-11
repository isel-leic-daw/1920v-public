import React from 'react'
import './App.css'
import HvacPage from './HvacPage'
import { 
  getTemperatureService as TemperatureService, 
  getMockedTemperatureService as MockedTemperatureService 
} from './temperature/Service'
import { 
  getHvacService as HvacService, 
  getMockedHvacService as MockedHvacService 
} from './hvac/Service'

const temperatureService = TemperatureService()
// eslint-disable-next-line
const mockedTemperatureService = MockedTemperatureService()

const hvacService = HvacService()
// eslint-disable-next-line
const mockedHvacService = MockedHvacService()


function App() {

  let page = undefined
  switch(window.location.pathname) {
    case '/hvac': 
      page = <HvacPage hvacService = {hvacService} temperatureService = {temperatureService} />
      break;
    
    default:
      page = <a href="./hvac">HVAC</a>
      break;
  }

  return (
    <div className="App">
      {page}
    </div>
  )
}

export default App
