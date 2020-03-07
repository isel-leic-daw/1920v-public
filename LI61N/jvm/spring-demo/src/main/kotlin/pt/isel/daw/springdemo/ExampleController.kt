package pt.isel.daw.springdemo

import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.databind.annotation.JsonNaming
import org.springframework.http.ResponseEntity
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.*
import pt.isel.daw.springdemo.data.ClientIp
import java.net.URI

@RestController
@RequestMapping("/examples")
class ExampleController {

    @GetMapping("1")
    fun handler1() = "Hello Web"

    @GetMapping("2", produces = ["text/plain"])
    fun handler2() = "Hello Web"

    @GetMapping("3/{id}")
    fun handler3(@PathVariable("id") id: Int) = "id is $id"

    @GetMapping("4")
    fun handler4(@RequestParam("id") id: Int) = "id is $id"

    @GetMapping("5")
    fun handler5(@RequestParam prms: MultiValueMap<String, String>) =
        prms
            .map { "${it.key}: ${it.value.joinToString(", ", "[", "]")}\n" }
            .joinToString()

    data class OutputModel6(
        val theInt: Int,
        val theString: String
    )
    @GetMapping("6")
    fun handler6() = OutputModel6(42, "hello")

    @JsonNaming(PropertyNamingStrategy.KebabCaseStrategy::class)
    data class OutputModel7(
        val theInt: Int,
        val theString: String)

    @GetMapping("7")
    fun handler7() = OutputModel7(42, "hello")

    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy::class)
    data class OutputModel8(
        val theInt: Int,
        val theString: String)

    @GetMapping("8")
    fun handler8() = OutputModel8(42, "hello")

    @GetMapping("9")
    fun handler9(clientIp: ClientIp) = "Hello ${clientIp.ipString}"

    @GetMapping("10")
    fun handle10() = ResponseEntity.status(400)
        .header("My-Header", "My-Value1", "My-Value2")
        .body(OutputModel6(42, "hello"))

    @GetMapping("11")
    fun get11() = URI("https://www.example.com")


}