/**
 * This is a function that sorts an array of objects by a specified key in ascending or descending order.
 *
 * @template T - The type of data to be sorted.
 * @param {T} data - The data to be sorted.
 * @param {keyof T} key - The key to sort the data by.
 * @param {boolean} asc - A flag indicating whether to sort the data in ascending (true) or descending (false) order.
 * @returns {T} - The sorted data.
 */
export const sort = <T extends unknown[]>(
  data: T,
  key: keyof T,
  asc: boolean
): T => {
  const sorted = data.sort((a, b) =>
    (a[key] as string).localeCompare(b[key] as string)
  )

  return asc ? sorted : (sorted.reverse() as T)
}
