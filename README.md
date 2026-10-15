# easyworkup-web

Фронтенд EasyWorkUp — Next.js (App Router), Tailwind, react-hook-form + Zod, React Query, React Flow (дерево роадмапа), Monaco Editor (live-кодинг).

> На GitHub этот код живёт в репозитории `easyworkup/Frontend` (историческое название, менять не стали, чтобы не рвать ссылки/клоны).

Полное техническое задание и дизайн — в документе проекта и в мокапе экранов.

## Контракт с бэком: без общего пакета, через генерацию

Раньше типы/валидация шарились через монорепо и пакет `shared`. Сейчас `easyworkup-api` и `easyworkup-web` — два независимых репозитория, а связь между ними держится на генерации из OpenAPI:

```bash
pnpm codegen
```

Команда (обёртка над `orval`, см. `orval.config.ts`) берёт спеку с `API_OPENAPI_URL` (по умолчанию — локальный дев-сервер бэка, `http://localhost:4000/api-json`) и кладёт в `src/shared/api/generated/`:

- `client/` — typed-хуки React Query (`useResumesFindOne`, `useRoadmapsCreate` и т.п.);
- `zod/` — Zod-схемы, которые можно переиспользовать в `react-hook-form` через `@hookform/resolvers/zod` для валидации форм тем же контрактом, что и на бэке.

`src/shared/api/generated/` не хранится в git — перегенерируйте после каждого изменения DTO на бэке (или после обновления `easyworkup-api`).

## Структура: shared-слой

Проект постепенно переходит на слоистую архитектуру в духе [Feature-Sliced Design](https://feature-sliced.design/): экраны и бизнес-логика будут жить в `entities/`, `features/`, `widgets/` по мере реализации мокапа, а переиспользуемый фундамент — в `src/shared/`:

```
src/shared/
  ui/       — UI-кит без бизнес-логики: Button, Card/CardHighlight/CardRow, Badge/CornerBadge,
              PillTabs (+fullWidth), SegmentedLinkTabs, TopNav, SidebarLinkNav, SubHeaderBar,
              StepList, StatPill, StatCard, ProgressBar, Callout, CenteredIntro,
              TextField/TextAreaField, IconBadge, BackLink, Divider
  api/      — apiFetch (мутатор orval), QueryProvider + createQueryClient, generated/ (codegen)
  lib/      — cn() (clsx + tailwind-merge), formatHours/formatPercent/scoreBand
  config/   — site.ts: название продукта, пункты навигации (PRIMARY_NAV)
```

Токены дизайна (`bg`, `surface`, `border`, `text`, `text-soft`, `accent`, `accent-soft`, `accent-dark`, `warn`/`warn-soft`, `ok`/`ok-soft`, `danger`/`danger-soft`) заведены в `tailwind.config.ts` один в один с CSS-переменными мокапа — компоненты `shared/ui` используют только их, без хардкода цветов. Импортировать — через публичный API слоя: `import { Button, Card } from "@/shared/ui"`, `import { apiFetch, QueryProvider } from "@/shared/api"`, а не напрямую по файлам.

Специфичные для экранов вещи (узел роадмапа со статусами, карточка вопроса собеседования, чат-пузырь с разбором по STAR) в shared не идут — это будущие `entities`/`features`, собранные поверх этого UI-кита.

## Быстрый старт

```bash
pnpm install
cp .env.example .env.local
# easyworkup-api должен быть запущен локально на :4000
pnpm codegen
pnpm dev
```

Фронт: http://localhost:3000

## Разработка в команде

- Коммиты — [Conventional Commits](https://www.conventionalcommits.org/), проверяются commitlint'ом. Перед коммитом husky прогоняет eslint+prettier (с сортировкой Tailwind-классов) на изменённых файлах — см. `CONTRIBUTING.md`.
- CI (`.github/workflows/ci.yml`): lint → build на каждый push/PR в `main`; отдельный job деплоит на прод через Coolify-вебхук (секрет `COOLIFY_DEPLOY_WEBHOOK`, пока не задан — деплой пропускается). Автоматический codegen из спеки бэка в CI пока не подключён — см. TODO в workflow.
- Dependabot обновляет зависимости и версии GitHub Actions еженедельно.
- Шаблоны PR и issue — в `.github/`.

## Статус

Каркас: лендинг с тремя модулями (Резюме / Роадмап / Собеседования), дизайн-токены из мокапа в `tailwind.config.ts`, codegen настроен, shared-слой (UI-кит + api + lib + config, см. выше) готов. Экраны из мокапа поверх него — впереди.
