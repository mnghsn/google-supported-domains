import { domains } from "./domains.js";

/**
 * Returns all Google supported domains.
 * @public
 * @returns {string[]} Returns all domains as a string array.
 */
function all() {
  return domains;
}

/**
 * Tests if `domain` is a Google domain.
 * @public
 * @param {string} domain The domain to test.
 * @returns {boolean} Returns true if `domain` is a Google domain.
 */
function test(domain) {
  const parts = domain.toLowerCase().split(".");

  while (parts.length) {
    if (parts.shift() === "google") {
      return domains.indexOf(`.google.${parts.join(".")}`) >= 0;
    }
  }

  return false;
}

export default { all, test };
