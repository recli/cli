import { toSpaceCase } from './to-space-case';

/**
 * Convert a `string` to pascal case.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toPascalCase('space case')  // "SpaceCase"
 * toPascalCase('snake_case')  // "SnakeCase"
 * toPascalCase('dot.case')    // "DotCase"
 * toPascalCase('weird[case')  // "WeirdCase"
 */

export function toPascalCase(string: string) {
  return toSpaceCase(string).replace(/(?:^|\s)(\w)/g, function (matches: string, letter: string) {
    return letter.toUpperCase()
  })
}