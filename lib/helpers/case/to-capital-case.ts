
import { toSpaceCase } from './to-space-case';

/**
 * Convert a `string` to capital case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toCapitalCase('camelCase')        // "Camel Case"
 * toCapitalCase('space case')       // "Space Case"
 * toCapitalCase('snake_case')       // "Snake Case"
 * toCapitalCase('dot.case')         // "Dot Case"
 * toCapitalCase('some*weird[case')  // "Some Weird Case"
 */

export function toCapitalCase(string: string) {
  return toSpaceCase(string).replace(/(^|\s)(\w)/g, function (matches, previous, letter) {
    return previous + letter.toUpperCase()
  })
}