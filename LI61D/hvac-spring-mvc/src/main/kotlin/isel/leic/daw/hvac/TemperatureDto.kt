package isel.leic.daw.hvac

import isel.leic.daw.hvac.model.Temperature

data class TemperatureDto(val current: Temperature, val target: Temperature)