# Outline and resources #

## Week 1
### 27/02/2019 - Course introduction
* Syllabus, teaching methodology and bibliography.
  * [Evaluation](https://github.com/isel-leic-daw/1920v-public/wiki/evaluation)
  * [Resources](https://github.com/isel-leic-daw/1819v-public/wiki/resources)

## Week 2
### 02/03/2020 - Software design considerations
* Considerations on the subjective nature of software design
* Dependency Injection (DI): Motivation and consequences
  * Through construction parameters
  * Done explicitely by a wiring up procedure that constructs the solution's object graph 
* Materialization on the HVAC controller application, developed during the classes
* Complementary references, for the inquisitive minds
  * [Software quality](https://en.wikipedia.org/wiki/Software_quality)
    * Characteristics ([ISO 9126](http://www.sqa.net/iso9126.html))
    * Assessment tools (i.e. [SonarQube](https://www.sonarqube.org/))
  * Software design principles, some advocates
    * Mark Seeman ([Ploeh Blog](https://blog.ploeh.dk/))
    * Robert Martin (a.k.a Uncle Bob) ([The Clean Code Blog](https://blog.cleancoder.com/))
    * And an interesting debate between them on [Twitter](https://twitter.com/unclebobmartin/status/1135894376222265345?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1135894376222265345&ref_url=https%3A%2F%2Fblog.cleancoder.com%2Funcle-bob%2F2019%2F06%2F08%2FTestsAndTypes.html)

### 04/03/2020 - Software design considerations
* Live coding session (in Kotlin) to design, discuss and implement the HVAC Controller application

## Week 3
### 09/03/2020 - Web Application development, introduction
* DI containers: [Spring](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#spring-core)
  * Motivation
  * Using Spring through [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
  * [Spring Initializr](https://start.spring.io/)
* Refactoring the HVAC controller application to use Spring Boot
* The [Spring Web MVC](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html) framework
  * Motivation and architecture overview

### 12/03/2020 - Web API design, introduction
* Goal: Creating a Web API for the HVAC controller application
* Web APIs (or HTTP APIs): Concept and Motivation
* The [Architecture of the World Wide Web](https://www.w3.org/TR/webarch/)
* The HTTP protocol
  * Request-response message exchange semantics and pattern
  * Request methods [semantics](https://tools.ietf.org/html/rfc7231#section-4.3) and [properties](https://tools.ietf.org/html/rfc7231#section-4.2)
  * Response status code [semantics](https://tools.ietf.org/html/rfc7231#section-6)
  * ["HTTP Method selection"](https://github.com/isel-leic-daw/1819v-public/wiki/HTTP-method-selection)
* Documentation:
  * ["Introduction to Web APIs"](https://github.com/isel-leic-daw/1819v-public/wiki/Web-APIs)
  * ["Designing evolvable Web APIs: Chapter 1"](https://www.oreilly.com/library/view/designing-evolvable-web/9781449337919/ch01.html)
  * ["Designing evolvable Web APIs: Chapter 2"](https://www.oreilly.com/library/view/designing-evolvable-web/9781449337919/ch02.html)
