// tests/e2e/pages/RegisterPage.ts
// Page Object для страницы /register

import { type Page, type Locator } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Page Object для страницы /register
 */
export class RegisterPage {
  // Локаторы — только семантические
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly heading: Locator;
  readonly errorMessage: Locator;

  constructor(public readonly page: Page) {
    // Поля формы — через label
    this.nameInput = page.getByLabel(/имя/i);
    this.emailInput = page.getByLabel(/электронная почта/i);
    this.passwordInput = page.getByLabel(/пароль/i);

    // Чекбокс согласия — внутри label, без доступного имени, ищем по role внутри label
    this.termsCheckbox = page.locator('label:has(input[type="checkbox"]) input[type="checkbox"]');

    // Кнопка сабмита
    this.submitButton = page.getByRole("button", { name: /зарегистрироваться/i });

    // Ссылка на логин
    this.loginLink = page.getByRole("link", { name: /войти/i });

    // Заголовок формы (только h1)
    this.heading = page.getByRole("heading", { level: 1 });

    // Сообщение об ошибке
    this.errorMessage = page.getByRole("alert").or(page.locator('[role="alert"]'));
  }

  // Открыть страницу регистрации
  async goto() {
    await this.page.goto("/register");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Заполнить имя
  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  // Заполнить email
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Заполнить пароль
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // Нажать чекбокс согласия
  async checkTerms() {
    await this.termsCheckbox.check();
  }

  // Нажать "Зарегистрироваться"
  async submit() {
    await this.submitButton.click();
  }

  // Полный флоу регистрации
  async register(name: string, email: string, password: string) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.termsCheckbox.check();
    await this.submit();
  }

  // Проверить, что страница загрузилась
  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.termsCheckbox).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.loginLink).toBeVisible();
  }

  // Проверить ошибку
  async expectErrorMessage(text?: string) {
    if (text) {
      await expect(this.errorMessage).toContainText(text);
    } else {
      await expect(this.errorMessage).toBeVisible();
    }
  }

  // Перейти на логин
  async gotoLogin() {
    await this.loginLink.click();
  }
}
