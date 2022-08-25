import assert from 'assert'
import fsp from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { openBrowser, navigate, findElements, handleElements, findText } from '../src/index.js'

const indexHtml = `<!doctype html>
<html>
<body>
  <h1>headline</h1>
  <ul id="nav">
    <li><a href="#first">first</a></li>
    <li class="list"><a href="#second">second</a></li>
    <li class="list" id="last"><a href="#third">third</a></li>
  </ul>
  <ul>
    <li>foo</li>
    <li>bar</li>
  </ul>
</body>
</html>
`

describe('handleElements', function () {
  const fileUri = `${dirname(import.meta.url)}/assets/index.html`

  before(async function () {
    await fsp.writeFile(fileURLToPath(fileUri), indexHtml, 'utf8')
  })

  it('shall find by xpath and handle elements', async function () {
    const { browser, page } = await openBrowser()
    await navigate(page, fileUri)
    const elements = await findElements(page, '//ul[@id="nav"]/li')
    assert.strictEqual(elements.length, 3)
    const result = await handleElements(elements)
    assert.deepStrictEqual(result, [
      {
        attributes: {},
        innerText: 'first',
        textContent: 'first',
        innerHTML: '<a href="#first">first</a>',
        outerHTML: '<li><a href="#first">first</a></li>'
      },
      {
        attributes: { class: 'list' },
        innerText: 'second',
        textContent: 'second',
        innerHTML: '<a href="#second">second</a>',
        outerHTML: '<li class="list"><a href="#second">second</a></li>'
      },
      {
        attributes: { class: 'list', id: 'last' },
        innerText: 'third',
        textContent: 'third',
        innerHTML: '<a href="#third">third</a>',
        outerHTML: '<li class="list" id="last"><a href="#third">third</a></li>'
      }
    ])
    browser.close()
  })

  it('shall find by css selector', async function () {
    const { browser, page } = await openBrowser()
    await navigate(page, fileUri)
    const elements = await findElements(page, '#nav > li')
    assert.strictEqual(elements.length, 3)
    const result = await handleElements(elements)
    assert.deepStrictEqual(result, [
      {
        attributes: {},
        innerText: 'first',
        textContent: 'first',
        innerHTML: '<a href="#first">first</a>',
        outerHTML: '<li><a href="#first">first</a></li>'
      },
      {
        attributes: { class: 'list' },
        innerText: 'second',
        textContent: 'second',
        innerHTML: '<a href="#second">second</a>',
        outerHTML: '<li class="list"><a href="#second">second</a></li>'
      },
      {
        attributes: { class: 'list', id: 'last' },
        innerText: 'third',
        textContent: 'third',
        innerHTML: '<a href="#third">third</a>',
        outerHTML: '<li class="list" id="last"><a href="#third">third</a></li>'
      }
    ])
    browser.close()
  })

  it('shall find text', async function () {
    const { browser, page } = await openBrowser()
    await navigate(page, fileUri)
    const elements = await findText(page, 'second')
    assert.strictEqual(elements.length, 1)
    const result = await handleElements(elements)
    assert.deepStrictEqual(result, [
      {
        attributes: { href: '#second' },
        textContent: 'second',
        innerText: 'second',
        innerHTML: 'second',
        outerHTML: '<a href="#second">second</a>'
      }
    ])
    browser.close()
  })
})
