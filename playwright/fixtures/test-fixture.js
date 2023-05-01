import { test as base, expect, chromium } from "@playwright/test";
import path from "path";

const extensionPath = path.join(__dirname, "../../dist"); // make sure this is correct

exports.test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium };
    const launchOptions = {
      devtools: true,
      headless: false,
      args: [`--disable-extensions-except=${extensionPath}`],
      // viewport: {
      //   width: 1920,
      //   height: 1080,
      // },
    };
    const context = await browserTypes[browserName].launchPersistentContext(
      "",
      launchOptions
    );

    await context.addInitScript(() => {
      window.__testmode = true;
    });

    await context.pages()[0].close();

    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});
exports.expect = expect;