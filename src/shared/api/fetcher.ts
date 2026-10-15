/**
 * Общий fetch-обёртчик, который orval подставляет в сгенерированные хуки
 * (см. orval.config.ts → override.mutator). Здесь — единственное место, где
 * задаётся базовый URL и общая обработка ошибок для всех сгенерированных запросов.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text()}`);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}
