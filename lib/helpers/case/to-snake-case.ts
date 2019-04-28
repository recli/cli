
import { toSpaceCase } from './to-space-case';

/**
 * Convert a `string` to snake case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toSnakeCase('camelCase')   // "camel_case"
 * toSnakeCase('space case')  // "space_case"
 * toSnakeCase('dot.case')    // "dot_case"
 * toSnakeCase('weird[case')  // "weird_case"
 */

export function toSnakeCase(string: string) {
  return toSpaceCase(string).replace(/\s/g, '_');
}