# Подключение API `tags` к мобильному приложению — пошагово

Документ описывает, что было сделано, чтобы добавить в макет работу с ресурсом
`/tags` из фейкового API `https://api.fake-rest.refine.dev/`.

---

## 0. Что из себя представляет проект

- Это **Expo / React Native** приложение (Expo SDK 57, Expo Router, TypeScript).
- Экраны лежат в папке `src/app/`: каждый файл там — отдельный экран (маршрут).
  - `src/app/index.tsx` — вкладка **Home** (список пользователей из `/users`);
  - `src/app/explore.tsx` — вкладка **Explore** (шаблонный экран Expo);
  - `src/app/_layout.tsx` — корневой layout, подключает вкладки.
- Работа с сетью лежит в папке `src/api/`:
  - `client.ts` — общий экземпляр **axios** с базовым адресом
    `https://api.fake-rest.refine.dev`;
  - `users.ts` — функции для ресурса `/users` (по образцу этого файла сделан `tags.ts`);
  - `secureStore.ts` — сохранение и чтение токена через `expo-secure-store`.
- Вкладки (нижнее меню) описаны в двух файлах:
  - `src/components/app-tabs.tsx` — для iOS и Android (нативные вкладки);
  - `src/components/app-tabs.web.tsx` — для веб-версии (Expo сам выбирает файл `.web.tsx` в браузере).

---

## 1. Изучение API `tags`

Сначала проверил, какие данные возвращает API:

```bash
curl https://api.fake-rest.refine.dev/tags
```

Ответ — массив объектов вида:

```json
[
  { "id": 1, "title": "Nam Alias Ut" },
  { "id": 2, "title": "Et Eum Hic" }
]
```

У тега всего два поля: `id` (число) и `title` (строка).

API устроен по REST (как json-server) и поддерживает такие запросы:

| Метод    | Адрес        | Что делает                 |
|----------|--------------|----------------------------|
| `GET`    | `/tags`      | список всех тегов          |
| `GET`    | `/tags/:id`  | один тег по id             |
| `POST`   | `/tags`      | создать тег `{ title }`    |
| `PATCH`  | `/tags/:id`  | изменить тег `{ title }`   |
| `DELETE` | `/tags/:id`  | удалить тег                |

Каждый метод проверил вручную через `curl`: тестовый тег создал, переименовал и
удалил. Все запросы вернули код 200/201.

> Это фейковое API: изменения на сервере временные и через какое-то время сбрасываются.

---

## 2. Новый файл `src/api/tags.ts` — функции для работы с API

**Где:** `src/api/tags.ts` (новый файл, рядом с `users.ts`).

**Что внутри:**

1. Интерфейс `Tag` описывает тип данных тега:
   ```ts
   export interface Tag {
     id: number;
     title: string;
   }
   ```
2. Пять функций, по одной на каждый запрос. Все используют общий `apiClient`
   из `client.ts`, поэтому базовый адрес, таймаут и заголовки повторно не настраиваются:

   | Функция                  | Запрос                 |
   |--------------------------|------------------------|
   | `getTags()`              | `GET /tags`            |
   | `getTagById(id)`         | `GET /tags/:id`        |
   | `createTag(title)`       | `POST /tags`           |
   | `updateTag(id, title)`   | `PATCH /tags/:id`      |
   | `deleteTag(id)`          | `DELETE /tags/:id`     |

Стиль такой же, как в `users.ts`: стрелочные `async`-функции, которые возвращают
ответ axios. Сами данные лежат в `response.data`.

---

## 3. Новый экран `src/app/tags.tsx` — вкладка «Теги»

**Где:** `src/app/tags.tsx` (новый файл). Expo Router автоматически превращает
его в маршрут `/tags`.

**Что делает экран:**

1. **Загружает список при открытии.** Внутри `useEffect` вызывается `loadTags()`,
   она вызывает `getTags()` и кладёт результат в состояние `tags`.
2. **Показывает индикатор загрузки** (`ActivityIndicator`), пока идёт запрос.
3. **Выводит теги списком** в `ScrollView`. Каждая строка — это номер `#id`,
   название `title` и круглая кнопка **✕**.
4. **Добавляет тег.** Есть поле ввода (`TextInput`) и кнопка «Добавить».
   При нажатии (или по Enter) вызывается `createTag(title)`. Новый тег, который
   вернул сервер, добавляется в конец списка, а поле очищается.
5. **Удаляет тег.** Кнопка ✕ вызывает `deleteTag(id)`, после успешного ответа
   тег убирается из списка.
6. **Обрабатывает ошибки.** Если запрос не прошёл, показывается красный текст
   с ошибкой. Если нажать на него, список загрузится заново.

