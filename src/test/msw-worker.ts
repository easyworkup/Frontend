// src/test/msw-worker.ts
// MSW Worker для браузера (Playwright)

// Этот файл будет использоваться Playwright для подключения MSW в браузере
// В playwright.config.ts добавить:
//   use: { baseURL: 'http://localhost:3000' }
// И в beforeAll: await page.addInitScript({ path: './src/test/msw-worker.ts' })

// Для работы в браузере нужен service worker
// Генерация: npx msw init public/ --save

// Этот файл — точка входа для service worker
// Сгенерируется командой: npx msw init public/ --save
// А затем: import { setupWorker } from 'msw/browser' + worker.start()

export {}; // Пустой экспорт для TypeScript
