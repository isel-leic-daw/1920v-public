package pt.isel.daw.demospringaula

import java.time.Instant

interface Clock {
    val now: Instant
}