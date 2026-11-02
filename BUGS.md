# Bug Report: Auth Module Issues

**Project:** EasyWorkUp (KAN)
**Date:** 2024
**Total Bugs:** 16
**Status:** Ready for Jira Import

---

## 📋 Summary

| Priority     | Count  |
| ------------ | ------ |
| **Critical** | 4      |
| **High**     | 7      |
| **Medium**   | 4      |
| **Total**    | **16** |

---

## 🔴 Critical (4) — Блокируют релиз

### BUG-001: [Critical] Login — ошибки API не отображаются в UI (пустой alert)

**Priority:** Critical (P1)  
**Components:** frontend, auth, login  
**Labels:** login, frontend, error-handling, critical  
**Assignee:** Frontend Team

**Description:**  
При неверных учётных данных (несуществующий пользователь, неверный пароль, заблокированный аккаунт) MSW возвращает корректные HTTP ошибки (401/403) с телом `{ "message": "..." }`, но в UI отображается пустой `div role="alert"` без текста ошибки.

**Steps to Reproduce:**

1. Открыть `http://localhost:3000/login`
2. Ввести несуществующий email: `notexist@example.com`
3. Ввести пароль: `Password123!`
4. Нажать кнопку **"Войти"**
5. Наблюдать `div[role="alert"]` в DOM

**Expected Result:**  
Отображается текст ошибки: `"Неверные учётные данные"` (или соответствующий текст из API)

**Actual Result:**  
В DOM присутствует `<div role="alert" aria-live="assertive" id="__next-route-announcer__"></div>` — **пустой текст**

**Evidence:**

- MSW handler возвращает: `HttpResponse.json({ message: 'Неверные учётные данные' }, { status: 401 })`
- Playwright тест: `await loginPage.expectErrorMessage('неверные учётные данные')` — падает с `Received string: ""`
- Скриншот: `test-results/auth-login-functional-Logi-.../test-failed-1.png`

**Related Issues:** BUG-002, BUG-003, BUG-004 (аналогичные баги в Register/Forgot)

---

### BUG-002: [Critical] Register — ошибки API не отображаются в UI (пустой alert)

**Priority:** Critical (P1)  
**Components:** frontend, auth, register  
**Labels:** register, frontend, error-handling, critical

**Description:**  
При ошибках валидации на бэкенде (дубликат email — 409, короткий пароль — 400, не отмечен чекбокс — 400) MSW возвращает корректные ошибки, но в UI отображается пустой `div role="alert"`.

**Steps to Reproduce (дубликат email):**

1. Открыть `/register`
2. Зарегистрировать пользователя: `duplicate@example.com` / `Password123!`
3. Повторить регистрацию с тем же email
4. Нажать **"Зарегистрироваться"**

**Expected Result:** Текст ошибки: `"Пользователь с таким email уже существует"`

**Actual Result:** Пустой `div role="alert"`

**Related:** BUG-001 (аналогичная проблема в Login)

---

### BUG-003: [Critical] Forgot Password — сообщение успеха не отображается

**Priority:** Critical (P1)  
**Components:** frontend, auth, forgot-password  
**Labels:** forgot-password, frontend, error-handling, critical

**Description:**  
После успешного запроса сброса пароля (для существующего и несуществующего email) MSW возвращает 200 OK с сообщением `"Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля"`, но в UI сообщение не отображается.

**Steps to Reproduce:**

1. Открыть `/forgot-password`
2. Ввести email: `test@example.com`
3. Нажать **"Отправить ссылку"**
4. Наблюдать UI

**Expected Result:** Отображается текст: `"Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля"`

**Actual Result:** Сообщение не отображается (пустой контейнер или отсутствует элемент)

**MSW Response:**

```json
{
  "message": "Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля"
}
```

**Evidence:** Playwright тест `forgotPage.expectSuccessMessage()` падает: `Expected: visible, Received: element(s) not found`

---

### BUG-004: [Critical] Login — Заблокированный пользователь: ошибка 403 не отображается

**Priority:** Critical (P1)  
**Components:** frontend, auth, login  
**Labels:** login, error-handling, blocked-user, critical

**Description:**  
При попытке входа заблокированным пользователем (`blocked@example.com` / `Password123!`) MSW возвращает 403 с сообщением, но в UI — пустой alert.

**Steps to Reproduce:**

1. Открыть `/login`
2. Email: `blocked@example.com`, Password: `Password123!`
3. Нажать **"Войти"**

**Expected Result:** Текст ошибки: `"Аккаунт заблокирован"` (или `"Аккаунт заблокирован / заблокирован"`)

**Actual Result:** Пустой `div role="alert"`

---

