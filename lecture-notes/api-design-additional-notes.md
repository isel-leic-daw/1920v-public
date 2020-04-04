# API design: additional notes

## Representation oriented-design

- Start by designing the sequence of representations that should be exchanged.
  - What representations does the client application need to retrieve.
  - Which _controls_ (e.g. links and actions) does the client activate to obtain those representations.
  - Which representations does the client application send to the server.
- The resource space design, including the URI space design, is a consequence of the representation design.


- Similar to how an user interface (UI) could be sketched, but using representations instead of screens.
Hypermedia controls play the role of UI controls.
  - This is exactly what happens on HTML, where the hypermedia controls are the UI controls.

- Adequate when the API is exposing a user experience and not just data.

- Sometimes this design is driven by the UI design itself.
  - API designer uses the UI screens and flows to determine what representations are needed.
    - Taking into consideration possible future evolutions.
  - The resources are created to support the representations
    - Same for the URI space


## Documentation

- Don't emphasize the documentation of what is already documented.
  - HTTP standard methods.
  - HTTP standard headers.
  - HTTP standard status codes.

- Don't forget that HTTP provides an **uniform interface**

- Separate between "non-normative examples" and normative (i.e. contractual) documentation.

- So, what needs to be documented?

- When using problem+json
  - The `type` URIs
  - The per `type` extra fields and their semantics

- When using Siren
  - The classes
  - The properties
  - The link relations
  - The actions, including
    - action name,
    - action input fields

- Try to use an uniform vocabulary across the API
  - Same concepts should use the same name

## Example
- Classes
  - project, issue, comment, user

- Project
  - id
  - uri
  - name
  - description

- Issue
  - id
  - uri
  - name
  - description

- IssueComment
  - id
  - uri
  - text

- Link relations
  - standard
    - next, prev, first, last
    - author
    - collection 
    - search
  - non-standard
    - project


    - https://isel.pt/daw/rels/project
    - https://isel.pt/daw/rels/issue
    - https://isel.pt/daw/rels/issues
    - https://isel.pt/daw/rels/comments

- Common properties
  - id - contextually unique and stable identifer, can be placed in an URL without encoding.
  - uri - globally unique and stable identifer.
    - We can use rel=self for this
  - name - non-unique and non-stable identifier. Does not exceed a single line and 120 characters
  - description - non-unique and non-stable identifier. May have multiple lines. Uses markdown
  - text - the textual representation of something
  - dateCreated - https://schema.org/dateCreated
  - dateModified - https://schema.org/dateModified
  - endDate - https://schema.org/endDate



