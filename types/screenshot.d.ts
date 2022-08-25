/**
 * Take a screenshot
 *
 * screenshots are saved by date of run using `<dirname>/<date>/<basename>`
 * e.g. `/tmp/test.jpg` will be stored under `/tmp/<date>/test.jpg`
 * Creates missing directories
 *
 * env-vars:
 * - `SCREENSHOT_DIR=<path>` choose a different location for screenshots than the current working directory
 *
 * @param {Page} page
 * @param {string} filename
 * @param {ScreenshotOptions} options
 * @returns {Promise<string|Buffer>}
 */
export function screenshot(page: Page, filename: string, options?: ScreenshotOptions): Promise<string | Buffer>;
export type Page = import('puppeteer').Page;
export type ScreenshotOptions = import('puppeteer').ScreenshotOptions;