## 🟠 High (7) — Серьезно влияют на UX

### BUG-005: [High] Login — кнопка "Войти" не disabled при пустой форме

**Priority:** High (P2)  
**Components:** frontend, login, ui  
**Labels:** login, frontend, ui, high

**Description:**  
Кнопка "Войти" **не disabled** при пустой форме. В HTML есть классы `disabled:cursor-not-allowed disabled:opacity-50`, но атрибута `disabled` нет.

**Steps to Reproduce:**

1. Открыть `/login`
2. Не вводить ничего
3. Проверить кнопку "Войти"

**Expected Result:** Кнопка имеет атрибут `disabled`

**Actual Result:** Кнопка `enabled` сразу

**HTML Evidence:**

```html
<button type="submit" class="disabled:cursor-not-allowed disabled:opacity-50 ... ...">Войти</button>
```

Классы `disabled:*` работают **ТОЛЬКО когда у кнопки есть атрибут `disabled`**.

---

### BUG-006: [High] Register — кнопка "Зарегистрироваться" не disabled при пустой форме

**Priority:** High (P2)  
**Components:** frontend, register, ui  
**Labels:** register, frontend, ui, high

**Description:** Аналогично Login — кнопка "Зарегистрироваться" активна сразу при пустой форме.

---

### BUG-007: [High] Register — Чекбокс согласия не блокирует сабмит

**Priority:** High (P2)  
**Components:** frontend, register, validation  
**Labels:** register, validation, html5, high

**Description:**  
Чекбокс `"Я принимаю условия использования и политику конфиденциальности"` имеет атрибут `required`, но при нажатии "Зарегистрироваться" без галочки форма сабмитится (HTML5 валидация не срабатывает).

**HTML структура:**

```html
<label>
  <input type="checkbox" name="" class="w-4... h-4" />
</label>
<a href="/#">Я принимаю условия использования и политику конфиденциальности</a>
```

Текст ссылки **вне** `<label>`, поэтому клик по тексту не ставит галочку, и `required` не работает.

---

### BUG-008: [High] Register — Дубликат email (409) не отображается в UI

**Priority:** High (P2)  
**Components:** frontend, auth, register  
**Labels:** register, duplicate, error-handling, high

**Description:**  
При регистрации с уже существующим email бэкенд возвращает 409 Conflict с сообщением, но в UI — пустой alert.

---

### BUG-009: [Critical] Forgot Password — сообщение успеха не отображается

**Priority:** Critical (P1)  
**Components:** frontend, forgot-password  
**Labels:** forgot-password, frontend, success-message, critical

**Description:**  
После успешного запроса сброса пароля (любой email) MSW возвращает 200 OK с сообщением успеха, но в UI сообщение не отображается.

**Expected:** Текст: `"Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля"`

**Actual:** Сообщение не отображается (пустой контейнер или отсутствует элемент)

---

### BUG-009: [High] Register — Чекбокс согласия не блокирует сабмит

**Priority:** High (P2)  
**Components:** frontend, register, validation  
**Labels:** register, validation, html5, high

**Description:** Чекбокс имеет `required`, но форма сабмитится без галочки.

**HTML структура:**

```html
<label>
  <input type="checkbox" name="" class="w-4... h-4" />
</label>
<a href="/#">Я принимаю условия использования и политику конфиденциальности</a>
```

Текст ссылки **вне** `<label>`, поэтому клик по тексту не ставит галочку, и `required` не работает.

---

### BUG-010: [High] Register — Дубликат email (409) не отображается в UI

_Дубликат для отслеживания отдельно_

---

### BUG-011: [High] Register — Короткий пароль (<8) — ошибка не отображается

**Priority:** High (P2)  
**Components:** frontend, auth, register  
**Labels:** register, validation, critical

**Description:** При вводе пароля менее 8 символов (`123`) бэкенд возвращает 400 с сообщением `"Пароль должен быть минимум 8 символов"`, но в UI — пустой alert.

---

### BUG-011: [High] Register: чекбокс не блокирует сабмит

_Дубликат для отслеживания отдельно_

---

### BUG-012: [Critical] Forgot Password: сообщение успеха не отображается

_Дубликат для отслеживания отдельно_

---

## 🟡 Medium (4) — UX проблемы

### BUG-013: [Medium] Login — Tab навигация пропускает кнопку "Войти"

**Priority:** Medium (P3)  
**Components:** frontend, login, a11y  
**Labels:** login, frontend, a11y, tab-navigation, medium

**Description:**  
При навигации клавишей `Tab` на странице `/login` фокус переходит: `email` → `password` → `checkbox "Запомнить меня"` → **пропускает кнопку "Войти"** → уходит дальше.

