import Tabs from "../components/tabs";

class ViewOnePage {
  constructor(page) {
    this.page = page;
    this.tabs = new Tabs(page);
    this.protonopiaButton = page.locator("#protanopiaBtn");
    this.clickMeButton = page.locator("#clickme");
    this.resultText = page.locator("#result");
  }

  async goto(extensionId) {
    await this.page.goto(`chrome-extension://${extensionId}/index.html`);
  }

  async clickProtonopiaButton() {
    await this.protonopiaButton.click();
  }

  async clickClickMeButton() {
    await this.clickClickMeButton.click();
  }

  async getResultText() {
    return await this.resultText.textContent();
  }
}

export default ViewOnePage;
