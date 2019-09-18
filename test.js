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
  ;['google.com', 'google.co.jp'].forEach(domain => {
    t.equal(googleSupportedDomains.test(domain), true, `yes: ${domain}`)
  })
  ;['example.com', 'example.net'].forEach(domain => {
    t.equal(googleSupportedDomains.test(domain), false, `no: ${domain}`)
  })

  t.end()
})

test('test subdomains', function (t) {
  ;['mail.google.com', 'drive.google.com'].forEach(domain => {
    t.equal(googleSupportedDomains.test(domain), true, `yes: ${domain}`)
  })
  ;['foo.example.com', 'bar.example.net'].forEach(domain => {
    t.equal(googleSupportedDomains.test(domain), false, `no: ${domain}`)
  })

  t.end()
})
