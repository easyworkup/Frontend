import { test, expect } from "@playwright/test";
test.describe("Smoke — Auth страницы открываются", () => {
  test("/login → заголовок, поля, кнопка, ссылки", async ({ page }) => {
    await page.goto("/login");
    // Заголовок формы — только h1 (форма всегда в h1)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/электронная почта/i)).toBeVisible();
    await expect(page.getByLabel(/пароль/i)).toBeVisible();
    await expect(page.getByRole("button")).toBeVisible();
    await expect(page.getByRole("link", { name: /забыли пароль/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /зарегистрироваться/i })).toBeVisible();
  });
  test("/register → заголовок, поля, чекбокс, кнопка, ссылка", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/имя/i)).toBeVisible();
    await expect(page.getByLabel(/электронная почта/i)).toBeVisible();
    await expect(page.getByLabel(/пароль/i)).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("button")).toBeVisible();
    await expect(page.getByRole("link", { name: /войти/i })).toBeVisible();
  });
  test("/forgot-password → заголовок, поле, кнопка, ссылка", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/электронная почта/i)).toBeVisible();
    await expect(page.getByRole("button")).toBeVisible();
    await expect(page.getByRole("link", { name: /войти/i })).toBeVisible();
  });
  test("Нет консольных ошибок на /login", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    expect(errors, `Ошибки в консоли: ${errors.join(", ")}`).toHaveLength(0);
  });
});
