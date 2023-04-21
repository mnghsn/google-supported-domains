import t from 'tap'
import { domains } from '../src/domains.js'

t.test('all()', async t => {
  for (const domain of domains) {
    t.equal(/^\.google\.[a-z.]+$/.test(domain), true)
  }
})
