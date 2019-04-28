
import { toSpaceCase } from './to-space-case';

/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toDotCase('camelCase')   // "camel.case"
 * toDotCase('space case')  // "snake.case"
 * toDotCase('slug-case')   // "slug.case"
 * toDotCase('weird[case')  // "weird.case"
 */

export function toDotCase(string: string) {
  return toSpaceCase(string).replace(/\s/g, '.')
}