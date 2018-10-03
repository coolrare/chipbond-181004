import { browser } from 'protractor';
import { SignupPageObject } from './signup.po';

describe('Calculator Page', function() {
  let page: SignupPageObject;

  beforeEach(() => {
    page = new SignupPageObject();
  });

  it('should complete form', () => {
    page.navigateTo();

    // 資料未完成前，無法點擊按鈕
    expect(page.getSubmitButton().isEnabled()).toBe(false);
    // 表單未送出，不會顯示訊息
    expect(page.getSuccessMessage().isPresent()).toBe(false);

    page.getSexInputF().click();

    page.getInterestDropdown().click();
    page.getTypescriptLabelInDropdown().click();

    page.getNameInput().clear();
    page.getNameInput().sendKeys('Mike');

    // 資料填完後，可以點擊按鈕
    expect(page.getSubmitButton().isEnabled()).toBe(true);

    page.getSubmitButton().click();
    // 表單送出後，顯示提示訊息
    expect(page.getSuccessMessage().isPresent()).toBe(true);

    browser.sleep(5000);
  });
});
