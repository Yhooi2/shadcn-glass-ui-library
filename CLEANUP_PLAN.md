# Cleanup Plan - Legacy Code Removal

Дата: 2025-12-04 Базис: [LEGACY_AUDIT.md](LEGACY_AUDIT.md)

## Фаза 1: Немедленная очистка (Breaking Changes)

### ✅ Задача 1.1: ButtonGlass `danger` → `destructive`

**Приоритет:** 🔥 Критичный (Breaking Change) **Файлы:** 3

#### Чеклист:

- [ ] `src/components/blocks/buttons/page.tsx:57` - заменить `variant="danger"` →
      `variant="destructive"`
- [ ] `src/components/glass/ui/button-glass.stories.tsx:61` - заменить в примере
- [ ] `src/components/glass/ui/button-glass.stories.tsx:182` - заменить в демо
- [ ] Проверить type definitions - удалить `danger` из union type
- [ ] Запустить `npm run lint`
- [ ] Запустить `npm run build`
- [ ] Обновить screenshots: `npm run test:visual:update`
- [ ] Commit: `fix!: replace ButtonGlass 'danger' variant with 'destructive' (breaking)`

**Команда:**

```bash
# 1. Автоматическая замена
rg "variant=\"danger\"" -l | xargs sed -i '' 's/variant="danger"/variant="destructive"/g'

# 2. Проверка
rg "variant=\"danger\"" --files-with-matches

# 3. Проверка типов
npx tsc --noEmit

# 4. Запуск тестов
npm run test
```

---

### ✅ Задача 1.2: Удалить пустые директории

**Приоритет:** ⚡ Высокий **Директорий:** 9

#### Чеклист:

- [ ] `src/components/blocks/progress/components/`
- [ ] `src/components/blocks/form-elements/components/`
- [ ] `src/components/blocks/avatar-gallery/components/`
- [ ] `src/components/blocks/badges/components/`
- [ ] `src/components/blocks/notifications/components/`
- [ ] `src/components/__visual__/__screenshots__/showcase.visual.test.tsx/` (проверить - возможно
      ошибка)
- [ ] `src/components/pages/`
- [ ] `src/stories/`
- [ ] `src/assets/`
- [ ] Commit: `chore: remove empty directories`

**Команда:**

```bash
# Удалить все пустые директории
find src -type d -empty -delete

# Проверка
find src -type d -empty
```

---

## Фаза 2: AlertGlass Migration (Deprecated → Modern)

### ✅ Задача 2.1: Мигрировать AlertGlass `type` → `variant`

**Приоритет:** ⚡ Высокий (57 использований) **Файлы:** 14

#### Подзадачи:

**2.1.1 Visual Tests** (13 использований)

- [ ] `src/components/__visual__/components.visual.test.tsx`
  - `type="info"` → `variant="default"` (4 раза)
  - `type="success"` → `variant="success"` (3 раза)
  - `type="warning"` → `variant="warning"` (3 раза)
  - `type="error"` → `variant="destructive"` (3 раза)

**2.1.2 Unit Tests** (3 использования)

- [ ] `src/components/glass/ui/__tests__/alert-glass.test.tsx`

**2.1.3 Demo Components**

- [ ] `src/components/GlassFixesDemo.tsx` (4 использования)
- [ ] `src/components/blocks/notifications/page.tsx` (7 использований)

**2.1.4 Stories**

- [ ] `src/components/FlagAlertGlass.stories.tsx` (1 использование)
- [ ] `src/components/NotificationGlass.stories.tsx` (8 использований)

**2.1.5 Section Components**

- [ ] `src/components/glass/sections/flags-section-glass.tsx`

**Команда:**

```bash
# Автоматическая замена
sed -i '' 's/type="info"/variant="default"/g' $(rg 'type="info"' -l)
sed -i '' "s/type='info'/variant='default'/g" $(rg "type='info'" -l)

sed -i '' 's/type="error"/variant="destructive"/g' $(rg 'type="error"' -l)
sed -i '' "s/type='error'/variant='destructive'/g" $(rg "type='error'" -l)

sed -i '' 's/type="success"/variant="success"/g' $(rg 'type="success"' -l)
sed -i '' 's/type="warning"/variant="warning"/g' $(rg 'type="warning"' -l)

# Проверка
rg 'AlertGlass.*type=' --files-with-matches

# Тесты
npm run test
npm run test:visual:update
```

