// tests/e2e/pages/ForgotPasswordPage.ts
// Page Object для страницы /forgot-password

import { type Page, type Locator } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Page Object для страницы /forgot-password
 */
export class ForgotPasswordPage {
  // Локаторы — только семантические
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly heading: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(public readonly page: Page) {
    // Поле email
    this.emailInput = page.getByLabel(/электронная почта/i);

    // Кнопка сабмита
    this.submitButton = page.getByRole("button", { name: /отправить ссылку/i });

    // Ссылка на логин
    this.loginLink = page.getByRole("link", { name: /войти/i });

    // Заголовок формы (только h1)
    this.heading = page.getByRole("heading", { level: 1 });

    // Сообщение об ошибке
    this.errorMessage = page.getByRole("alert").or(page.locator('[role="alert"]'));

    // Сообщение об успехе (после отправки)
    this.successMessage = page.getByText(/если аккаунт с такой почтой существует/i);
  }

  // Открыть страницу восстановления пароля
  async goto() {
    await this.page.goto("/forgot-password");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Заполнить email
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Нажать "Отправить ссылку"
  async submit() {
    await this.submitButton.click();
  }

  // Полный флоу запроса сброса
  async requestReset(email: string) {
    await this.fillEmail(email);
    await this.submit();
  }

  // Проверить, что страница загрузилась
  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
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

  // Проверить сообщение об успехе
  async expectSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  // Перейти на логин
  async gotoLogin() {
    await this.loginLink.click();
  }
}
