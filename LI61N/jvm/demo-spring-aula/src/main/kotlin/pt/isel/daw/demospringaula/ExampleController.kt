package pt.isel.daw.demospringaula

import org.springframework.web.bind.annotation.*
import javax.websocket.server.PathParam

data class OutputModel(val someString: String, val someInt: Int)
data class InputModel(val inputString: String, val inputInt: Int)

@RestController
@RequestMapping("/example")
class ExampleController(private val clock: Clock) {

    @GetMapping("hello", produces = ["text/plain"])
    fun handler0() : String = "Hello World, at ${clock.now}"

    @GetMapping("path1")
    fun handler1() : OutputModel = OutputModel("the string", 42)

    @GetMapping("path2")
    fun handler2(s: String?) = OutputModel(s ?: "no value provided", 42)

    @PostMapping("path3/{id}")
    fun handler3(@PathVariable id: Int, @RequestBody input: InputModel) = OutputModel(input.inputString, input.inputInt)

}