import React from 'react'
import './App.css'
import TemperatureCard from './temperature/Card'
import TemperaturePage from './near_future/TemperaturePage'
// import { getMockedTemperatureService as TemperatureService} from './near_future/TemperatureService'
import { getTemperatureService as TemperatureService} from './near_future/TemperatureService'

const temperatureService = TemperatureService()

function App() {
  const temperature = {
    current: { value: 26, label: "Current" },
    target: { value: 23, label: "Target" }
  }
  const nearFuture = <TemperaturePage temperatureService={temperatureService} />
  return (
    <div className="App">
      <div className="ui text container">
          <div className="ui centered cards">
            {nearFuture}
            <TemperatureCard value={temperature.current.value} label={temperature.current.label} 
                editable={false} />
            <TemperatureCard value={temperature.target.value} label={temperature.target.label} 
                editable={true} />
          </div>
      </div>
    </div>
  )
}

export default App
