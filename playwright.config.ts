import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright конфиг для EasyWorkUp Frontend
 * Документация: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Глобальный setup/teardown для MSW
  globalSetup: require.resolve("./playwright.global-setup"),

  // Папка с тестами
  testDir: "./tests/e2e",

  // Игнорировать API контракт тесты (отдельный джоб в CI)
  testIgnore: ["**/api-contract.spec.ts"],

  // Запускать тесты параллельно
  fullyParallel: true,

  // Падать если остались только .only тесты (защита от случайного коммита)
  forbidOnly: !!process.env.CI,

  // Повторять упавший тест в CI (flaky тесты не падают зря)
  retries: process.env.CI ? 2 : 0,

  // Воркеры: в CI — 1 (стабильнее), локально — авто
  workers: process.env.CI ? 1 : undefined,

  // Репортеры: только Playwright HTML Report (Allure удален)
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: "playwright-report", open: "never" }]]
    : [["list"], ["html", { outputFolder: "playwright-report", open: "on-failure" }]],

  // Глобальные настройки для всех тестов
  use: {
    // Базовый URL — меняется через env переменную в CI
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",

    // Записывать trace при первом retry (помогает дебажить падения)
    trace: "on-first-retry",

    // Скриншот только при фейле
    screenshot: "only-on-failure",

    // Видео при первом retry
    video: "on-first-retry",

    // Локаль
    locale: "ru-RU",
  },

  // Проекты — только Desktop Chromium
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Dev-сервер запускай вручную: pnpm dev (или через WebStorm)
  // Playwright использует baseURL: 'http://localhost:3000'
  // В CI добавь: pnpm dev & перед запуском тестов
});
