import { toSpaceCase } from './to-space-case';
/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toSlugCase('camelCase')   // "camel-case"
 * toSlugCase('space case')  // "space-case"
 * toSlugCase('dot.case')    // "dot-case"
 * toSlugCase('weird[case')  // "weird-case"
 */

export function toSlugCase(string: string) {
  return toSpaceCase(string).replace(/\s/g, '-');
}
