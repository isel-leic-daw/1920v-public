package isel.leic.daw.hvac

import isel.leic.daw.hvac.model.Hvac
import isel.leic.daw.hvac.model.Power
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class HvacController(private val hvac: Hvac) {

    @GetMapping("/hvac/power-state")
    fun getPowerState() = hvac.power

    @PutMapping("/hvac/power-state")
    fun putPowerState(state: String) {
        hvac.power = Power.valueOf(state)
    }

}