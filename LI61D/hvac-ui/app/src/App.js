import React from 'react'
import './App.css'
import TemperatureCard from './temperature/Card'
import TemperaturePage from './near_future/TemperaturePage'
import HvacControl from './near_future/HvacControl'
import { getTemperatureService as TemperatureService, getMockedTemperatureService as MockedTemperatureService } from './temperature/Service'
import Page from './temperature/Page'

const temperatureService = TemperatureService()
//const temperatureService = MockedTemperatureService()


function App() {
  const temperature = {
    current: { value: 26, label: "Current" },
    target: { value: 23, label: "Target" }
  }
  const nearFutureControl = undefined // <HvacControl />
  const nearFutureTemperature = undefined // <TemperaturePage temperatureService={temperatureService} />
  return (
    <div className="App">
      {nearFutureControl}
      {nearFutureTemperature}
      <Page temperatureService = {temperatureService} />
    </div>
  )
}

export default App
