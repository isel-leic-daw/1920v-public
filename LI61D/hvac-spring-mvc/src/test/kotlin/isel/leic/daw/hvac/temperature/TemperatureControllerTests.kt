package isel.leic.daw.hvac.temperature

import isel.leic.daw.hvac.common.CURRENT_TEMPERATURE_PATH
import isel.leic.daw.hvac.common.TARGET_TEMPERATURE_PATH
import isel.leic.daw.hvac.common.TEMPERATURE_PATH
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath

/**
 * For more information regarding this kind of testing, see:
 * <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/testing.html#spring-mvc-test-framework">
 *     Spring Testing
 * </a> and <a href="https://github.com/jayway/JsonPath">JsonPath</a>
 */
@SpringBootTest
@AutoConfigureMockMvc
class TemperatureControllerTests {

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    fun getTemperature_shouldReturn200AndATemperatureInfoOutputModelPayload() {

        mvc.get(TEMPERATURE_PATH) {
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.current").exists()
            jsonPath("$.target").exists()
        }
    }

    @Test
    fun getTargetTemperature_shouldReturn200AndATemperatureOutputModelPayload() {

        mvc.get(TARGET_TEMPERATURE_PATH) {
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.value") { exists() }
        }
    }

    @Test
    fun putTargetTemperature_withValidPayload_shouldReturn200() {

        mvc.put(TARGET_TEMPERATURE_PATH) {
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
            content = "{ \"value\": 23 } "
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.current") { exists() }
            jsonPath("$.target") { exists() }
        }
    }

    @Test
    fun getCurrentTemperature_shouldReturn200AndATemperatureOutputModelPayload() {

        mvc.get(CURRENT_TEMPERATURE_PATH) {
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.value") { exists() }
        }
    }
}