/**
 * Wait for timeout in milliseconds.
 * Useful for debugging recordings while playback of scripts in headfull mode.
 * @param {number} timeout in ms
 * @returns {Promise<void>}
 */
export function waitFor (timeout = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
