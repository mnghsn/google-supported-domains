const appRoot = require('app-root-path')
const standard = require('standard')
const test = require('tape')

const googleSupportedDomains = appRoot.require('./')

test('lint source codes', function (t) {
  const files = appRoot.resolve('*.js')
  const options = {}
  const callback = function (error, { results }) {
    t.error(error)

    for (const { filePath, messages } of results) {
      messages.length === 0
        ? t.pass(filePath)
        : t.fail(filePath)

      for (const { line, column, message } of messages) {
        t.comment(`${filePath}:${line}:${column}: ${message}`)
      }
    }

    t.end()
  }

  standard.lintFiles(files, options, callback)
})

test('validate all google domains', function (t) {
  const domains = googleSupportedDomains.all()
  const pattern = /^\.google\.[a-z.]+$/
  const invalid = domains.filter(domain => !pattern.test(domain))

  invalid.length === 0
    ? t.pass(`${domains.length} domains`)
    : t.fail(`${invalid.length} domains`)

  for (const domain of invalid) {
    t.comment(`invalid domain: ${domain}`)
  }

  t.end()
})

test('test main domain', function (t) {
  const expected = {
    'google.com': true,
    'google.co.jp': true,
    'example.com': false,
    'example.net': false
  }

  for (const domain in expected) {
    t.equal(
      googleSupportedDomains.test(domain),
      expected[domain],
      expected[domain] ? `yes: ${domain}` : `no: ${domain}`
    )
  }

  t.end()
})

test('test subdomains', function (t) {
  const expected = {
    'mail.google.com': true,
    'drive.google.com': true,
    'foo.example.com': false,
    'bar.example.com': false
  }

  for (const domain in expected) {
    t.equal(
      googleSupportedDomains.test(domain),
      expected[domain],
      expected[domain] ? `yes: ${domain}` : `no: ${domain}`
    )
  }

  t.end()
})
