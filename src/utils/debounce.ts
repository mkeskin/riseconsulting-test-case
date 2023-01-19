/**
 * Creates a debounced function that delays the execution of `callback` until
 * after `delay` milliseconds have elapsed since the last time the debounced
 * function was called.
 *
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @return {Function} A debounced version of `callback`
 */
const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<T>) => {
    // If the timer is not null, clear it
    if (timer !== null) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      // When the timer expires, call the function with the saved arguments
      callback(...args)
      timer = null
    }, delay)
  }

  return debounced
}

export default debounce
