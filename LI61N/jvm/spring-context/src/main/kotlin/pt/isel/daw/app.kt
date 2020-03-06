package pt.isel.daw

import org.springframework.beans.factory.config.BeanDefinition
import org.springframework.beans.factory.config.BeanDefinition.SCOPE_SINGLETON
import org.springframework.beans.factory.config.BeanDefinitionCustomizer
import org.springframework.context.annotation.AnnotationConfigApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.stereotype.Component
import java.time.Instant
import java.util.function.Supplier

class Component0

interface Service1
class Component1 : Service1

class Component2(val service1: Service1)

class Component3(val instant: Instant)

interface Clock {
    val now: Instant
}

class Component4(val service1: Service1)

@ComponentScan
class Config {
    @Bean
    fun component4(service1: Service1) = Component4(service1)
}

@Component
class Component5

fun main() {
    println("Hello World")
    val context = AnnotationConfigApplicationContext(
        Component0::class.java,
        Component1::class.java,
        Component2::class.java,
        Config::class.java
    )

    val c0 = context.getBean(Component0::class.java)
    println("c0 type is ${c0::class.java.name}")

    val c1 = context.getBean(Service1::class.java)
    println("c1 type is ${c1::class.java.name}")

    val c2 = context.getBean(Component2::class.java)
    println("c2 type is ${c2::class.java.name}")
    println("Is c2.service1 the same instance as c1? ${c2.service1 == c1}")

    context.registerBean(Component3::class.java,
        Supplier { Component3(Instant.now()) },
        BeanDefinitionCustomizer {bd : BeanDefinition -> bd.scope = SCOPE_SINGLETON })

    val c3 = context.getBean(Component3::class.java)
    println("c3.instant = ${c3.instant}")

    val c4 = context.getBean(Component4::class.java)

    val c5 = context.getBean(Component5::class.java)

}
