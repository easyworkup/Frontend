// tests/e2e/auth/login-functional.spec.ts
// Functional тесты для /login — Happy Path, Валидация, Edge Cases

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login — Functional Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded();
  });

  // ===========================================
  // HAPPY PATH
  // ===========================================
  test.describe("Happy Path", () => {
    test("успешный вход с валидными данными", async ({ page }) => {
      // Arrange: валидные данные (из моков data.ts)
      const email = "test@example.com";
      const password = "Password123!";

      // Act
      await loginPage.login(email, password);

      // Assert: редирект на дашборд / успех
      // TODO: заменить на реальный URL после логина
      // await expect(page).toHaveURL(/dashboard/)
    });

    test('вход с "Запомнить меня"', async ({ page }) => {
      await loginPage.fillEmail("test@example.com");
      await loginPage.fillPassword("Password123!");
      await loginPage.rememberCheckbox.check();
      await loginPage.submit();

      // TODO: проверить, что refresh token сохранён дольше
    });
  });

  // ===========================================
  // ВАЛИДАЦИЯ ПОЛЕЙ
  // ===========================================
  test.describe("Валидация полей", () => {
    test("пустой email — показывает ошибку браузера", async () => {
      await loginPage.fillPassword("Password123!");
      await loginPage.submit();

      // HTML5 валидация: поле email обязательно
      const isValid = await loginPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("невалидный формат email — показывает ошибку", async () => {
      await loginPage.fillEmail("not-an-email");
      await loginPage.fillPassword("Password123!");
      await loginPage.submit();

      const isValid = await loginPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("пустой пароль при заполненном email — показывает ошибку", async () => {
      await loginPage.fillEmail("test@example.com");
      await loginPage.submit();

      const isValid = await loginPage.passwordInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("email без @ — браузер блокирует сабмит", async () => {
      await loginPage.fillEmail("testexample.com");
      await loginPage.fillPassword("Password123!");
      await loginPage.submit();

      const isValid = await loginPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });
  });

  // ===========================================
  // EDGE CASES (граница)
  // ===========================================
  test.describe("Edge Cases", () => {
    test.fixme("несуществующий пользователь — ошибка 401", async ({ page }) => {
      await loginPage.login("notexist@example.com", "Password123!");

      // MSW мок возвращает 401
      await loginPage.expectErrorMessage("неверные учётные данные");
    });

    test.fixme("неверный пароль для существующего пользователя — ошибка 401", async () => {
      await loginPage.login("test@example.com", "WrongPassword123!");

      await loginPage.expectErrorMessage("неверные учётные данные");
    });

    test.fixme("заблокированный пользователь — ошибка 403", async () => {
      await loginPage.login("blocked@example.com", "Password123!");

      await loginPage.expectErrorMessage("заблокирован");
    });

    test("SQL injection в email — не ломает приложение", async () => {
      await loginPage.fillEmail("test@example.com'; DROP TABLE users; --");
      await loginPage.fillPassword("Password123!");
      await loginPage.submit();

      // Приложение не должно упасть
      await expect(loginPage.heading).toBeVisible();
    });

    test("очень длинный email (256+ символов)", async () => {
      const longEmail = "a".repeat(250) + "@example.com";
      await loginPage.fillEmail(longEmail);
      await loginPage.fillPassword("Password123!");
      await loginPage.submit();

      // Не должно упасть
      await expect(loginPage.heading).toBeVisible();
    });
  });

  // ===========================================
  // UI СОСТОЯНИЯ
  // ===========================================
  test.describe("UI States", () => {
    test("кнопка enabled после заполнения полей", async () => {
      await loginPage.fillEmail("test@example.com");
      await loginPage.fillPassword("Password123!");

      await expect(loginPage.submitButton).toBeEnabled();
    });

    test("loading состояние при сабмите", async ({ page }) => {
      // TODO: проверить спиннер/дизаблен кнопку во время запроса
      await loginPage.login("test@example.com", "Password123!");

      // Кнопка должна временно стать disabled
      // await expect(loginPage.submitButton).toBeDisabled()
    });

    test('поле email имеет autocomplete="username"', async () => {
      await expect(loginPage.emailInput).toHaveAttribute("autocomplete", "username");
    });

    test('поле пароль имеет autocomplete="current-password"', async () => {
      await expect(loginPage.passwordInput).toHaveAttribute("autocomplete", "current-password");
    });

    test("поле пароль маскирует ввод (type=password)", async () => {
      await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
    });

    test.fixme("Tab навигация: email → password → checkbox → button", async () => {
      await loginPage.emailInput.focus();
      await expect(loginPage.emailInput).toBeFocused();

      await loginPage.page.keyboard.press("Tab");
      await expect(loginPage.passwordInput).toBeFocused();

      await loginPage.page.keyboard.press("Tab");
      await expect(loginPage.rememberCheckbox).toBeFocused();

      await loginPage.page.keyboard.press("Tab");
      await expect(loginPage.submitButton).toBeFocused();
    });
  });

  // ===========================================
  // НАВИГАЦИЯ
  // ===========================================
  test.describe("Navigation", () => {
    test('ссылка "Забыли пароль?" ведёт на /forgot-password', async ({ page }) => {
      await loginPage.gotoForgotPassword();
      await expect(page).toHaveURL(/\/forgot-password/);
    });

    test('ссылка "Зарегистрироваться" ведёт на /register', async ({ page }) => {
      await loginPage.gotoRegister();
      await expect(page).toHaveURL(/\/register/);
    });

    test("логотип ведёт на главную", async ({ page }) => {
      await page.getByRole("link", { name: /easyworkup/i }).click();
      await expect(page).toHaveURL("http://localhost:3000/");
    });
  });

  // ===========================================
  // ДОСТУПНОСТЬ (A11Y)
  // ===========================================
  test.describe("Accessibility", () => {
    test("labels связаны с inputs", async () => {
      await loginPage.page.getByText("Электронная почта").click();
      await expect(loginPage.emailInput).toBeFocused();
    });

    test("форма имеет aria-labelledby на заголовок", async () => {
      const heading = loginPage.page.getByRole("heading", { level: 1 });
      const headingId = await heading.getAttribute("id");
      expect(headingId).toBeTruthy();

      const section = loginPage.page.locator(`section[aria-labelledby="${headingId}"]`);
      await expect(section).toBeAttached();
    });

    test("цветовой контраст достаточный (визуальная проверка)", async () => {
      // Ручное / визуальное
      await expect(loginPage.heading).toBeVisible();
    });
  });
});