#### После завершения:

- [ ] Обновить visual test screenshots
- [ ] Запустить все тесты
- [ ] Commit: `refactor: migrate AlertGlass from 'type' to 'variant' prop`

---

## Фаза 3: NotificationGlass Strategy (Решение)

### ⚠️ Задача 3.1: Принять решение по NotificationGlass

**Приоритет:** 🔶 Средний **Требуется:** Обсуждение с командой

#### Варианты:

**Вариант A: Оставить `type` как есть**

- ✅ Не ломает существующий код (50+ использований)
- ✅ `type` логичен для NotificationGlass (не Alert)
- ❌ Несогласованность с AlertGlass API

**Вариант B: Мигрировать `type` → `variant`**

- ✅ Согласованность с AlertGlass
- ✅ Соответствие shadcn/ui паттернам
- ❌ 50+ использований требуют миграции
- ❌ Potential breaking change

**Вариант C: Добавить alias**

- ✅ Поддержка обоих API
- ✅ Плавная миграция
- ❌ Дублирование API

#### Рекомендация:

**Вариант B: Мигрировать `type` → `variant`**

- ✅ Согласованность с AlertGlass
- ✅ Соответствие shadcn/ui паттернам
- ❌ 50+ использований требуют миграции
- ❌ Potential breaking change

---

## Фаза 4: Modal & Tabs Compound Migration (Migration Guide)

### 📚 Задача 4.1: Создать Migration Guide для ModalGlass

**Приоритет:** 🔶 Средний **Файлов с legacy API:** 7

#### Чеклист:

- [ ] Создать `docs/migration/modal-glass-compound-api.md`
- [ ] Документировать legacy → compound миграцию
- [ ] Добавить code examples (before/after)
- [ ] Добавить performance notes
- [ ] Создать warning banner в legacy API documentation
- [ ] Commit: `docs: add ModalGlass compound API migration guide`

#### Пример содержимого:

```markdown
# ModalGlass Compound API Migration Guide

## Why Migrate?

- Better composition and flexibility
- Follows Radix UI patterns
- More control over layout and styling
- Easier to customize individual parts

## Migration Examples

### Basic Modal

[Before/After examples]

### Modal with Custom Footer

[Before/After examples]

## Timeline

- v3.x: Both APIs supported (current)
- v4.0: Legacy API deprecated (6+ months)
- v5.0: Legacy API removed (12+ months)
```

---

### 📚 Задача 4.2: Создать Migration Guide для TabsGlass

**Приоритет:** 🔶 Средний **Файлов с legacy API:** 3

#### Аналогично задаче 4.1

---

## Фаза 5: SelectGlass → ComboBoxGlass (v4.0 Preparation)

### ⏰ Задача 5.1: Создать план миграции SelectGlass

**Приоритет:** 🔵 Низкий (v4.0) **Затронуто файлов:** 7

#### Чеклист:

- [ ] Создать `docs/migration/select-to-combobox.md`
- [ ] Документировать API differences
- [ ] Создать codemod script для автоматической миграции
- [ ] Добавить deprecation timeline в documentation
- [ ] Обновить README с предупреждением

#### Deprecation Timeline:

- v3.5: Deprecation warning (current) ✅
- v3.9: Last version with SelectGlass
- v4.0: SelectGlass удалён (6-12 months)

---

## Фаза 6: Documentation Updates

### 📝 Задача 6.1: Обновить CLAUDE.md

**Приоритет:** 🔶 Средний

#### Чеклист:

- [ ] Обновить список компонентов (удалить deprecated)
- [ ] Добавить секцию "Deprecated APIs"
- [ ] Обновить примеры кода
- [ ] Добавить ссылки на migration guides
- [ ] Commit: `docs: update CLAUDE.md with current API status`

---

### 📝 Задача 6.2: Обновить README.md

**Приоритет:** 🔶 Средний

#### Чеклист:

- [ ] Добавить "Breaking Changes" section
- [ ] Обновить component list
- [ ] Добавить migration guide links
- [ ] Обновить API examples
- [ ] Commit: `docs: update README with v3.x breaking changes`

