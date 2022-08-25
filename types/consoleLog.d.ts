/** @typedef {import('puppeteer').Page} Page */
/**
 * Collect and/or display browser console log statements and errors
 * @param {Page} page
 * @param {object} [options]
 * @param {boolean} [options.silent=false] if silent=true do not show messages on stdout or stderr
 * @returns {{consoleMessages: string[], errorMessages: Error[]}}
 */
export function consoleLog(page: Page, options?: {
    silent?: boolean | undefined;
} | undefined): {
    consoleMessages: string[];
    errorMessages: Error[];
};
export type Page = import('puppeteer').Page;
