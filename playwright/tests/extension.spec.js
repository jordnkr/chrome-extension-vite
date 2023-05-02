import { test, expect } from "../fixtures/test-fixture.js";
import ViewOnePage from "../pages/view-one-page.js";
import ViewTwoPage from "../pages/view-two-page.js";

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

test("extension view 1 page", async ({ page }) => {
  await viewOnePage.clickProtonopiaButton();
  await expect(await viewOnePage.getResultText()).toBe("0");
  //await page.waitForTimeout(5000); // this is here so that it won't automatically close the browser window
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