**Состояние экрана (`useState`):**
- `tags` — массив тегов;
- `loading` — идёт ли загрузка;
- `error` — текст ошибки или `null`;
- `newTitle` — текст в поле ввода.

**Оформление:** использованы готовые компоненты проекта `ThemedText` и
`ThemedView`, константы `Spacing`, `MaxContentWidth`, `BottomTabInset` из
`src/constants/theme.ts` и хук `useTheme()`. Благодаря этому экран сам
поддерживает светлую и тёмную тему и выглядит так же, как остальные экраны.

---

## 4. Добавление вкладки «Tags» в нижнее меню

### 4.1. `src/components/app-tabs.tsx` (iOS / Android)

Между вкладками `index` (Home) и `explore` добавлен новый `NativeTabs.Trigger`:

```tsx
<NativeTabs.Trigger name="tags">
  <NativeTabs.Trigger.Label>Tags</NativeTabs.Trigger.Label>
  <NativeTabs.Trigger.Icon
    src={require('@/assets/images/tabIcons/explore.png')}
    renderingMode="template"
  />
</NativeTabs.Trigger>
```

`name="tags"` должен совпадать с именем файла `src/app/tags.tsx`.
Отдельной иконки для тегов в проекте нет, поэтому временно используется
`explore.png`. Если нужна своя иконка, положите `tags.png`, `tags@2x.png` и
`tags@3x.png` в `assets/images/tabIcons/` и поменяйте путь в `require(...)`.

### 4.2. `src/components/app-tabs.web.tsx` (веб)

Между Home и Explore добавлена кнопка:

```tsx
<TabTrigger name="tags" href="/tags" asChild>
  <TabButton>Tags</TabButton>
</TabTrigger>
```

---

## 5. Исправление ошибки в `client.ts` и `secureStore.ts`

При проверке в браузере приложение падало с ошибкой
`ExpoSecureStore.default.getValueWithKeyAsync is not a function`. Ошибка была
в коде до моих изменений и ломала **все** экраны, включая Home. Причин две:

1. `expo-secure-store` **не работает в вебе**, он есть только на iOS и Android.
2. В интерцепторе запросов `client.ts` токен читался через `getToken().then(...)`
   **без `await`**. Поэтому запрос уходил раньше, чем добавлялся заголовок
   `Authorization`, а ошибка внутри промиса никак не обрабатывалась.

**Что изменено:**

- `src/api/secureStore.ts` — в `getToken()` и `saveToken()` добавлена проверка
  `if (Platform.OS === "web") return;`. В вебе secure store не вызывается.
- `src/api/client.ts` — интерцептор стал `async`, и токен теперь читается через
  `await getToken()`. Заголовок `Authorization` гарантированно добавляется до
  отправки запроса.

---

## 6. Проверка

1. `npm install` — установлены зависимости.
2. `npx tsc --noEmit` — проверка типов TypeScript прошла **без ошибок**.
3. `npx expo start --web` — приложение запущено в браузере в мобильном размере
   экрана (375×812):
   - вкладка **Tags** появилась в меню между Home и Explore;
   - список из 10 тегов загружается с сервера;
   - добавил тег «Claude test»: он появился в списке под номером #11;
   - нажал ✕: тег удалился из списка и с сервера (проверено через `curl`);
   - вкладка **Home** (список пользователей) тоже снова работает в вебе.

---

## 7. Обновление репозитория

```bash
git add src/api/tags.ts src/app/tags.tsx src/api/client.ts src/api/secureStore.ts \
        src/components/app-tabs.tsx src/components/app-tabs.web.tsx TAGS_API.md
git commit -m "Add tags API and Tags screen"
git push origin main
```

---

## Итог: список изменённых файлов

| Файл                               | Статус    | Что сделано                                    |
|------------------------------------|-----------|------------------------------------------------|
| `src/api/tags.ts`                  | новый     | тип `Tag` и 5 функций для запросов к `/tags`   |
| `src/app/tags.tsx`                 | новый     | экран «Теги»: список, добавление, удаление     |
| `src/components/app-tabs.tsx`      | изменён   | вкладка Tags для iOS и Android                 |
| `src/components/app-tabs.web.tsx`  | изменён   | вкладка Tags для веба                          |
| `src/api/client.ts`                | изменён   | интерцептор ждёт токен (`await`)               |
| `src/api/secureStore.ts`           | изменён   | не вызывает SecureStore в вебе                 |
| `TAGS_API.md`                      | новый     | эта инструкция                                 |

## Как запустить у себя

```bash
npm install
npx expo start
```

Дальше нажмите `w`, чтобы открыть веб-версию, или отсканируйте QR-код в Expo Go
на телефоне и перейдите на вкладку **Tags**.
