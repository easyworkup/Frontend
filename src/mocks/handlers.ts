// src/mocks/handlers.ts
// Обработчики MSW для 6 auth эндпоинтов

import { http, HttpResponse } from "msw";
import {
  mockUsers,
  generateTokens,
  verifyPassword,
  saveRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
  createResetToken,
  validateResetToken,
  markResetTokenUsed,
} from "./data";

// Утилита: задержка для реалистичности
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Утилита: получение пользователя по email
function findUserByEmail(email: string) {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Утилита: проверка авторизации через access token (упрощённо)
function getUserFromAuth(request: Request): { userId: string } | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  // В моке токен = "mock-access-token-{userId}-{timestamp}"
  const match = token.match(/mock-access-token-(.+)-\d+/);
  return match ? { userId: match[1] } : null;
}

export const handlers = [
  // 1. POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    await delay(300); // имитация сети

    const body = (await request.json()) as { email: string; password: string; remember?: boolean };
    const { email, password } = body;

    // Валидация входных данных
    if (!email || !password) {
      return HttpResponse.json({ message: "Email и пароль обязательны" }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return HttpResponse.json({ message: "Неверные учётные данные" }, { status: 401 });
    }

    if (!user.isActive) {
      return HttpResponse.json({ message: "Аккаунт заблокирован" }, { status: 403 });
    }

    if (!verifyPassword(body.password, user.password)) {
      return HttpResponse.json({ message: "Неверные учётные данные" }, { status: 401 });
    }

    // Успешный вход
    const tokens = generateTokens(mockUsers[0]);
    saveRefreshToken(mockUsers[0].id, tokens.refreshToken);

    return HttpResponse.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  }),

  // 2. POST /api/auth/register
  http.post("/api/auth/register", async ({ request }) => {
    await delay(300);

    const body = (await request.json()) as {
      fullName: string;
      email: string;
      password: string;
    };
    const { fullName, email, password } = body;

    // Валидация
    if (!fullName || !email || !password) {
      return HttpResponse.json({ message: "Все поля обязательны" }, { status: 400 });
    }

    if (password.length < 8) {
      return HttpResponse.json(
        { message: "Пароль должен быть минимум 8 символов" },
        { status: 400 }
      );
    }

    // Проверка дубликата email
    if (findUserByEmail(email)) {
      return HttpResponse.json(
        { message: "Пользователь с таким email уже существует" },
        { status: 409 }
      );
    }

    // Создание пользователя (в моке просто возвращаем успех)
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password, // в реале — хеш
      fullName,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    const tokens = generateTokens(newUser);
    saveRefreshToken(newUser.id, tokens.refreshToken);

    return HttpResponse.json(
      {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
        },
      },
      { status: 201 }
    );
  }),

  // 3. POST /api/auth/refresh
  http.post("/api/auth/refresh", async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as { refreshToken: string };
    const { refreshToken } = body;

    if (!refreshToken) {
      return HttpResponse.json({ message: "Refresh token обязателен" }, { status: 400 });
    }

    const validation = validateRefreshToken(refreshToken);
    if (!validation) {
      return HttpResponse.json(
        { message: "Недействительный или истёкший refresh token" },
        { status: 401 }
      );
    }

    const user = mockUsers.find((u) => u.id === validation.userId);
    if (!user || !user.isActive) {
      return HttpResponse.json(
        { message: "Пользователь не найден или заблокирован" },
        { status: 401 }
      );
    }

    // Ротируем refresh token
    revokeRefreshToken(refreshToken);
    const tokens = generateTokens(user);
    saveRefreshToken(user.id, tokens.refreshToken);

    return HttpResponse.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }),

  // 4. POST /api/auth/logout
  http.post("/api/auth/logout", async ({ request }) => {
    await delay(100);

    const body = (await request.json().catch(() => ({}))) as { refreshToken?: string };
    const { refreshToken } = body;

    if (refreshToken) {
      revokeRefreshToken(refreshToken);
    }

    return HttpResponse.json({ message: "Успешный выход" });
  }),

  // 5. POST /api/auth/forgot-password
  http.post("/api/auth/forgot-password", async ({ request }) => {
    await delay(300);

    const body = (await request.json()) as { email: string };
    const { email } = body;

    if (!email) {
      return HttpResponse.json({ message: "Email обязателен" }, { status: 400 });
    }

    const user = findUserByEmail(email);

    // Всегда возвращаем успех (безопасность — не раскрываем существование email)
    if (user) {
      createResetToken(email); // создаём токен сброса
      // В реале: отправка email
      console.log(`[MOCK] Reset email sent to ${email}`);
    }

    return HttpResponse.json({
      message: "Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля",
    });
  }),

  // 6. POST /api/auth/reset-password
  http.post("/api/auth/reset-password", async ({ request }) => {
    await delay(300);

    const body = (await request.json()) as {
      token: string;
      password: string;
      confirmPassword: string;
    };
    const { token, password, confirmPassword } = body;

    if (!token || !password || !confirmPassword) {
      return HttpResponse.json({ message: "Все поля обязательны" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return HttpResponse.json({ message: "Пароли не совпадают" }, { status: 400 });
    }

    if (password.length < 12) {
      return HttpResponse.json(
        { message: "Пароль должен быть минимум 12 символов" },
        { status: 400 }
      );
    }

    const validation = validateResetToken(token);
    if (!validation) {
      return HttpResponse.json({ message: "Ссылка недействительна или истекла" }, { status: 400 });
    }

    const user = findUserByEmail(validation.email);
    if (!user) {
      return HttpResponse.json({ message: "Пользователь не найден" }, { status: 404 });
    }

    // Обновляем пароль (в моке просто помечаем токен использованным)
    markResetTokenUsed(token);
    revokeRefreshToken(user.id); // инвалидируем все сессии

    return HttpResponse.json({
      message: "Пароль успешно обновлён",
    });
  }),
];
