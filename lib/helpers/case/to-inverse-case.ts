/**
 * Invert each character in a `string` from upper to lower and vice versa.
 *
 * @param {String} string
 * @return {String}
 * @example
 * toInverseCase('camelCase')   // "CAMELcASE"
 */

export function toInverseCase (string: string) {
  var chars = string.split('')
  for (var i = 0, char; char = chars[i]; i++) {
    if (!/[a-z]/i.test(char)) continue
    var upper = char.toUpperCase()
    var lower = char.toLowerCase()
    chars[i] = char == upper ? lower : upper
  }

  return chars.join('')
}