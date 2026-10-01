/**
 * Общий fetch-обёртчик, который orval подставляет в сгенерированные хуки
 * (см. orval.config.ts → override.mutator). Здесь — единственное место, где
 * задаётся базовый URL и общая обработка ошибок для всех сгенерированных запросов.
 */
const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000")
  .replace(/\/api\/?$/, "")
  .replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown
  ) {
    super(`API request failed (${status})`);
    this.name = "ApiError";
  }
}

// Orval uses this alias for React Query's error type. body remains unknown until validated.
export type ErrorType<T> = ApiError & { readonly contractError?: T };

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (typeof init?.body === "string" && !headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");
  const res = await fetch(`${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`, {
    credentials: "include",
    ...init,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text);
    } catch {
      /* Proxy may return HTML instead of JSON. */
    }
    throw new ApiError(res.status, body);
  }

  if (res.status === 204) return undefined as T;
  return res.headers.get("content-type")?.includes("application/json")
    ? res.json()
    : ((await res.text()) as T);
}
