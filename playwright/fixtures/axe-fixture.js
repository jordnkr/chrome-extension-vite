// axe-test.js
import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Default configuration of AxeBuilder
export const axeBuilder = async ({ page }, use) => {
  const makeAxeBuilder = () =>
    new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
    ]);

  await use(makeAxeBuilder);
};

// Exporting in case this would be all that's needed. Not really likely while testing Chrome extension.
export const test = base.extend({ axeBuilder });
