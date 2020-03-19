package isel.leic.daw.hvac.state

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc

@SpringBootTest
@AutoConfigureMockMvc
class HvacControllerTests {

    @Autowired
    private lateinit var mvc: MockMvc
    @Autowired
    private lateinit var mapper: ObjectMapper

    @Test
    fun getPowerState_shouldReturn200AndPowerStateOutputModelPayload() {
        TODO()
    }

    @Test
    fun putPowerState_withValidPayload_shoulddReturn200() {
        TODO()
    }
}