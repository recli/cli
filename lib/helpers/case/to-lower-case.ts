import { toNoCase } from './to-no-case';

/**
 * Convert a `string` to lower case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toLowerCase('camelCase')   // "camel case"
 */

export function toLowerCase (string: string) {
  return toNoCase(string).toLowerCase()
}