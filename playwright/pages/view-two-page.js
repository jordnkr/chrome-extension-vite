import Tabs from "../components/tabs";

class ViewTwoPage {
  constructor(page) {
    this.page = page;
    this.tabs = new Tabs(page);
    this.nameField = page.locator("#name-field");
    this.phoneField = page.locator("#phone-field");
    this.submitButton = page.locator("#submit-button");
    this.output = page.locator('#output');
  }

  async enterName(name) {
    await this.nameField.fill(name);
  }

  async enterPhone(phone) {
    await this.phoneField.fill(phone);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}

export default ViewTwoPage;
