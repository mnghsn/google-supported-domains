const googleSupportedDomains = require('../')

describe('validate domains', () => {
  test('all google domains', () => {
    const domains = googleSupportedDomains.all()
    const pattern = /^\.google\.[a-z.]+$/

    for (const domain of domains) {
      expect(pattern.test(domain)).toBeTruthy()
    }
  })
})

describe('test domains', () => {
  test('main domain', () => {
    const expected = {
      'google.com': true,
      'google.co.jp': true,
      'example.com': false,
      'example.net': false
    }

    for (const domain in expected) {
      expect(googleSupportedDomains.test(domain)).toEqual(expected[domain])
    }
  })

  test('subdomains', () => {
    const expected = {
      'mail.google.com': true,
      'drive.google.com': true,
      'foo.example.com': false,
      'bar.example.com': false
    }

    for (const domain in expected) {
      expect(googleSupportedDomains.test(domain)).toEqual(expected[domain])
    }
  })
})
