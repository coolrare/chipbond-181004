import { browser, by, element } from 'protractor';

export class CalculatorPageObject {
  navigateTo() {
    return browser.get('/#/calculator');
  }

  getNum1Input() {
    return element(by.css('input[name=num2]'));
  }

  getNum2Input() {
    return element(by.css('input[name=num2]'));
  }

  getCalculateButton() {
    return element(by.css('button'));
  }

  getResultInput() {
    return element(by.css('input[name=result]'));
  }
}
