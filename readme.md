# hunk

[![Build Status](https://secure.travis-ci.org/shannonmoeller/hunk.png?branch=master)](http://travis-ci.org/shannonmoeller/hunk)

Multipart files, one hunk at a time.

## Getting Started

Install the module with: `npm install hunk`

## Documentation

### `hunk( String ) : Array|Object`

Accepts a string representing multiple documents, delimited by triple hypens (`---`), just like YAML. Delimiters may be named by appending any text you want after the hypens (`---foo`), unlike YAML.

## Examples

### Usage

```javascript
var fs = require('fs');
var hunk = require('hunk');

fs.readFile('foo.hnk', 'utf8', function (err, data) {
    console.log(hunk(data));
});
```

### Array

#### Input (`foo.hnk`):

```
---
hello world
---
foo
---
bar
---
```

#### Output:

```javascript
['hello world', 'foo', 'bar']
```


### Object

#### Input (`foo.hnk`):

```
---hello
world
---foo
bar
---
baz
---
```

#### Output:

```javascript
{
    hello: 'world',
    foo: 'bar',
    2: 'baz'
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 1.0.5: Better handling of whitespace.

----

MIT © [Shannon Moeller](http://shannonmoeller.com)
