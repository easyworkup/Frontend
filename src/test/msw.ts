import { setupServer } from "msw/node";
import { handlers } from "../mocks";

// Создаём сервер с обработчиками
export const server = setupServer(...handlers);

// Хелперы для тестов
export const msw = {
  // Запуск сервера перед тестами
  start: () => server.listen({ port: 3001 }),

  // Остановка после тестов
  stop: () => server.close(),

  // Сброс handlers (для изоляции тестов)
  reset: () => server.resetHandlers(),

  // Временная замена handler'а (для специфичных тестов)
  use: (...handlers: any[]) => server.use(...handlers),

  // Восстановление стандартных handlers
  restore: () => server.restoreHandlers(),
};

// Экспортируем базовый URL для API тестов
export const MSW_BASE_URL = "http://localhost:3001";
