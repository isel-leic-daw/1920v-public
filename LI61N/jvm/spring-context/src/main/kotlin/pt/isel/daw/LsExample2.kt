package pt.isel.daw

import org.springframework.context.annotation.AnnotationConfigApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component

class Request
class Response
interface MyDataSource

interface CommandHandler {
    fun handle(request: Request): Response
}

interface TransactionManager

@Component
class DefaultTransactionManager(private val ds: MyDataSource) : TransactionManager

@Component
class GetStudents(private val dataSource: MyDataSource) : CommandHandler {
    override fun handle(request: Request) = Response()
}

@Component
class GetStudentsById(private val dataSource: MyDataSource) : CommandHandler {
    override fun handle(request: Request) = Response()
}

@Component
class PostStudents(private val transactionManager: TransactionManager) : CommandHandler {
    override fun handle(request: Request) = Response()
}

@Component
class PostCourse(private val transactionManager: TransactionManager) : CommandHandler {
    override fun handle(request: Request) = Response()
}

@Component
class Router(val handlers: List<CommandHandler>) {
    fun route(request: Request): CommandHandler {
        throw NotImplementedError()
    }
}

@ComponentScan
@Configuration
open class MyConfig {

    @Bean
    open fun createDataSource() : MyDataSource {
        // lets pretend a good data source is created and initialized
        return object : MyDataSource{}
    }
}

fun main() {
    println("Hello World")
    val context = AnnotationConfigApplicationContext(
        MyConfig::class.java
    )

    val router = context.getBean(Router::class.java)

    println("Router has ${router.handlers.size} handlers")

}