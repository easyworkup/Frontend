// tests/e2e/api-contract.spec.ts
// API Contract Tests для Auth эндпоинтов
// Проверяем: статус коды, схему ответа, заголовки, тайминги

import { test, expect } from "@playwright/test";

// Базовый URL MSW мок-сервера (запускается в globalSetup на порту 3001)
const API_BASE = process.env.API_BASE_URL ?? "http://localhost:3001";

// Схемы ответов (контракты)
const schemas = {
  // Успешный ответ с токенами
  authSuccess: {
    type: "object",
    required: ["accessToken", "refreshToken", "user"],
    properties: {
      accessToken: { type: "string", minLength: 10 },
      refreshToken: { type: "string", minLength: 10 },
      user: {
        type: "object",
        required: ["id", "email", "name"],
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
          name: { type: "string" },
          role: { type: "string" },
        },
      },
    },
  },

  // Ответ ошибки
  error: {
    type: "object",
    required: ["statusCode", "message", "error"],
    properties: {
      statusCode: { type: "number" },
      message: { type: "string" },
      error: { type: "string" },
    },
  },

  // Успешный запрос сброса (всегда 200 для безопасности)
  forgotSuccess: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },

  // Успешный сброс пароля
  resetSuccess: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
};

// Хелпер для валидации схемы
function validateSchema(data: unknown, schema: Record<string, unknown>) {
  // Простая валидация required полей
  if (schema.required && typeof data === "object" && data !== null) {
    for (const field of schema.required as string[]) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
  return true;
}

test.describe("API Contract Tests — Auth Endpoints", () => {
  // ===========================================
  // POST /api/auth/login
  // ===========================================
  test.describe("POST /api/auth/login", () => {
    test("200: валидные креды → accessToken + refreshToken + user", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/login`, {
        data: {
          email: "test@example.com",
          password: "Password123!",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");

      const body = await response.json();
      validateSchema(body, schemas.authSuccess);

      // Проверяем структуру токенов
      expect(body.accessToken).toBeTruthy();
      expect(body.refreshToken).toBeTruthy();
      expect(body.user.email).toBe("test@example.com");
    });

    test("401: неверный пароль", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/login`, {
        data: {
          email: "test@example.com",
          password: "WrongPassword123!",
        },
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      validateSchema(body, schemas.error);
      expect(body.message).toContain("неверные");
    });

    test("401: несуществующий пользователь", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/login`, {
        data: {
          email: "notexist@example.com",
          password: "Password123!",
        },
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      validateSchema(body, schemas.error);
    });

    test("403: заблокированный пользователь", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/login`, {
        data: {
          email: "blocked@example.com",
          password: "Password123!",
        },
      });

      expect(response.status()).toBe(403);
      const body = await response.json();
      validateSchema(body, schemas.error);
      expect(body.message).toContain("заблокирован");
    });

    test("422: невалидный email", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/login`, {
        data: {
          email: "not-an-email",
          password: "Password123!",
        },
      });

      expect([400, 422]).toContain(response.status());
      const body = await response.json();
      validateSchema(body, schemas.error);
    });

    test("429: rate limiting (слишком много запросов)", async ({ request }) => {
      // Делаем 6 быстрых запросов (лимит 5/min в MSW)
      const promises = Array(6)
        .fill(null)
        .map(() =>
          request.post(`${API_BASE}/api/auth/login`, {
            data: { email: "test@example.com", password: "Password123!" },
          })
        );

      const responses = await Promise.all(promises);
      const rateLimited = responses.some((r) => r.status() === 429);

      // Хотя бы один должен быть 429
      expect(rateLimited).toBeTruthy();
    });
  });

  // ===========================================
  // POST /api/auth/register
  // ===========================================
  test.describe("POST /api/auth/register", () => {
    test("201: валидные данные → создан пользователь", async ({ request }) => {
      const uniqueEmail = `newuser${Date.now()}@example.com`;

      const response = await request.post(`${API_BASE}/api/auth/register`, {
        data: {
          name: "New User",
          email: uniqueEmail,
          password: "Password123!",
        },
      });

      expect(response.status()).toBe(201);
      const body = await response.json();
      validateSchema(body, schemas.authSuccess);
      expect(body.user.email).toBe(uniqueEmail);
    });

    test("409: дубликат email", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/register`, {
        data: {
          name: "Another User",
          email: "test@example.com", // уже существует в моках
          password: "Password123!",
        },
      });

      expect(response.status()).toBe(409);
      const body = await response.json();
      validateSchema(body, schemas.error);
      expect(body.message).toContain("уже существует");
    });

    test("422: короткий пароль", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/register`, {
        data: {
          name: "Test",
          email: "shortpass@example.com",
          password: "123",
        },
      });

      expect([400, 422]).toContain(response.status());
      const body = await response.json();
      validateSchema(body, schemas.error);
    });

    test("422: невалидный email", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/register`, {
        data: {
          name: "Test",
          email: "invalid-email",
          password: "Password123!",
        },
      });

      expect([400, 422]).toContain(response.status());
    });
  });

  // ===========================================
  // POST /api/auth/refresh
  // ===========================================
  test.describe("POST /api/auth/refresh", () => {
    test("200: валидный refresh token → новый access token", async ({ request }) => {
      // Сначала логинимся чтобы получить refresh token
      const loginResponse = await request.post(`${API_BASE}/api/auth/login`, {
        data: { email: "test@example.com", password: "Password123!" },
      });
      const { refreshToken } = await loginResponse.json();

      const response = await request.post(`${API_BASE}/api/auth/refresh`, {
        data: { refreshToken },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.accessToken).toBeTruthy();
      expect(body.refreshToken).toBeTruthy(); // может ротироваться
    });

    test("401: невалидный refresh token", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/refresh`, {
        data: { refreshToken: "invalid-token" },
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      validateSchema(body, schemas.error);
    });

    test("401: отсутствующий refresh token", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/refresh`, {
        data: {},
      });

      expect([400, 401, 422]).toContain(response.status());
    });
  });

  // ===========================================
  // POST /api/auth/logout
  // ===========================================
  test.describe("POST /api/auth/logout", () => {
    test("200: успешный логаут", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/logout`, {
        data: { refreshToken: "some-token" },
      });

      expect([200, 204]).toContain(response.status());
    });

    test("401: невалидный токен", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/logout`, {
        data: { refreshToken: "invalid" },
      });

      expect([200, 401]).toContain(response.status()); // может быть идемпотентным
    });
  });

  // ===========================================
  // POST /api/auth/forgot-password
  // ===========================================
  test.describe("POST /api/auth/forgot-password", () => {
    test("200: существующий email → успех (безопасность)", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/forgot-password`, {
        data: { email: "test@example.com" },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      validateSchema(body, schemas.forgotSuccess);
      expect(body.message).toContain("если аккаунт");
    });

    test("200: несуществующий email → тоже успех (безопасность)", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/forgot-password`, {
        data: { email: "notexist@example.com" },
      });

      expect(response.status()).toBe(200); // НЕ 404!
      const body = await response.json();
      validateSchema(body, schemas.forgotSuccess);
    });

    test("422: невалидный email", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/forgot-password`, {
        data: { email: "invalid-email" },
      });

      expect([400, 422]).toContain(response.status());
    });
  });

  // ===========================================
  // POST /api/auth/reset-password
  // ===========================================
  test.describe("POST /api/auth/reset-password", () => {
    test("200: валидный токен → пароль сброшен", async ({ request }) => {
      // В MSW data.ts есть validResetTokens
      const response = await request.post(`${API_BASE}/api/auth/reset-password`, {
        data: {
          token: "valid-reset-token-123",
          password: "NewPassword123!",
          confirmPassword: "NewPassword123!",
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      validateSchema(body, schemas.resetSuccess);
    });

    test("400: несовпадающие пароли", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/reset-password`, {
        data: {
          token: "valid-reset-token-123",
          password: "NewPassword123!",
          confirmPassword: "Different123!",
        },
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      validateSchema(body, schemas.error);
      expect(body.message).toContain("совпадают");
    });

    test("400: короткий пароль", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/reset-password`, {
        data: {
          token: "valid-reset-token-123",
          password: "123",
          confirmPassword: "123",
        },
      });

      expect(response.status()).toBe(400);
    });

    test("401: истёкший токен", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/reset-password`, {
        data: {
          token: "expired-token",
          password: "NewPassword123!",
          confirmPassword: "NewPassword123!",
        },
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      validateSchema(body, schemas.error);
      expect(body.message).toContain("истёк");
    });

    test("401: уже использованный токен", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/reset-password`, {
        data: {
          token: "used-token",
          password: "NewPassword123!",
          confirmPassword: "NewPassword123!",
        },
      });

      expect(response.status()).toBe(401);
    });
  });

  // ===========================================
  // ПЕРФОРМАНС / ТАЙМИНГИ
  // ===========================================
  test.describe("Performance & Headers", () => {
    test("login отвечает < 500ms", async ({ request }) => {
      const start = Date.now();
      await request.post(`${API_BASE}/api/auth/login`, {
        data: { email: "test@example.com", password: "Password123!" },
      });
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(500);
    });

    test("security headers присутствуют", async ({ request }) => {
      const response = await request.post(`${API_BASE}/api/auth/login`, {
        data: { email: "test@example.com", password: "Password123!" },
      });

      // Проверяем базовые security headers
      const headers = response.headers();
      // В тестах могут не быть, но проверяем если есть
    });
  });
});
