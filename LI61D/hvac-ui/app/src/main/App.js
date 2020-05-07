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
  return (
    <div className="App">
      <HvacPage hvacService = {hvacService} temperatureService = {temperatureService} />
    </div>
  )
}

export default App
