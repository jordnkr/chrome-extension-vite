class Tabs {
  constructor(page) {
    this.page = page;
    this.viewOneButton = page.locator('#tab1');
    this.viewTwoButton = page.locator('#tab2');
  }

  async clickViewOne() {
    await this.viewOneButton.click();
  }

  async clickViewTwo() {
    await this.viewTwoButton.click();
  }
}

export default Tabs;
