import { test, expect } from "./fixtures.js";

test("example test", async ({ page }) => {
  await page.goto("https://example.com");
  //await page.waitForTimeout(30000); // this is here so that it won't automatically close the browser window
});

test("extension page", async ({ page, context, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  const testedPage = await context.newPage();
  await testedPage.goto("http://jordnkr.github.io/cssnippets/");

  await page.click("#protanopiaBtn");
  await expect(page.locator("#result")).toHaveText("0");
  await page.waitForTimeout(10000); // this is here so that it won't automatically close the browser window
});
