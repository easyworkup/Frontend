import { test as base, type Page } from "@playwright/test";

/**
 * Viewport fixtures для тестирования адаптивности
 *
 * Использование:
 *   test('mobile view', async ({ page, mobileViewport }) => {
 *     await mobileViewport(page)
 *     // тест на 375px
 *   })
 *
 *   test('tablet view', async ({ page, tabletViewport }) => {
 *     await tabletViewport(page)
 *     // тест на 768px
 *   })
 *
 *   test('desktop view', async ({ page, desktopViewport }) => {
 *     await desktopViewport(page)
 *     // тест на 1280px
 *   })
 */

// ─── Viewport sizes ────────────────────────────────────────────────────────

export const VIEWPORTS = {
  mobile: { width: 375, height: 812 }, // iPhone 13/14 профиль
  tablet: { width: 768, height: 1024 }, // iPad portrait
  desktop: { width: 1280, height: 720 }, // Desktop Chrome default
} as const;

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Установить mobile viewport (375px) */
export async function setMobileViewport(page: Page) {
  await page.setViewportSize(VIEWPORTS.mobile);
}

/** Установить tablet viewport (768px) */
export async function setTabletViewport(page: Page) {
  await page.setViewportSize(VIEWPORTS.tablet);
}

/** Установить desktop viewport (1280px) */
export async function setDesktopViewport(page: Page) {
  await page.setViewportSize(VIEWPORTS.desktop);
}

// ─── Test fixtures ─────────────────────────────────────────────────────────

/** Fixture для mobile viewport */
export const mobileViewport = base.extend<{ mobileViewport: (page: Page) => Promise<void> }>({
  mobileViewport: async ({ page }, use) => {
    await use(async () => setMobileViewport(page));
  },
});

/** Fixture для tablet viewport */
export const tabletViewport = base.extend<{ tabletViewport: (page: Page) => Promise<void> }>({
  tabletViewport: async ({ page }, use) => {
    await use(async () => setTabletViewport(page));
  },
});

/** Fixture для desktop viewport */
export const desktopViewport = base.extend<{ desktopViewport: (page: Page) => Promise<void> }>({
  desktopViewport: async ({ page }, use) => {
    await use(async () => setDesktopViewport(page));
  },
});

// ─── Combined fixture (all viewports) ──────────────────────────────────────

/** Fixture со всеми viewport helpers сразу */
export const viewports = base.extend<{
  mobile: (page: Page) => Promise<void>;
  tablet: (page: Page) => Promise<void>;
  desktop: (page: Page) => Promise<void>;
}>({
  mobile: async ({ page }, use) => {
    await use(async () => setMobileViewport(page));
  },
  tablet: async ({ page }, use) => {
    await use(async () => setTabletViewport(page));
  },
  desktop: async ({ page }, use) => {
    await use(async () => setDesktopViewport(page));
  },
});

// ─── Re-export base test для удобства ──────────────────────────────────────

export { test, expect } from "@playwright/test";
