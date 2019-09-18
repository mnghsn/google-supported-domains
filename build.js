const fs = require('fs')
const appRoot = require('app-root-path')
const fetch = require('node-fetch')
const standard = require('standard')

const GOOGLE_SUPPORTED_DOMAINS_URL = 'https://www.google.com/supported_domains'
const OUTPUT_PATH = appRoot.resolve('./domains.js')

fetch(GOOGLE_SUPPORTED_DOMAINS_URL)
  .then(response => response.text())
  .then(body => {
    const domains = body.trim().split('\n').sort()
    const json = JSON.stringify(domains, null, 2)
    const js = `module.exports = { domains: ${json} }`

    const { results } = standard.lintTextSync(js, { fix: true })
    const { output } = results[0]

    fs.writeFileSync(OUTPUT_PATH, output, 'utf8')
  })
