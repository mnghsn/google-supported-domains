const { domains } = require('./domains')

module.exports = {
  /**
   * Returns all Google supported domains as a string array.
   * @public
   * @returns {string[]}
   */
  all: function all () {
    return domains
  },

  /**
   * Tests if `domain` is a Google domain.
   * @public
   * @param {string} domain The domain to test.
   * @returns {boolean} Returns true if `domain` is a Google domain.
   */
  test: function test (domain) {
    const parts = domain.toLowerCase().split('.')

    while (parts.length) {
      if (parts.shift() === 'google') {
        return domains.indexOf(`.google.${parts.join('.')}`) >= 0
      }
    }

    return false
  }
}
