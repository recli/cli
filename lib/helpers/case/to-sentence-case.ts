import { toNoCase } from './to-no-case';

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toSentenceCase('the catcher, in the rye.')
 * // "The catcher, in the rye."
 */

export function toSentenceCase(string: string) {
  return toNoCase(string).replace(/[a-z]/i, function (letter: string) {
    return letter.toUpperCase()
  }).trim()
}