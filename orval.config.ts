import { defineConfig } from "orval";

/**
 * По умолчанию используем проверенную пару api/openapi.json + manifest.
 * Backend CI передаёт свой точный артефакт через API_OPENAPI_URL.
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
