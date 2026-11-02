// src/mocks/data.ts
// Моковые данные для Auth API

export interface MockUser {
  id: string;
  email: string;
  password: string; // в реальности — хеш
  fullName?: string;
  field?: string;
  directionId?: string;
  isActive: boolean;
  createdAt: string;
}

// Моковые пользователи
export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    email: "test@example.com",
    password: "Password123!",
    fullName: "Test User",
    field: "it",
    directionId: "frontend",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    email: "blocked@example.com",
    password: "Password123!",
    fullName: "Blocked User",
    isActive: false, // заблокирован
    createdAt: "2024-02-01T10:00:00Z",
  },
];

// Генерация токенов
export function generateTokens(user: MockUser) {
  return {
    accessToken: `mock-access-token-${user.id}-${Date.now()}`,
    refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
    expiresIn: 900, // 15 минут
  };
}

// Валидация пароля (имитация bcrypt)
export function verifyPassword(plain: string, hashed: string): boolean {
  // В моке просто сравниваем (в реале — bcrypt.compare)
  return plain === hashed;
}

// Хранилище refresh токенов (в памяти)
export const refreshTokenStore = new Map<string, { userId: string; expiresAt: number }>();

export function saveRefreshToken(userId: string, token: string) {
  refreshTokenStore.set(token, {
    userId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 дней
  });
}

export function validateRefreshToken(token: string): { userId: string } | null {
  const record = refreshTokenStore.get(token);
  if (!record) return null;
  if (Date.now() > record.expiresAt) {
    refreshTokenStore.delete(token);
    return null;
  }
  return { userId: record.userId };
}

export function revokeRefreshToken(token: string) {
  refreshTokenStore.delete(token);
}

// Хранилище reset токенов
export const resetTokenStore = new Map<
  string,
  { email: string; expiresAt: number; used: boolean }
>();

export function createResetToken(email: string): string {
  const token = `reset-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  resetTokenStore.set(token, {
    email,
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 час
    used: false,
  });
  return token;
}

export function validateResetToken(token: string): { email: string } | null {
  const record = resetTokenStore.get(token);
  if (!record) return null;
  if (Date.now() > record.expiresAt) return null;
  if (record.used) return null;
  return { email: record.email };
}

export function markResetTokenUsed(token: string) {
  const record = resetTokenStore.get(token);
  if (record) {
    record.used = true;
  }
}
