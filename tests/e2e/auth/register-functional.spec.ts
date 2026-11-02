// tests/e2e/auth/register-functional.spec.ts
// Functional тесты для /register — Happy Path, Валидация, Edge Cases

import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test.describe("Register — Functional Tests", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.expectLoaded();
  });

  // ===========================================
  // HAPPY PATH
  // ===========================================
  test.describe("Happy Path", () => {
    test("успешная регистрация с валидными данными", async ({ page }) => {
      const name = "Test User";
      const email = "newuser@example.com";
      const password = "Password123!";

      await registerPage.register(name, email, password);

      // TODO: проверить редирект или успех
    });

    test("регистрация с минимально валидными данными", async () => {
      await registerPage.register("A", "b@c.com", "Password123!");
      // TODO: проверить успех
    });
  });

  // ===========================================
  // ВАЛИДАЦИЯ ПОЛЕЙ
  // ===========================================
  test.describe("Валидация полей", () => {
    test("пустое имя — показывает ошибку браузера", async () => {
      await registerPage.fillEmail("test@example.com");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();
      await registerPage.submit();

      const isValid = await registerPage.nameInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("пустой email — показывает ошибку браузера", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();
      await registerPage.submit();

      const isValid = await registerPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("невалидный email — показывает ошибку", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillEmail("not-an-email");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();
      await registerPage.submit();

      const isValid = await registerPage.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test("пустой пароль — показывает ошибку", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillEmail("test@example.com");
      await registerPage.checkTerms();
      await registerPage.submit();

      const isValid = await registerPage.passwordInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });

    test.fixme("короткий пароль (< 8 символов) — ошибка", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillEmail("test@example.com");
      await registerPage.fillPassword("123");
      await registerPage.checkTerms();
      await registerPage.submit();

      await registerPage.expectErrorMessage("минимум 8 символов");
    });

    test.fixme("не отмечен чекбокс согласия — сабмит заблокирован", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillEmail("test@example.com");
      await registerPage.fillPassword("Password123!");
      // НЕ ставим галочку
      await registerPage.submit();

      // HTML5 валидация: чекбокс required
      const isValid = await registerPage.termsCheckbox.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isValid).toBe(false);
    });
  });

  // ===========================================
  // EDGE CASES
  // ===========================================
  test.describe("Edge Cases", () => {
    test.fixme("дубликат email — ошибка 409", async () => {
      // Первый пользователь
      await registerPage.register("User 1", "duplicate@example.com", "Password123!");
      await registerPage.goto();

      // Второй с тем же email
      await registerPage.register("User 2", "duplicate@example.com", "Password123!");

      await registerPage.expectErrorMessage("уже существует");
    });

    test("SQL injection в имени — не ломает приложение", async () => {
      await registerPage.fillName("Test'; DROP TABLE users; --");
      await registerPage.fillEmail("test@example.com");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();
      await registerPage.submit();

      await expect(registerPage.heading).toBeVisible();
    });

    test("очень длинное имя (256+ символов)", async () => {
      const longName = "a".repeat(300);
      await registerPage.fillName(longName);
      await registerPage.fillEmail("test@example.com");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();
      await registerPage.submit();

      await expect(registerPage.heading).toBeVisible();
    });

    test("XSS в email — не исполняется", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillEmail("<script>alert(1)</script>@example.com");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();
      await registerPage.submit();

      await expect(registerPage.heading).toBeVisible();
    });
  });

  // ===========================================
  // UI СОСТОЯНИЯ
  // ===========================================
  test.describe("UI States", () => {
    test("кнопка enabled сразу (не disabled)", async () => {
      await expect(registerPage.submitButton).toBeEnabled();
    });

    test("кнопка enabled после заполнения всех полей + чекбокс", async () => {
      await registerPage.fillName("Test");
      await registerPage.fillEmail("test@example.com");
      await registerPage.fillPassword("Password123!");
      await registerPage.checkTerms();

      await expect(registerPage.submitButton).toBeEnabled();
    });

    test('поле имя имеет autocomplete="name"', async () => {
      await expect(registerPage.nameInput).toHaveAttribute("autocomplete", "name");
    });

    test('поле email имеет autocomplete="email"', async () => {
      await expect(registerPage.emailInput).toHaveAttribute("autocomplete", "email");
    });

    test('поле пароль имеет autocomplete="new-password"', async () => {
      await expect(registerPage.passwordInput).toHaveAttribute("autocomplete", "new-password");
    });

    test("поле пароль маскирует ввод (type=password)", async () => {
      await expect(registerPage.passwordInput).toHaveAttribute("type", "password");
    });

    test.fixme("Tab навигация: name → email → password → checkbox → button", async () => {
      await registerPage.nameInput.focus();
      await expect(registerPage.nameInput).toBeFocused();

      await registerPage.page.keyboard.press("Tab");
      await expect(registerPage.emailInput).toBeFocused();

      await registerPage.page.keyboard.press("Tab");
      await expect(registerPage.passwordInput).toBeFocused();

      await registerPage.page.keyboard.press("Tab");
      await expect(registerPage.termsCheckbox).toBeFocused();

      await registerPage.page.keyboard.press("Tab");
      await expect(registerPage.submitButton).toBeFocused();
    });
  });

  // ===========================================
  // НАВИГАЦИЯ
  // ===========================================
  test.describe("Navigation", () => {
    test('ссылка "Войти" ведёт на /login', async ({ page }) => {
      await registerPage.gotoLogin();
      await expect(page).toHaveURL(/\/login/);
    });
  });

  // ===========================================
  // ДОСТУПНОСТЬ (A11Y)
  // ===========================================
  test.describe("Accessibility", () => {
    test("labels связаны с inputs", async () => {
      await registerPage.page.getByText("Имя").click();
      await expect(registerPage.nameInput).toBeFocused();
    });

    test("форма имеет aria-labelledby на заголовок", async () => {
      const heading = registerPage.page.getByRole("heading", { level: 1 });
      const headingId = await heading.getAttribute("id");
      expect(headingId).toBeTruthy();

      const section = registerPage.page.locator(`section[aria-labelledby="${headingId}"]`);
      await expect(section).toBeAttached();
    });
  });
});
