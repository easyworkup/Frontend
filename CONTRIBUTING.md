# Contributing

## Ветки и коммиты

- Ветки: `feature/<кратко>`, `fix/<кратко>`.
- Коммиты — [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`...) — проверяется commitlint при `git commit`.
- Перед коммитом husky прогоняет `lint-staged` (eslint + prettier, с сортировкой Tailwind-классов) на изменённых файлах.

## Контракт с бэком

`src/api/generated/` не хранится в git — это результат `pnpm codegen` (orval) по OpenAPI-спеке `easyworkup-api` (репозиторий `back-end-`). Если бэк поменял DTO — обязательно прогоните `pnpm codegen` заново перед тем, как опираться на новые поля/эндпоинты.

## Локальный запуск

См. `README.md`.

## Pull request

Заполните шаблон PR, дождитесь зелёного CI перед мержем.
