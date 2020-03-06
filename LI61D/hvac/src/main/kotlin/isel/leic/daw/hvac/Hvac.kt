package isel.leic.daw.hvac

/**
 * The HVAC implementation.
 *
 * @constructor Initiates an instance with the specified dependencies.
 */
class Hvac(private val sensor: Sensor, private val cooler: Cooler, private val heater: Heater) {

    /**
     * The current temperature.
     */
    val current: Temperature
        get() = sensor.temperature

    /**
     * The HVAC's power state. It can be either turned on ([Power.ON]), in which case it will be regulating
     * the environment's temperature, or turned off ([Power.OFF]), doing nothing and therefore being
     * environmentally neutral ;)
     */
    var power: Power = Power.OFF

    /**
     * The target temperature, that is, the desired environment temperature.
     */
    var target: Temperature = Temperature.HUMAN_COMFORT
        set(value) {
            if (power == Power.OFF || value isApproximateTo current) {
                return
            }
            field = value
            // TODO:
        }
}