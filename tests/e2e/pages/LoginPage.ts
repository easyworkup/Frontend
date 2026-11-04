import { type Page, type Locator } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Page Object Model для страницы /login
 *
 * Зачем POM:
 * - Все селекторы в одном месте
 * - Изменился HTML → правим только здесь, тесты не трогаем
 * - Тесты читаются как документация: loginPage.fillEmail() понятнее чем page.fill('input[name="email"]')
 */
export class LoginPage {
  // Локаторы — только семантические (role, label)
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly heading: Locator;
  readonly errorMessage: Locator;

  constructor(public readonly page: Page) {
    // Поля формы — через label (семантично, доступно)
    this.emailInput = page.getByLabel(/электронная почта/i);
    this.passwordInput = page.getByLabel(/пароль/i);

    // Кнопка сабмита
    this.submitButton = page.getByRole("button", { name: /войти/i });

    // Чекбокс "Запомнить меня"
    this.rememberCheckbox = page.getByRole("checkbox", { name: /запомнить/i });

    // Ссылки
    this.forgotPasswordLink = page.getByRole("link", { name: /забыли пароль/i });
    this.registerLink = page.getByRole("link", { name: /зарегистрироваться/i });

    // Заголовок формы (только h1)
    this.heading = page.getByRole("heading", { level: 1 });

    // Сообщение об ошибке (появляется после неудачного сабмита)
    this.errorMessage = page.getByRole("alert").or(page.locator('[role="alert"]'));
  }

  // Открыть страницу логина
  async goto() {
    await this.page.goto("/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Заполнить email
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Заполнить пароль
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // Нажать "Войти"
  async submit() {
    await this.submitButton.click();
  }

  // Полный флоу логина
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  // Проверить, что страница загрузилась
  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  // Проверить ошибку (после неудачного логина)
  async expectErrorMessage(text?: string) {
    if (text) {
      await expect(this.errorMessage).toContainText(text);
    } else {
      await expect(this.errorMessage).toBeVisible();
    }
  }

  // Перейти на регистрацию
  async gotoRegister() {
    await this.registerLink.click();
  }

  // Перейти на восстановление пароля
  async gotoForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}
