const { test: base, chromium, webkit, expect } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, '../../dist') // make sure this is correct

const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit }
    const launchOptions = {
      devtools: true,
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`
      ],
      viewport: {
        width: 1920,
        height: 1080
      }
    }
    const context = await browserTypes[browserName].launchPersistentContext(
      '',
      launchOptions
    )

    await context.addInitScript(() => {
      window.__testmode = true;
    });

    await context.pages()[0].close();


    await use(context)
    await context.close()
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [background] = context.serviceWorkers();
    if (!background)
      background = await context.waitForEvent('serviceworker');

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
})

test.describe('Popup', () => {
  test('example test', async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForTimeout(30000) // this is here so that it won't automatically close the browser window
  });
  
  test('extension page', async ({ page, context, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);

    const testedPage = await context.newPage();
    await testedPage.goto('http://jordnkr.github.io/cssnippets/');

    await page.click("#protanopiaBtn");
    await expect(page.locator('#result')).toHaveText('0');
    await page.waitForTimeout(30000) // this is here so that it won't automatically close the browser window
  });
})