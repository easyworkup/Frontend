# Генерация API-клиента — KAN-8

`api/openapi.json` и `api/openapi-source.json` — зафиксированная пара из конкретного backend commit. Сгенерированный код не коммитится. После установки зависимостей: `pnpm verify:contract`, `pnpm codegen`, `pnpm typecheck`, `pnpm test:contract`.

Контракт описывает целевой MVP; `x-implementation: planned` означает, что бизнес-эндпоинт ещё предстоит реализовать. До завершения соответствующих backend задач используйте fixtures из OpenAPI examples и mock transport, не выдавайте TODO-ответы за реальные данные.

Интегратор скачивает оба файла из одного успешного backend CI артефакта `openapi-<SHA>`, заменяет пару в api/ и создаёт PR в dev. Checksum и dirty=false проверяются до codegen. Исходный SHA и версия видны в manifest; не брать произвольный live API для CI. Локально можно указать API_OPENAPI_URL на другой файл; API_OPENAPI_MANIFEST должен указывать на его manifest. Не публиковать грязный локальный snapshot.

Результат: `src/shared/api/generated/client/<tag>/` — запросы и React Query hooks, `models/` — типы, `zod/<tag>/` — валидаторы. Не редактировать generated. Импортировать конкретный домен. Например, createResume(body, { headers: { 'Idempotency-Key': uuid, Authorization: 'Bearer ...' } }). Обязательные заголовки отмечены в контракте; Orval передаёт их через RequestInit, отдельного типизированного аргумента для них нет.

NEXT_PUBLIC_API_URL задаёт origin API; старый формат с /api также поддержан. apiFetch сохраняет AbortSignal, Headers, credentials, не дублирует /api, не пытается разобрать JSON для 204. Ошибка транспорта — ApiError со status и body: unknown, тело проверяется Zod перед использованием. Не выводить неизвестный ответ сервера как HTML.

Автоматический refresh/хранилище токена/CSRF, общий QueryClient и live SSE ещё не реализованы: это задачи KAN-111/KAN-113 и соответствующие интеграции. Сгенерированный SSE метод возвращает весь текст после закрытия потока; живой UI должен использовать отдельный fetch-stream parser. Контракт StreamEvent задаёт формат сообщений.

`tests/consumer.contract.ts` компилирует реальные сценарии использования ответов. Добавляйте сюда новые зависимости UI от API — backend CI проверяет именно этот потребитель на закреплённом SHA Frontend. Тесты транспорта вызывают настоящий сгенерированный метод с подменой сети. Это не end-to-end тест бизнес-функций.

Изменения fetcher/orval/contracts/CI делает интегратор; остальные разработчики меняют только свой feature model/api слой и UI. Обновлять контракт отдельным PR, чтобы не смешивать generated/config с версткой.
