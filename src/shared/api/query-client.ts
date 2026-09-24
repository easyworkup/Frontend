import { QueryClient } from "@tanstack/react-query";

/**
 * Общие дефолты React Query для всего приложения. staleTime не нулевой,
 * чтобы переключение между Резюме/Роадмапом/Собеседованиями в шапке не
 * дёргало API повторно без необходимости — экранам, которым нужна более
 * свежая выдача (например, статус во время live-сессии собеседования),
 * стоит переопределять staleTime точечно в своём хуке.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
