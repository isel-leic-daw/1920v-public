package pt.isel.daw.demospringaula

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import java.time.Instant

@SpringBootApplication
class DemoSpringAulaApplication {
    @Bean
    fun clock() = object : Clock {
        override val now: Instant
            get() = Instant.now()
    }
}

fun main(args: Array<String>) {
    runApplication<DemoSpringAulaApplication>(*args)
}
