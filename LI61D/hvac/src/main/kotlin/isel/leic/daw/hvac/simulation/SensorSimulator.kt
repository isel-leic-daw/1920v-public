package isel.leic.daw.hvac.simulation

import isel.leic.daw.hvac.Temperature
import isel.leic.daw.hvac.Sensor as Sensor

class SensorSimulator(
    @Volatile override var temperature: Temperature) : Sensor