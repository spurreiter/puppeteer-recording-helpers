/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/**
 * @param {ElementHandle} element
 * @param {string} input
 * @param {number} [timeout=5000] in ms
 */
export function input(element: ElementHandle, input: string, timeout?: number | undefined): Promise<void>;
export type ElementHandle = import('puppeteer').ElementHandle;
