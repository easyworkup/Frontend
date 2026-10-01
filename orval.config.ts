import { defineConfig } from "orval";

/**
 * Источник контракта — OpenAPI-спека easyworkup-api. По умолчанию берём с
 * локального дев-сервера бэка; для CI/прод-сборки переопределяем
 * API_OPENAPI_URL на статичный openapi.json (артефакт CI бэка) или на
 * задеплоенный /api-json.
 */
const input = { target: process.env.API_OPENAPI_URL ?? "api/openapi.json" };

export default defineConfig({
  // Typed-клиент на React Query — хуки useXxxQuery/useXxxMutation по каждому эндпоинту.
  easyworkupClient: {
    input,
    output: {
      mode: "tags-split",
      target: "src/shared/api/generated/client/endpoints.ts",
      schemas: "src/shared/api/generated/models",
      clean: true,
      client: "react-query",
      httpClient: "fetch",
      override: {
        fetch: { includeHttpResponseReturnType: false },
        mutator: {
          path: "src/shared/api/fetcher.ts",
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
      target: "src/shared/api/generated/zod/endpoints.ts",
      clean: true,
      client: "zod",
    },
  },
});
