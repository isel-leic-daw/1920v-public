package pt.isel.daw.springdemo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SpringDemoApplication

fun main(args: Array<String>) {
	runApplication<SpringDemoApplication>(*args)
}
