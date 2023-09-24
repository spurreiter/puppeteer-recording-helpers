/**
 * @credits from puppeteer scripts exported after recordings
 */
/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('puppeteer').Page} Page */
/** @typedef {import('puppeteer').WaitForSelectorOptions} WaitForSelectorOptions */
/**
 * @param {string[]|string} selector
 * @param {Page} page
 * @returns {Promise<ElementHandle[]>}
 */
export function querySelectorAll(selector: string[] | string, page: Page): Promise<ElementHandle[]>;
/**
 * @param {string[][]|string[]} selectors
 * @param {Page} page
 * @returns {Promise<ElementHandle[]>}
 */
export function querySelectorsAll(selectors: string[][] | string[], page: Page): Promise<ElementHandle[]>;
/**
 * @param {ElementHandle} element
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export function scrollIntoViewIfNeeded(element: ElementHandle, timeout?: number | undefined): Promise<void>;
/**
 * @param {ElementHandle} element
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export function waitForConnected(element: ElementHandle, timeout?: number | undefined): Promise<void>;
/**
 * @typedef {object} Step
 * @property {string[][]|string[]} selectors
 * @property {'>='|'=='|'<='} [operator='>=']
 * @property {number} [count=1]
 */
/**
 * @param {Step} step
 * @param {Page} frame
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export function waitForElement(step: Step, frame: Page, timeout?: number | undefined): Promise<void>;
/**
 * @param {Function} fn
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export function waitForFunction(fn: Function, timeout?: number | undefined): Promise<void>;
/**
 * @param {ElementHandle} element
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export function waitForInViewport(element: ElementHandle, timeout?: number | undefined): Promise<void>;
/**
 * @param {string[]|string} selector
 * @param {Page} page
 * @param {WaitForSelectorOptions} [options]
 */
export function waitForSelector(selector: string[] | string, page: Page, options?: import("puppeteer").WaitForSelectorOptions | undefined): Promise<import("puppeteer").ElementHandle<Node>>;
/**
 * @param {string[][]|string[]} selectors
 * @param {Page} page
 * @param {WaitForSelectorOptions} [options]
 */
export function waitForSelectors(selectors: string[][] | string[], page: Page, options?: import("puppeteer").WaitForSelectorOptions | undefined): Promise<import("puppeteer").ElementHandle<Node>>;
export type ElementHandle = import('puppeteer').ElementHandle;
export type Page = import('puppeteer').Page;
export type WaitForSelectorOptions = import('puppeteer').WaitForSelectorOptions;
export type Step = {
    selectors: string[][] | string[];
    operator?: ">=" | "==" | "<=" | undefined;
    count?: number | undefined;
};