---

### 📝 Задача 6.3: Создать CHANGELOG.md

**Приоритет:** ⚡ Высокий

#### Чеклист:

- [ ] Документировать все breaking changes
- [ ] Добавить migration notes
- [ ] Перечислить deprecated APIs
- [ ] Добавить v4.0 roadmap
- [ ] Commit: `docs: add comprehensive CHANGELOG`

---

## Фаза 7: Type Safety & Quality

### 🔧 Задача 7.1: Проверить TypeScript строгость

**Приоритет:** 🔶 Средний

#### Чеклист:

- [ ] Проверить все deprecated props в type definitions
- [ ] Добавить `@deprecated` JSDoc tags где отсутствуют
- [ ] Убедиться что deprecation warnings компилируются
- [ ] Запустить `npx tsc --strict --noEmit`
- [ ] Commit: `types: add deprecation markers to type definitions`

---

### 🧪 Задача 7.2: Обновить тесты

**Приоритет:** ⚡ Высокий

#### Чеклист:

- [ ] Обновить unit tests на новые APIs
- [ ] Обновить visual regression tests
- [ ] Проверить coverage (должен быть 90%+)
- [ ] Запустить `npm run test`
- [ ] Commit: `test: migrate tests to current APIs`

---

## Timeline & Milestones

### Sprint 1 (Week 1): Breaking Changes

- ✅ Фаза 1: ButtonGlass + Empty dirs

### Sprint 2 (Week 2): AlertGlass Migration

- ✅ Фаза 2: AlertGlass type → variant

### Sprint 3 (Week 3): Documentation

- ✅ Фаза 4: Modal & Tabs migration guides
- ✅ Фаза 6: Update all docs

### Sprint 4 (Week 4): Quality & Polish

- ✅ Фаза 7: Type safety + tests
- ✅ Final review and release

---

## Success Criteria

- [ ] Zero legacy API usage in core components
- [ ] All deprecated APIs have migration guides
- [ ] Test coverage 90%+
- [ ] Visual regression tests passing
- [ ] Documentation 100% updated
- [ ] Breaking changes documented in CHANGELOG
- [ ] TypeScript strict mode passing

---

## Rollback Plan

Если миграция вызывает проблемы:

1. Revert commits по порядку (обратный)
2. Восстановить legacy APIs
3. Создать hotfix branch
4. Deploy предыдущую стабильную версию
5. Пересмотреть migration strategy

---

## Automation Scripts

### Script: Auto-replace legacy APIs

```bash
#!/bin/bash
# scripts/migrate-legacy-apis.sh

echo "Migrating ButtonGlass danger → destructive..."
rg "variant=\"danger\"" -l | xargs sed -i '' 's/variant="danger"/variant="destructive"/g'

echo "Migrating AlertGlass type → variant..."
sed -i '' 's/type="info"/variant="default"/g' $(rg 'type="info"' -l)
sed -i '' 's/type="error"/variant="destructive"/g' $(rg 'type="error"' -l)
sed -i '' 's/type="success"/variant="success"/g' $(rg 'type="success"' -l)
sed -i '' 's/type="warning"/variant="warning"/g' $(rg 'type="warning"' -l)

echo "Removing empty directories..."
find src -type d -empty -delete

echo "Done! Run 'npm run test' to verify."
```

### Script: Verify migration

```bash
#!/bin/bash
# scripts/verify-migration.sh

echo "Checking for legacy APIs..."

echo "ButtonGlass danger variant:"
rg "variant=\"danger\"" --files-with-matches

echo "AlertGlass type prop:"
rg 'AlertGlass.*type=' --files-with-matches

echo "Empty directories:"
find src -type d -empty

echo "Verification complete."
```

---

## Notes & Lessons Learned

_To be filled after each phase completion_

### Phase 1:

-

### Phase 2:

- ***

## Questions & Decisions Log

| Date       | Question                                                | Decision | Rationale            |
| ---------- | ------------------------------------------------------- | -------- | -------------------- |
| 2025-12-04 | NotificationGlass: keep `type` or migrate to `variant`? | Pending  | Need team discussion |
|            |                                                         |          |                      |