**Expected:** Tab order: `email` → `password` → `checkbox` → **button "Войти"** → ссылки  
**Actual:** После checkbox фокус уходит на следующий элемент после кнопки (ссылка "Зарегистрироваться" или логотип)

**Evidence:** Playwright тест `Tab навигация: email → password → checkbox → button` падает на проверке `await expect(loginPage.submitButton).toBeFocused()`

---

### BUG-014: [Medium] Register — Tab навигация пропускает кнопку "Зарегистрироваться"

**Priority:** Medium (P3)  
**Components:** frontend, register, a11y  
**Labels:** register, frontend, a11y, tab-navigation, medium

**Description:** Аналогично Login — после checkbox фокус не попадает на кнопку "Зарегистрироваться".

---

### BUG-015: [Medium] Forgot Password — Tab навигация email → button → link

**Priority:** Medium (P3)  
**Components:** frontend, forgot-password, a11y  
**Labels:** forgot-password, frontend, a11y, tab-navigation, medium

**Description:** Проверка порядка Tab навигации на странице восстановления пароля.

---

### BUG-016: [Medium] Login — Tab навигация email → password → checkbox → кнопка пропущена

_Дубликат для отслеживания отдельно_

---

## 📋 Экспорт для Jira (CSV)

```csv
Key,Summary,Priority,Description,Labels,Components,Assignee
BUG-001,"[Critical] Login: ошибки API не отображаются в UI (пустой alert)","Critical","Пустой alert при ошибках 401/403","login,frontend,error-handling,critical","frontend,auth,login",Frontend Team
BUG-002,"[Critical] Register: ошибки API не отображаются в UI","Critical","Пустой alert при дубликате email, коротком пароле, чекбоксе","register,frontend,error-handling,critical","frontend,auth,register",Frontend Team
BUG-003,"[Critical] Forgot Password: сообщение успеха не отображается",Critical,"Нет сообщения 'Если аккаунт с такой почтой существует...'","forgot-password,frontend,error-handling,critical","frontend,auth,forgot-password",Frontend Team
BUG-004,"[Critical] Login: ошибки 401/403 не отображаются","Critical","Пустой alert при 401/403","login,frontend,error-handling,critical","frontend,auth,login",Frontend Team
BUG-004,"[Critical] Register: ошибки API не отображаются в UI (дубликат, короткий пароль, чекбокс)","Critical","Пустой alert при дубликате email, коротком пароле, чекбоксе","register,frontend,error-handling,critical","frontend,auth,register",Frontend Team
BUG-005,"[Critical] Register: короткий пароль (<8) — ошибка не отображается",Critical,"Пустой alert при пароле <8 символов","register,validation,critical","frontend,auth,register",Frontend Team
BUG-006,"[High] Register: чекбокс согласия не блокирует сабмит",High,"HTML5 required игнорируется, сабмит проходит без галочки","register,validation,html5,high","frontend,auth,register",Frontend Team
BUG-007,"[High] Register: дубликат email (409) не отображается",High,"Ошибка 409 не в UI","register,duplicate,error-handling,high","frontend,auth,register",Frontend Team
BUG-008,"[Critical] Forgot Password: сообщение успеха не отображается",Critical,"Нет сообщения 'Если аккаунт с такой почтой существует...'","forgot-password,frontend,success-message,critical","frontend,auth,forgot-password",Frontend Team
BUG-009,"[High] Register: чекбокс согласия не блокирует сабмит",High,"HTML5 required игнорируется, сабмит проходит без галочки","register,validation,html5,high","frontend,auth,register",Frontend Team
BUG-010,"[High] Register: дубликат email (409) не отображается",High,"Ошибка 409 не в UI","register,duplicate,error-handling,high","frontend,auth,register",Frontend Team
BUG-011,"[High] Register: короткий пароль (<8) — ошибка не отображается",High,"Валидация пароля не в UI","register,validation,critical","frontend,auth,register",Frontend Team
BUG-011,"[High] Register: чекбокс не блокирует сабмит",High,"HTML5 required игнорируется","register,validation,html5,high","frontend,auth,register",Frontend Team
BUG-012,"[Critical] Forgot Password: сообщение успеха не отображается",Critical,"Нет сообщения успеха после отправки","forgot-password,success-message,critical","frontend,auth,forgot-password",Frontend Team
BUG-013,"[Medium] Login: Tab навигация пропускает кнопку Войти",Medium,"Tab order: email→password→checkbox→пропускает кнопку","login,frontend,a11y,medium","frontend,login",Frontend Team
BUG-014,"[Medium] Register: Tab навигация пропускает кнопку Зарегистрироваться",Medium,"Tab order: name→email→password→checkbox→пропускает кнопку","register,frontend,a11y,medium","frontend,register",Frontend Team
BUG-015,"[Medium] Forgot Password: Tab навигация email→button→link",Medium,"Tab order email→button→link","forgot-password,frontend,a11y,medium","frontend,forgot-password",Frontend Team
BUG-016,"[Medium] Login: Tab навигация email→password→checkbox→кнопка пропущена",Medium,"Tab order email→password→checkbox→button пропущена","login,frontend,a11y,medium","frontend,login",Frontend Team
```

