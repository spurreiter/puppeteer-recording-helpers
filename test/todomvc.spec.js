import assert from 'assert'

import {
  // waitFor,
  input,
  clearBrowserCache,
  findElements,
  findText,
  scrollIntoViewIfNeeded,
  waitForSelectors,
  consoleLog,
  handleElements,
  openBrowser,
  screenshot
} from '../src/index.js'

async function testTodoMvc () {
  const { browser, page, timeout } = await openBrowser()
  const messages = consoleLog(page, { silent: true })

  try {
    // >>>snip>>> from Chrome Devtool Recording and then modified
    {
      const targetPage = page
      await targetPage.setViewport({ width: 800, height: 600 })
    }
    {
      const targetPage = page
      const promises = []
      promises.push(targetPage.waitForNavigation())
      await targetPage.goto('https://todomvc.com/examples/react/#/')
      await Promise.all(promises)
    }
    {
      const targetPage = page
      await clearBrowserCache(targetPage)
      const element = await waitForSelectors([['aria/What needs to be done?'], ['body > section > div > header > input']], targetPage, { timeout, visible: true })
      await scrollIntoViewIfNeeded(element, timeout)
      await element.click()
    }
    {
      const targetPage = page
      const element = await waitForSelectors([['aria/What needs to be done?'], ['body > section > div > header > input']], targetPage, { timeout, visible: true })
      await input(element, 'first', timeout)
      await targetPage.keyboard.down('Enter')
      await targetPage.keyboard.up('Enter')

      const els = await findText(targetPage, 'first', '//div/label')
      const result = await handleElements(els, 'textContent')
      assert.deepStrictEqual(result, ['first'])
    }
    {
      const targetPage = page
      const element = await waitForSelectors([['aria/What needs to be done?'], ['body > section > div > header > input']], targetPage, { timeout, visible: true })
      await input(element, 'second', timeout)
      await targetPage.keyboard.down('Enter')
      await targetPage.keyboard.up('Enter')

      const els = await findElements(targetPage, '//div/label')
      const result = await handleElements(els, 'textContent')
      assert.deepStrictEqual(result, ['first', 'second'])
    }
    {
      const targetPage = page
      const element = await waitForSelectors([['body > section > div > section > ul > li:nth-child(1) > div > input']], targetPage, { timeout, visible: true })
      await scrollIntoViewIfNeeded(element, timeout)
      await element.click()
    }
    {
      const targetPage = page
      const element = await waitForSelectors([['aria/Clear completed'], ['body > section > div > footer > button']], targetPage, { timeout, visible: true })
      await scrollIntoViewIfNeeded(element, timeout)
      await element.click()

      const els = await findElements(targetPage, '//div/label')
      const result = await handleElements(els, 'textContent')
      assert.deepStrictEqual(result, ['second'])
    }

    await screenshot(page, './test/assets/todomvc.jpg')
  } catch (err) {
    await screenshot(page, './test/assets/todomvc-error.jpg')
    throw err
  }

  await browser.close()
  // <<<snip<<<

  console.log(messages)
}

describe('todomvc', function () {
  this.timeout(10e3)
  it('shall create Todo items', async function () {
    await testTodoMvc()
  })
})
