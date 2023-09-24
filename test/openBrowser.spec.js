import assert from 'assert'
import { openBrowser } from '../src/index.js'

describe('openBrowser', function () {
  it('starts headless by default', async function () {
    const { browser } = await openBrowser()
    // console.log(browser.process().spawnargs)
    assert.ok(browser.process().spawnargs.includes('--headless=new'))
    browser.close()
  })

  it('opens a tab by default', async function () {
    const { browser } = await openBrowser()
    const pages = await browser.pages()
    assert.strictEqual(pages.length, 1)
    browser.close()
  })

  it('starts headfully', async function () {
    const { browser } = await openBrowser({ headless: false })
    // console.log(browser.process().spawnargs)
    assert.ok(!browser.process().spawnargs.includes('--headless'))
    browser.close()
  })
})
