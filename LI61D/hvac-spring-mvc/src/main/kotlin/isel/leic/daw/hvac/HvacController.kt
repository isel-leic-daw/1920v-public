package isel.leic.daw.hvac

import isel.leic.daw.hvac.common.APPLICATION_JSON
import isel.leic.daw.hvac.common.ProblemJson
import isel.leic.daw.hvac.model.Hvac
import isel.leic.daw.hvac.model.InvalidTemperature
import isel.leic.daw.hvac.model.Power
import isel.leic.daw.hvac.model.Temperature
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
class HvacController(private val hvac: Hvac) {

    @ExceptionHandler
    fun handleInvalidTemperature(ex: InvalidTemperature): ResponseEntity<ProblemJson> {
        return ResponseEntity
                .badRequest()
                .body(ProblemJson(
                        type = "the error doc link",
                        title = "Invalid temperature",
                        detail = "detail",
                        status = 400
        ))
    }

    @GetMapping("/temperature/target")
    fun getTargetTemperature() = hvac.target

    @PutMapping("/temperature/target", consumes = [APPLICATION_JSON])
    fun putTargetTemperature(@RequestBody newTarget: Temperature): ResponseEntity<Unit> {
        if (Temperature.validate(newTarget)) {
            hvac.target = newTarget
            return ResponseEntity.ok(Unit)
        }
        else {
            throw InvalidTemperature()
        }
    }

    @GetMapping("/temperature/current")
    fun getCurrentTemperature() = hvac.current

    @GetMapping("/temperature")
    fun getTemperature() = TemperatureDto(hvac.current, hvac.target)

    @PutMapping("/temperature")
    fun putTemperature(@RequestBody temperature: Temperature) {
        println(temperature)
    }

    @GetMapping("/hvac/power-state")
    fun getPowerState() = hvac.power

    @PutMapping("/hvac/power-state")
    fun putPowerState(state: String) {
        hvac.power = Power.valueOf(state)
    }

}