/** @typedef {import('puppeteer').Page} Page */
/** @typedef {import('puppeteer').HTTPResponse} HTTPResponse */
/** @typedef {import('puppeteer').WaitForOptions} WaitForOptions */
/**
 * Navigates to an Url
 * @param {Page} page
 * @param {string} url
 * @param {import('puppeteer').WaitForOptions} [options]
 * @returns {Promise<HTTPResponse|null>}
 */
export function navigate(page: Page, url: string, options?: import("puppeteer").WaitForOptions | undefined): Promise<HTTPResponse | null>;
export type Page = import('puppeteer').Page;
export type HTTPResponse = import('puppeteer').HTTPResponse;
export type WaitForOptions = import('puppeteer').WaitForOptions;
