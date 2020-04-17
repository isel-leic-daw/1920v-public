# JSON Patch

From [https://tools.ietf.org/html/rfc6902]
> JSON Patch defines a JSON document structure for expressing a
   sequence of operations to apply to a JavaScript Object Notation
   (JSON) document; it is suitable for use with the HTTP PATCH method.
   The "application/json-patch+json" media type is used to identify such
   patch documents.

Example:
```
PATCH /my/data HTTP/1.1
Host: example.org
Content-Length: 326
Content-Type: application/json-patch+json
If-Match: "abc123"

[
  { "op": "test", "path": "/a/b/c", "value": "foo" },
  { "op": "remove", "path": "/a/b/c" },
  { "op": "add", "path": "/a/b/c", "value": [ "foo", "bar" ] },
  { "op": "replace", "path": "/a/b/c", "value": 42 },
  { "op": "move", "from": "/a/b/c", "path": "/a/b/d" },
  { "op": "copy", "from": "/a/b/d", "path": "/a/b/e" }
]
```

Operations:
- [`add`](https://tools.ietf.org/html/rfc6902#section-4.1)
- [`remove`](https://tools.ietf.org/html/rfc6902#section-4.2)
- [`replace`](https://tools.ietf.org/html/rfc6902#section-4.3)
- [`move`](https://tools.ietf.org/html/rfc6902#section-4.4)
- [`copy`](https://tools.ietf.org/html/rfc6902#section-4.5)
- [`test`](https://tools.ietf.org/html/rfc6902#section-4.6)

> The "test" operation tests that a value at the target location is
   equal to a specified value.

> Uses [JSON pointer](https://tools.ietf.org/html/rfc6901)

> Note that the HTTP PATCH method is atomic, as per [RFC5789].
   Therefore, the following patch would result in no changes being made
   to the document at all (because the "test" operation results in an
   error):
>   
>   [
     { "op": "replace", "path": "/a/b/c", "value": 42 },
     { "op": "test", "path": "/a/b/c", "value": "C" }
   ]

Did you noticed the: `If-Match: "abc123"`?
