# google-supported-domains

[![Build Status](https://travis-ci.org/jmlntw/google-supported-domains.svg?branch=master)](https://travis-ci.org/jmlntw/google-supported-domains)

> :construction:
> This repository is under development.
> Do not use in production.

**google-supported-domains** is a Node (JavaScript) module exports all Google supported domains (`.google.*`), and provides an API to test if any domain is a Google domain.

## Installation

```bash
$ npm install google-supported-domains
```

## Usage

```js
const domains = require('google-supported-domains')

// Get all Google supported domains as a string array.
domains.all()
// => ['.google.ad', '.google.ae', '.google.al', ...]

// Test if any domain is a Google domain.
domains.test('www.google.com')    // => true
domains.test('www.google.co.jp')  // => true
domains.test('mail.google.com')   // => true
domains.test('www.example.com')   // => false
domains.test('foo.example.net')   // => false
```

## Acknowledgements

* <https://github.com/vweevers/is-google-domain>
* <https://www.google.com/supported_domains>

## License

Licensed under the [MIT License](LICENSE.md).
