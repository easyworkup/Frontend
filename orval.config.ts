import { defineConfig } from "orval";

/**
 * Источник контракта — OpenAPI-спека easyworkup-api. По умолчанию берём с
 * локального дев-сервера бэка; для CI/прод-сборки переопределяем
 * API_OPENAPI_URL на статичный openapi.json (артефакт CI бэка) или на
 * задеплоенный /api-json.
 */
const input = { target: process.env.API_OPENAPI_URL ?? "http://localhost:4000/api-json" };

export default defineConfig({
  // Typed-клиент на React Query — хуки useXxxQuery/useXxxMutation по каждому эндпоинту.
  easyworkupClient: {
    input,
    output: {
      mode: "tags-split",
      target: "src/api/generated/client",
      client: "react-query",
      httpClient: "fetch",
      override: {
        mutator: {
          path: "src/api/fetcher.ts",
          name: "apiFetch",
        },
      },
    },
  },
  // Zod-схемы из тех же OpenAPI-схем — переиспользуются для валидации форм
  // (react-hook-form + @hookform/resolvers/zod) без ручного дублирования DTO бэка.
  easyworkupZod: {
    input,
    output: {
      mode: "tags-split",
      target: "src/api/generated/zod",
      client: "zod",
    },
  },
});
