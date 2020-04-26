# Without Vary

Client:
GET /resource HTTP/1.1
Accept: application/json
Accept-Language: pt

Cache:
forwards the request

Origin-Server:
HTTP/1.1. 200 OK
Content-Type: application/json

{...}

Cache:
stores the response with key (GET, /resource)
forwards the response to the Client

Client:
GET /resource HTTP/1.1
Accept: text/html

Cache:
Lookup (GET, /resource) -> HIT
Responds with with contacting the origin-server
HTTP/1.1. 200 OK
Content-Type: application/json

{...}

# With Vary

Client:
GET /resource HTTP/1.1
Accept: application/json
Accept-Language: pt

Cache:
forwards the request to the origin-server

Origin-Server:
HTTP/1.1. 200 OK
Content-Type: application/json
Vary: Accept

{...}

Cache:
stores the response with key (GET, /resource) and secondary key = (Accept=application/json)
forwards the response to the Client

Client:
GET /resource HTTP/1.1
Accept: text/html

Cache:
Lookup (GET, /resource) -> HIT with secondary key = (Accept=application/json), however request.Accept ("text/html") does not match secondaryKey.Accept ("application/json")
Forwards request to origin-server

Origin-Server:
HTTP/1.1. 200 OK
Content-Type: application/json
Vary: Accept

{...}

Cache:
stores the response with key (GET, /resource) and secondary key = (Accept=text/html)

Origin-Server:
HTTP/1.1. 200 OK
Content-Type: application/json
Vary: Accept, Accept-Language


Response
cache-control: private, max-age=86400, stale-while-revalidate=604800

Request
cache-control: max-age=0


----------------
GET /resource HTTP/1.1

HTTP/1.1 200 OK
Cache-Control: max-age=100, stale-while-revalidate=50, stale-if-error=10000




