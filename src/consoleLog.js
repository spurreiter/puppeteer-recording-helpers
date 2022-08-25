/** @typedef {import('puppeteer').Page} Page */

/**
 * Collect and/or display browser console log statements and errors
 * @param {Page} page
 * @param {object} [options]
 * @param {boolean} [options.silent=false] if silent=true do not show messages on stdout or stderr
 * @returns {{consoleMessages: string[], errorMessages: Error[]}}
 */
export function consoleLog (page, options = {}) {
  const opts = {
    silent: false,
    ...options
  }

  const consoleMessages = []
  const errorMessages = []

  page.on('console', async (msg) => {
    const args = msg.args()
    const vals = []
    for (let i = 0; i < args.length; i++) {
      vals.push(await args[i].jsonValue())
    }
    const message = vals.map(v => typeof v === 'object' ? JSON.stringify(v, null, 2) : v).join('\t')
    consoleMessages.push(message)
    if (!opts.silent) {
      console.log(message)
    }
  })

  page.on('pageerror', (err) => {
    errorMessages.push(err)
    if (!opts.silent) {
      console.error(err)
    }
  })

  return {
    consoleMessages,
    errorMessages
  }
}
