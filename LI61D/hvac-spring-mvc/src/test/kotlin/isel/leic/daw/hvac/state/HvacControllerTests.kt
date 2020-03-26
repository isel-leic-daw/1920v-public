package isel.leic.daw.hvac.state

import isel.leic.daw.hvac.common.HVAC_STATE_PATH
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.put

/**
 * For more information regarding this kind of testing, see:
 * <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/testing.html#spring-mvc-test-framework">
 *     Spring Testing
 * </a> and <a href="https://github.com/jayway/JsonPath">JsonPath</a>
 */
@SpringBootTest
@AutoConfigureMockMvc
class HvacControllerTests {

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    fun getPowerState_shouldReturn200AndPowerStateOutputModelPayload() {
        mvc.get(HVAC_STATE_PATH) {
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.value") { value("OFF") }
        }
    }

    @Test
    fun putPowerState_withValidPayload_shouldReturn200() {
        mvc.put(HVAC_STATE_PATH) {
            accept = MediaType.APPLICATION_JSON
            contentType = MediaType.APPLICATION_JSON
            content = " { \"value\": \"ON\" } "
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.value") { value("ON") }
        }
    }
}