import { test as baseTest, expect } from "../fixtures/test-fixture.js";
import { axeBuilder as axe } from "../fixtures/axe-fixture.js";
import ViewOnePage from "../pages/view-one-page.js";
import ViewTwoPage from "../pages/view-two-page.js";

const test = baseTest.extend({ axe });

// pages
let viewOnePage;
let viewTwoPage;

test.beforeEach(async ({ page }) => {
  viewOnePage = new ViewOnePage(page);
  viewTwoPage = new ViewTwoPage(page);
});

test("validate View 1 with axe-core", async ({ page, axe }) => {
  const axeResults = await await axe().analyze();

  expect(axeResults.violations).toEqual([]);
});

test("validate View 2 with axe-core", async ({ page, axe }) => {
  await viewOnePage.tabs.clickViewTwo();

  const axeResults = await axe().analyze();

  //expect(axeResults.violations).toEqual([]);
  expect(axeResults.violations).toHaveLength(0);
});
