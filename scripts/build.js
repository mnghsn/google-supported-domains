const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const prettier = require('prettier')

const GOOGLE_SUPPORTED_DOMAINS_URL = 'https://www.google.com/supported_domains'
const OUTPUT_PATH = path.resolve(__dirname, '../src/domains.js')

fetch(GOOGLE_SUPPORTED_DOMAINS_URL)
  .then(response => response.text())
  .then(body => {
    const domains = body.trim().split('\n').sort()
    const json = JSON.stringify(domains, null, 2)
    const js = `module.exports = { domains: ${json} }`

    const config = prettier.resolveConfig.sync(__filename)
    const output = prettier.format(js, config)

    fs.writeFileSync(OUTPUT_PATH, output, 'utf8')
  })
