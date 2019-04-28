import { toNoCase } from './to-no-case';

/**
 * Convert a `string` to upper case from camel, slug, etc. Different that the
 * usual `toUpperCase` in that it will try to break apart the input first.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toUpperCase('camelCase')   // "CAMEL CASE"
 */

export function toUpperCase (string: string) {
  return toNoCase(string).toUpperCase()
}