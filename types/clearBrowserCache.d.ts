/** @typedef {import('puppeteer').Page} Page */
/**
 * Clears browser cache, cookies and/or localStorage, sessionStorage
 * @param {Page} page
 * @param {{cache?: boolean, cookies?: boolean, localStorage?: boolean, sessionStorage?: boolean}} options
 * @return {Promise<void>}
 */
export function clearBrowserCache(page: Page, options?: {
    cache?: boolean;
    cookies?: boolean;
    localStorage?: boolean;
    sessionStorage?: boolean;
}): Promise<void>;
export type Page = import('puppeteer').Page;
