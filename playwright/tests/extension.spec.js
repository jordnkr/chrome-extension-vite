import { test, expect } from "../fixtures/test-fixture.js";
import ViewOnePage from "../pages/view-one-page.js";
import ViewTwoPage from "../pages/view-two-page.js";
const AxeBuilder = require("@axe-core/playwright").default;

// pages
let viewOnePage;
let viewTwoPage;
let testedPage;

test.beforeEach(async ({ page, context, extensionId }) => {
  viewOnePage = new ViewOnePage(page);
  viewTwoPage = new ViewTwoPage(page);

  testedPage = await context.newPage();
  await testedPage.goto("http://jordnkr.github.io/cssnippets/");

  await page.goto(`chrome-extension://${extensionId}/index.html`);
});

test("extension view 1 page", async ({ page }) => {
  await viewOnePage.clickProtonopiaButton();
  await expect(await viewOnePage.getResultText()).toBe("0");
  await page.waitForTimeout(5000); // this is here so that it won't automatically close the browser window
});

test("extension view 2 page", async () => {
  await viewOnePage.tabs.clickViewTwo();
  await viewTwoPage.enterName("test");
  await viewTwoPage.enterPhone("123");
  await viewTwoPage.clickSubmit();
  await expect(viewTwoPage.output).toContainText("Name: test");
  await expect(viewTwoPage.output).toContainText("Phone: 123");
  //await page.waitForTimeout(15000); // this is here so that it won't automatically close the browser window
});

test("validate View 1 with axe-core", async ({ page }) => {
  const axeResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]) // Specify the WCAG standards
    .analyze();

  expect(axeResults.violations).toEqual([]);
});

test("validate View 2 with axe-core", async ({ page }) => {
  await viewOnePage.tabs.clickViewTwo();

  const axeResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]) // Specify the WCAG standards
    .analyze();

  //expect(axeResults.violations).toEqual([]);
  expect(axeResults.violations).toHaveLength(0);
});