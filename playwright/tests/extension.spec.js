import { test, expect } from "../fixtures/test-fixture.js";
import ViewOnePage from "../pages/view-one-page.js";
import ViewTwoPage from "../pages/view-two-page.js";

test("extension view 1 page", async ({ page, context, extensionId }) => {
  const viewOnePage = new ViewOnePage(page);
  await viewOnePage.goto(extensionId);

  const testedPage = await context.newPage();
  await testedPage.goto("http://jordnkr.github.io/cssnippets/");

  await viewOnePage.clickProtonopiaButton();
  await expect(await viewOnePage.getResultText()).toBe("0");
  //await page.waitForTimeout(10000); // this is here so that it won't automatically close the browser window
});

test("extension view 2 page", async ({ page, context, extensionId }) => {
  const viewOnePage = new ViewOnePage(page);
  const viewTwoPage = new ViewTwoPage(page);

  await viewOnePage.goto(extensionId);

  const testedPage = await context.newPage();
  await testedPage.goto("http://jordnkr.github.io/cssnippets/");
  
  await viewOnePage.tabs.clickViewTwo();
  await viewTwoPage.enterName('test');
  await viewTwoPage.enterPhone('123');
  await viewTwoPage.clickSubmit();
  await expect(viewTwoPage.output).toContainText('Name: test');
  await expect(viewTwoPage.output).toContainText('Phone: 123');
  //await page.waitForTimeout(15000); // this is here so that it won't automatically close the browser window
});