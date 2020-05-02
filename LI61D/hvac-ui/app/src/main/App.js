import React from 'react'
import './App.css'
import TemperatureFragment from './temperature/TemperatureFragment'
import HvacFragment from './hvac/HvacFragment'
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
      <HvacFragment hvacService = {hvacService} />
      <TemperatureFragment temperatureService = {temperatureService} />
    </div>
  )
}

export default App
