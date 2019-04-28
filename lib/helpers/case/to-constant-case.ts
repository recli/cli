import {toSnakeCase} from './to-snake-case';

/**
 * Convert a `string` to constant case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toConstantCase('camelCase')   // "CAMEL_CASE"
 * toConstantCase('snake_case')  // "SNAKE_CASE"
 * toConstantCase('dot.case')    // "DOT_CASE"
 * toConstantCase('weird[case')  // "WEIRD_CASE"
 */

export function toConstantCase(string: string) {
  return toSnakeCase(string).toUpperCase()
}