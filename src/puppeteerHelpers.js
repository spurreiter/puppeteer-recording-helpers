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
export async function querySelectorAll (selector, page) {
  if (!Array.isArray(selector)) {
    selector = [selector]
  }
  if (!selector.length) {
    throw new Error('Empty selector provided to querySelectorAll')
  }
  let elements = []
  for (let i = 0; i < selector.length; i++) {
    const part = selector[i]
    if (i === 0) {
      elements = await page.$$(part)
    } else {
      const tmpElements = elements
      elements = []
      for (const el of tmpElements) {
        elements.push(...(await el.$$(part)))
      }
    }
    if (elements.length === 0) {
      return []
    }
    if (i < selector.length - 1) {
      const tmpElements = []
      for (const el of elements) {
        const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement()
        if (newEl) {
          tmpElements.push(newEl)
        }
      }
      elements = tmpElements
    }
  }
  return elements
}

/**
 * @param {string[][]|string[]} selectors
 * @param {Page} page
 * @returns {Promise<ElementHandle[]>}
 */
export async function querySelectorsAll (selectors, page) {
  for (const selector of selectors) {
    const result = await querySelectorAll(selector, page)
    if (result.length) {
      return result
    }
  }
  return []
}

/**
 * @param {ElementHandle} element
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export async function scrollIntoViewIfNeeded (element, timeout = 5000) {
  await waitForConnected(element, timeout)
  const isInViewport = await element.isIntersectingViewport({ threshold: 0 })
  if (isInViewport) {
    return
  }
  await element.evaluate(element => {
    element.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'auto'
    })
  })
  await waitForInViewport(element, timeout)
}

/**
 * @param {ElementHandle} element
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export async function waitForConnected (element, timeout = 5000) {
  await waitForFunction(async () => {
    return await element.getProperty('isConnected')
  }, timeout)
}

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
export async function waitForElement (step, frame, timeout = 5000) {
  const count = step.count || 1
  const operator = step.operator || '>='
  const comp = {
    '==': (a, b) => a === b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b
  }
  const compFn = comp[operator]
  await waitForFunction(async () => {
    const elements = await querySelectorsAll(step.selectors, frame)
    return compFn(elements.length, count)
  }, timeout)
}

/**
 * @param {Function} fn
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export async function waitForFunction (fn, timeout = 5000) {
  let isActive = true
  setTimeout(() => {
    isActive = false
  }, timeout)
  // eslint-disable-next-line no-unmodified-loop-condition
  while (isActive) {
    const result = await fn()
    if (result) {
      return
    }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error('Timed out')
}

/**
 * @param {ElementHandle} element
 * @param {number} [timeout=5000] (in ms)
 * @returns {Promise<void>}
 */
export async function waitForInViewport (element, timeout = 5000) {
  await waitForFunction(async () => {
    return await element.isIntersectingViewport({ threshold: 0 })
  }, timeout)
}

/**
 * @param {string[]|string} selector
 * @param {Page} page
 * @param {WaitForSelectorOptions} [options]
 */
export async function waitForSelector (selector, page, options) {
  if (!Array.isArray(selector)) {
    selector = [selector]
  }
  if (!selector.length) {
    throw new Error('Empty selector provided to waitForSelector')
  }
  let element = null
  for (let i = 0; i < selector.length; i++) {
    const part = selector[i]
    if (element) {
      element = await element.waitForSelector(part, options)
    } else {
      element = await page.waitForSelector(part, options)
    }
    if (!element) {
      throw new Error('Could not find element: ' + selector.join('>>'))
    }
    if (i < selector.length - 1) {
      element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement()
    }
  }
  if (!element) {
    throw new Error('Could not find element: ' + selector.join('|'))
  }
  return element
}

/**
 * @param {string[][]|string[]} selectors
 * @param {Page} page
 * @param {WaitForSelectorOptions} [options]
 */
export async function waitForSelectors (selectors, page, options) {
  for (const selector of selectors) {
    try {
      return await waitForSelector(selector, page, options)
    } catch (err) {
      console.error(err)
    }
  }
  throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors))
}
