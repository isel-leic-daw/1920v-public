package isel.leic.daw.hvac

/**
 * Contract to be supported by sensors
 */
interface Sensor {
    /**
     * The temperature reported by the sensor
     */
    val temperature: Temperature
}
