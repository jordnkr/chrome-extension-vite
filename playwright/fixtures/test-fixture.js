/* eslint-disable no-undef */
import { test as base, expect, chromium } from "@playwright/test";
import { extensionId } from "./extension-id-fixture";
import path from "path";

const newTest = base.extend({ extensionId });

const extensionPath = path.join(__dirname, "../../dist"); // make sure this is correct

exports.test = newTest.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium };
    const launchOptions = {
      //devtools: true,
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

    await use(context);
    await context.close();
  },
  page: async ({ context, extensionId }, use) => {
    const extensionTarget = await context.newPage();
    await extensionTarget.goto("http://jordnkr.github.io/cssnippets/");
    //await extensionTarget.goto("http://localhost:8080/");

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/index.html`);

    await use(page);
  },
});

exports.expect = expect;
