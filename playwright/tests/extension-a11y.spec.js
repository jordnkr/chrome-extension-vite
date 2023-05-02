import { test as baseTest, expect } from "../fixtures/test-fixture.js";
import { axeBuilder as axe } from "../fixtures/axe-fixture.js";
import ViewOnePage from "../pages/view-one-page.js";
import ViewTwoPage from "../pages/view-two-page.js";

const test = baseTest.extend({ axe });

// pages
let viewOnePage;
let viewTwoPage;
let extensionTarget;

test.beforeEach(async ({ page, context, extensionId }) => {
  viewOnePage = new ViewOnePage(page);
  viewTwoPage = new ViewTwoPage(page);

  extensionTarget = await context.newPage();
  await extensionTarget.goto("http://jordnkr.github.io/cssnippets/");

  await page.goto(`chrome-extension://${extensionId}/index.html`);
});

test("validate View 1 with axe-core", async ({ axe }) => {
  const axeResults = await await axe().analyze();

  expect(axeResults.violations).toEqual([]);
});

test("validate View 2 with axe-core", async ({ axe }) => {
  await viewOnePage.tabs.clickViewTwo();

  const axeResults = await axe().analyze();

  //expect(axeResults.violations).toEqual([]);
  expect(axeResults.violations).toHaveLength(0);
});
