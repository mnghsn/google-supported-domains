# google-supported-domains

[![npm](https://img.shields.io/npm/v/google-supported-domains)](https://www.npmjs.com/package/google-supported-domains)

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
