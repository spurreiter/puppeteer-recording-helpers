/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('./types').HandleElementResult} HandleElementResult */

/**
 * Convert ElementHandle to element attributes
 * @param {ElementHandle[]|ElementHandle} elements
 * @param {'attributes'|'textContent'|'innerText'|'innerHTML'|'outerHTML'} [property] map output to this property
 * @returns {Promise<HandleElementResult[]|string[]|object[]>}
 */
export async function handleElements (elements, property) {
  if (!Array.isArray(elements)) {
    elements = [elements]
  }
  const conv = elements.map(element => element.evaluate(el => {
    const attributes = Array.from(el.attributes).reduce(
      (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
      {}
    )
    return {
      attributes,
      textContent: el.textContent,
      // @ts-expect-error
      innerText: el.innerText,
      innerHTML: el.innerHTML,
      outerHTML: el.outerHTML
    }
  }))

  const results = await Promise.all(conv)
  if (!property) {
    return results
  }
  return results.map(result => result[property])
}
