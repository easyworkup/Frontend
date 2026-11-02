// playwright.global-setup.ts
// Глобальный setup для Playwright — запуск MSW перед всеми тестами

import { msw } from "./src/test/msw";

export default async function globalSetup() {
  console.log("[Global Setup] Starting MSW server...");
  msw.start();
  console.log("[Global Setup] MSW server started");

  return async () => {
    console.log("[Global Teardown] Stopping MSW server...");
    msw.stop();
    console.log("[Global Teardown] MSW server stopped");
  };
}
