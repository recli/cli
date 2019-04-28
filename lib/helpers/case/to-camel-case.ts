import {toSpaceCase} from "./to-space-case";

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toCamelCase('space case')  // "spaceCase"
 * toCamelCase('snake_case')  // "snakeCase"
 * toCamelCase('dot.case')    // "dotCase"
 * toCamelCase('weird[case')  // "weirdCase"
 */

export function toCamelCase(string: string) {
  return toSpaceCase(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}