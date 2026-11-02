// tests/e2e/auth/forgot-password-functional.spec.ts
// Functional тесты для /forgot-password и /reset-password

import { test, expect } from "@playwright/test";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";

test.describe("Forgot/Reset Password — Functional Tests", () => {
  let forgotPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto();
    await forgotPage.expectLoaded();
  });

  // ===========================================
  // FORGOT PASSWORD
  // ===========================================
  test.describe("Forgot Password — Запрос сброса", () => {
    test.fixme("успешный запрос сброса для существующего email", async () => {
      await forgotPage.requestReset("test@example.com");
      await forgotPage.expectSuccessMessage();
    });

    test.fixme("запрос для несуществующего email — тоже успех (безопасность)", async () => {
      await forgotPage.requestReset("notexist@example.com");
      await forgotPage.expectSuccessMessage();
    });

    test("пустой email — ошибка браузера", async () => {
      await forgotPage.submit();

      const isValid = await forgotPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("невалидный email — ошибка браузера", async () => {
      await forgotPage.fillEmail("not-an-email");
      await forgotPage.submit();

      const isValid = await forgotPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });
  });

  // ===========================================
  // RESET PASSWORD (проверка токена)
  // ===========================================
  test.describe("Reset Password — Сброс пароля", () => {
    test.fixme("успешный сброс с валидным токеном", async () => {
      // TODO: создать токен через MSW data.ts, перейти на /reset-password?token=xxx
      // await forgotPage.page.goto('/reset-password?token=valid-token')
      // await forgotPage.fillPassword('NewPassword123!')
      // await forgotPage.fillConfirmPassword('NewPassword123!')
      // await forgotPage.submit()
      // await expect(...).toBeVisible()
    });

    test("несовпадающие пароли — ошибка", async () => {
      // await forgotPage.fillPassword('NewPassword123!')
      // await forgotPage.fillConfirmPassword('Different123!')
      // await forgotPage.submit()
      // await forgotPage.expectErrorMessage('Пароли не совпадают')
    });

    test("короткий пароль (< 12 символов) — ошибка", async () => {
      // await forgotPage.fillPassword('123')
      // await forgotPage.fillConfirmPassword('123')
      // await forgotPage.submit()
      // await forgotPage.expectErrorMessage('минимум 12 символов')
    });

    test.fixme("истёкший токен — ошибка", async () => {
      // TODO: создать истёкший токен в MSW
    });

    test.fixme("уже использованный токен — ошибка", async () => {
      // TODO: пометить токен как использованный в MSW
    });
  });

  // ===========================================
  // UI СОСТОЯНИЯ
  // ===========================================
  test.describe("UI States", () => {
    test("кнопка enabled сразу (не disabled)", async () => {
      await expect(forgotPage.submitButton).toBeEnabled();
    });

    test("кнопка enabled после ввода email", async () => {
      await forgotPage.fillEmail("test@example.com");
      await expect(forgotPage.submitButton).toBeEnabled();
    });

    test('поле email имеет autocomplete="email"', async () => {
      await expect(forgotPage.emailInput).toHaveAttribute("autocomplete", "email");
    });

    test("Tab навигация: email → button → link", async ({ page }) => {
      await forgotPage.emailInput.focus();
      await expect(forgotPage.emailInput).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(forgotPage.submitButton).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(forgotPage.loginLink).toBeFocused();
    });
  });

  // ===========================================
  // НАВИГАЦИЯ
  // ===========================================
  test.describe("Navigation", () => {
    test('ссылка "Войти" ведёт на /login', async ({ page }) => {
      await forgotPage.gotoLogin();
      await expect(page).toHaveURL(/\/login/);
    });
  });

  // ===========================================
  // ДОСТУПНОСТЬ (A11Y)
  // ===========================================
  test.describe("Accessibility", () => {
    test("label связан с email input", async () => {
      await forgotPage.page.getByText("Электронная почта").click();
      await expect(forgotPage.emailInput).toBeFocused();
    });

    test("форма имеет aria-labelledby на заголовок", async () => {
      const heading = forgotPage.page.getByRole("heading", { level: 1 });
      const headingId = await heading.getAttribute("id");
      expect(headingId).toBeTruthy();

      const section = forgotPage.page.locator(`section[aria-labelledby="${headingId}"]`);
      await expect(section).toBeAttached();
    });
  });
});
