/**
 * Wait for timeout in milliseconds.
 * Useful for debugging recordings while playback of scripts in headfull mode.
 * @param {number} timeout in ms
 * @returns {Promise<void>}
 */
export function waitFor(timeout?: number): Promise<void>;
