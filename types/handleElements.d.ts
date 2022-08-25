/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('./types').HandleElementResult} HandleElementResult */
/**
 * Convert ElementHandle to element attributes
 * @param {ElementHandle[]|ElementHandle} elements
 * @param {'attributes'|'textContent'|'innerText'|'innerHTML'|'outerHTML'} [property] map output to this property
 * @returns {Promise<HandleElementResult[]|string[]|object[]>}
 */
export function handleElements(elements: ElementHandle[] | ElementHandle, property?: "innerText" | "attributes" | "outerHTML" | "textContent" | "innerHTML" | undefined): Promise<HandleElementResult[] | string[] | object[]>;
export type ElementHandle = import('puppeteer').ElementHandle;
export type HandleElementResult = import('./types').HandleElementResult;
