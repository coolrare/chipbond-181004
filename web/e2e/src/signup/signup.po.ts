import { browser, by, element } from 'protractor';

export class SignupPageObject {
  navigateTo() {
    return browser.get('/#/signup');
  }

  getNameInput() {
    return element(by.css('input[name=name]'));
  }

  getSexInputM() {
    return element(by.css('p-radioButton[name=sex][value=M]'));
  }

  getSexInputF() {
    return element(by.css('p-radioButton[name=sex][value=F]'));
  }

  getInterestDropdown() {
    return element(by.css('p-dropdown[name=interest]'));
  }

  getTypescriptLabelInDropdown() {
    return element(by.css('p-dropdown ul li:nth-child(3)'));
  }

  getSubmitButton() {
    return element(by.css('button[label=Submit]'));
  }

  getSuccessMessage() {
    return element(by.css('#successMessage'));
  }
}
