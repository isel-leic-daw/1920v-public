package isel.leic.daw.hvac

import isel.leic.daw.hvac.model.Hvac
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HvacController(private val hvac: Hvac) {

    @GetMapping("/temperature/target")
    fun getTargetTemperature() = hvac.target

    @GetMapping("/temperature/current")
    fun getCurrentTemperature() = hvac.current

    @GetMapping("/hvac/power-state")
    fun getPowerState() = hvac.power
}