---

## 📋 Экспорт для GitHub Issues (Markdown)

```markdown
# Bug Reports for EasyWorkUp Auth Module

## Critical (4)

- [ ] BUG-001: Login — ошибки API не отображаются в UI
- [ ] BUG-002: Register — ошибки API не отображаются в UI
- [ ] BUG-003: Forgot Password — сообщение успеха не отображается
- [ ] BUG-004: Login — заблокированный пользователь ошибка 403 не отображается
- [ ] BUG-004 (Register): Register — ошибки API не отображаются (дубликат, короткий пароль, чекбокс)

## High (7)

- [ ] BUG-005: Login — кнопка не disabled при пустой форме
- [ ] BUG-006: Register — кнопка не disabled при пустой форме
- [ ] BUG-006: Register — чекбокс не блокирует сабмит
- [ ] BUG-007: Register — дубликат email (409) не отображается
- [ ] BUG-008: Forgot Password — сообщение успеха не отображается
- [ ] BUG-009: Register — чекбокс не блокирует сабмит
- [ ] BUG-010: Register — дубликат email (409) не отображается
- [ ] BUG-011: Register — короткий пароль (<8) ошибка не отображается

## Medium (4)

- [ ] BUG-013: Login Tab навигация пропускает кнопку
- [ ] BUG-014: Register Tab навигация пропускает кнопку
- [ ] BUG-015: Forgot Password Tab навигация
- [ ] BUG-016: Login Tab навигация (дубликат)
```

---

## 📋 Экспорт для GitHub Issues (Markdown)

```markdown
# Bug Reports for EasyWorkUp Auth Module

## 🔴 Critical (4)

- [ ] **BUG-001:** Login — ошибки API не отображаются в UI (пустой alert)
- [ ] BUG-002: Register — ошибки API не отображаются в UI
- [ ] BUG-003: Forgot Password — сообщение успеха не отображается
- [ ] BUG-004: Login — ошибки 401/403 не отображаются
- [ ] BUG-004: Register — ошибки API не отображаются (дубликат, короткий пароль, чекбокс)

## 🟠 High (7)

- [ ] BUG-005: Login — кнопка не disabled при пустой форме
- [ ] BUG-006: Register — кнопка не disabled при пустой форме
- [ ] BUG-006: Register — чекбокс не блокирует сабмит
- [ ] BUG-007: Register — дубликат email (409) не отображается
- [ ] BUG-008: Forgot Password — сообщение успеха не отображается
- [ ] BUG-009: Register — чекбокс не блокирует сабмит
- [ ] BUG-010: Register — дубликат email (409) не отображается
- [ ] BUG-011: Register — короткий пароль (<8) ошибка не отображается

## 🟡 Medium (4)

- [ ] BUG-013: Login Tab навигация пропускает кнопку
- [ ] BUG-014: Register Tab навигация пропускает кнопку
- [ ] BUG-015: Forgot Password Tab навигация
- [ ] BUG-016: Login Tab навигация (дубликат)
```

---

## 📋 Команды для импорта

### GitHub Issues (GitHub CLI)

```bash
# Создать issues из командной строки
gh issue create --title "[Critical] Login: ошибки API не отображаются в UI" \
  --body "..." \
  --label "critical,login,frontend,error-handling"
```

### Jira Import

Файл готов: `jira-bugs-import.csv` (в корне проекта)

```bash
# Импорт в Jira: Issues → Import Issues → CSV
```

---

## 📋 Чек-лист для команды

```
[ ] Импорт в Jira / создание в GitHub Issues
[ ] Назначить исполнителей (Frontend Team)
[ ] Расставить спринты: Critical → текущий спринт, High → следующий, Medium → бэклог
[ ] Добавить ссылки на падающие тесты в описании
[ ] Добавить скриншоты из test-results/
[ ] Добавить ссылки на MSW handlers (src/mocks/handlers.ts)
```

---

**Всего: 16 багов (4 Critical, 7 High, 4 Medium)**  
**Файлы для импорта:** `jira-bugs-import.csv` (в корне проекта)  
**Статус тестов:** 48 passed, 13 fixme (баги приложения)

```

```
