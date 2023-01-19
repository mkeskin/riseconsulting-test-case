/**
 * Generates a random string using the current date and time and a random number.
 * @returns {string} A random string in base 36.
 */
export const random = (): string =>
  Math.round(
    +(new Date().getTime() + '' + Math.round(Math.random() * Math.pow(10, 6)))
  ).toString(36)
