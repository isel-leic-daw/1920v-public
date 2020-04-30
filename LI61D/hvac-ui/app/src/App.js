import React from 'react'
import './App.css'
import HvacControl from './near_future/HvacControl'
import { 
  getTemperatureService as TemperatureService, 
  getMockedTemperatureService as MockedTemperatureService 
} from './temperature/Service'
import Page from './temperature/Page'

const temperatureService = TemperatureService()
//const temperatureService = MockedTemperatureService()

function App() {
  const nearFutureControl = undefined // <HvacControl />
  return (
    <div className="App">
      {nearFutureControl}
      <Page temperatureService = {temperatureService} />
    </div>
  )
}

export default App
