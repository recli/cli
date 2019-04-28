
import { toNoCase } from './to-no-case';

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toSpaceCase('camelCase')             // "camel case"
 * toSpaceCase('snake_case')            // "snake case"
 * toSpaceCase('dot.case')              // "dot case"
 * toSpaceCase('-RAnDom -jUNk$__loL!')  // "random junk lol"
 */

export function toSpaceCase(string: string) {
  return toNoCase(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}