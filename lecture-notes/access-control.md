
Handling an HTTP request
  - Request = target resource, method, other information (request headers, body)
  - Access-control decisions and information
    - allow or deny?
    - Audit information to store
    - Extra information to feed into the request handler (user identifier)

The _source_ this is information 
  - in the request message (e.g. request header)
  - in the request message _context_ (TLS connection)

Token
  - [General definition](https://www.thefreedictionary.com/token) 
  > Something serving as an indication, proof, or expression of something else; a sign
  > Something that signifies or evidences authority, validity, or identity

What does the token provide?
  - Information about the _requestor_

What is the requestor?
  - User, application, or both

What information does a token provide?
  - Claims (a rather generic thing)

Claims
  > An assertion that something is true [by a claim issuer]
  
  - Examples
    - unique and stable user identifier
    - name
    - email
    - address
    - role (e.g. student, teacher)
    - customer status
    - permissions

What more information does a token provide?
  - The token audience (who can use the claims in the token)
  - The token issuer (who is stating the claims)
  - The token usage applicability
  - The token lifetime

Introspecting the token
  - Obtaining the token information
    - I.e. the audience, the issuer, the claims, the validity
  - Reference tokens
    - Introspecting requires accessing an external service or data store
    - E.g. token points to an entry in a data store
      - E.g. primary key is the Hash(token) 
  - Assertion tokens (stateful tokens)
    - Cryptographically protected information container
      - Signed and optionally encrypted
      - To determine issuance and detect modification
    - Introspection does not require an external dependency

Revocation
  - Mark a token as not being valid
    - Because the token was stolen, or the proof information was stolen
    - Because the token signing key was stolen
  - Very important on tokens on long validity periods
  - Less important on tokens with shorter validity periods (e.g. seconds) 
  - How to do it
    - Mark the token as revoked

How is the token _attached_ to the message?
  - Bearer token - static token, simply added to the message (e.g. as an header)
    - E.g. cinema ticket, physical money, cookies
  - Proof-based token - token usage requires something else
    - E.g. boarding pass, credit card
  - Binding the token to a message
    - Ensuring the token cannot be used on a different message, without using that extra information
    - Ensuring the token cannot be used multiple times with the "same" message
      - ! Non-idempotent methods

DPoP
  - http://www.rfc-editor.org/internet-drafts/draft-ietf-oauth-dpop-01.html
  - token - static
  - proof token
    - dynamic 
      - generated for each request
        - depends on the request method and request target
      - generation requires knowledge of a signing key
      - extremely small validity period (e.g. seconds)
      - unique identifier
        - to detect replays

## Analogies from the "conventional" world

- Citizens card
  - Claims: citizenship, name, unique ids, address
  - Issuer: the Portuguese Republic
  - Proof of possession
    - face recognition
    - finger-print recognition
    - PIN

- Cinema ticket
  - Claims: entitlement to use a defined seat on given room during a given time interval
  - Issue: the cinema
  - Proof of possession
    - Bearer

- Boarding pass
  - Claims: entitlement to use a defined seat on a given flight
  - Issuer: the airplane company, a third-party issuer entity
  - Proof of possession
    - Firsname + last name ()
  
## 

