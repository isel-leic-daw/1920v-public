package isel.leic.daw.hvac

import isel.leic.daw.hvac.model.Hvac
import isel.leic.daw.hvac.model.Power
import isel.leic.daw.hvac.model.Temperature
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HvacController(private val hvac: Hvac) {

    @GetMapping("/temperature/target")
    fun getTargetTemperature() = hvac.target

    @PutMapping("/temperature/target")
    fun putTargetTemperature(value: Int): ResponseEntity<Unit> {
        val newValue = Temperature(value.toFloat())
        if (newValue != null) {
            hvac.target = newValue
            return ResponseEntity.ok(Unit)
        }
        else {
            return ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/temperature/current")
    fun getCurrentTemperature() = hvac.current

    @GetMapping("/temperature")
    fun getTemperature() = TemperatureDto(hvac.current, hvac.target)

    @GetMapping("/hvac/power-state")
    fun getPowerState() = hvac.power

    @PutMapping("/hvac/power-state")
    fun putPowerState(state: String) {
        hvac.power = Power.valueOf(state)
    }

}