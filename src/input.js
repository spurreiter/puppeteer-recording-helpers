import { scrollIntoViewIfNeeded } from './puppeteerHelpers.js'

/** @typedef {import('puppeteer').ElementHandle} ElementHandle */

/**
 * @param {ElementHandle} element
 * @param {string} input
 * @param {number} [timeout=5000] in ms
 */
export async function input (element, input, timeout = 5000) {
  await scrollIntoViewIfNeeded(element, timeout)
  // @ts-expect-error
  const type = await element.evaluate(el => el.type)
  if (['select-one'].includes(type)) {
    await element.select(input)
  } else if (['textarea', 'text', 'url', 'tel', 'search', 'password', 'number', 'email'].includes(type)) {
    await element.type(input)
  } else {
    await element.focus()
    await element.evaluate((el, value) => {
      // @ts-expect-error
      el.value = value
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }, input)
  }
}
