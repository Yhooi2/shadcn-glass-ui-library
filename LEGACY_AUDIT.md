# Legacy API Audit Report

Дата: 2025-12-04

## Executive Summary

Проведён полный аудит проекта на наличие устаревших API и legacy паттернов. Найдено **71 использование** устаревших API, требующих миграции.

## 1. AlertGlass - Legacy `type` prop

**Статус:** ❌ Используется в 14 файлах
**Deprecated:** `type` prop → `variant` prop
**Найдено:** 57 использований

### Файлы с legacy API:

1. **Visual Tests:** `src/components/__visual__/components.visual.test.tsx` (13 использований)
   - `type="info"` → `variant="default"`
   - `type="success"` → `variant="success"`
   - `type="warning"` → `variant="warning"`
   - `type="error"` → `variant="destructive"`

2. **Unit Tests:** `src/components/glass/ui/__tests__/alert-glass.test.tsx` (3 использования)

3. **Demo Components:**
   - `src/components/GlassFixesDemo.tsx` (4 использования)
   - `src/components/blocks/notifications/page.tsx` (7 использований)

4. **Stories:**
   - `src/components/FlagAlertGlass.stories.tsx` (1 использование)
   - `src/components/NotificationGlass.stories.tsx` (8 использований)

5. **Section Components:** `src/components/glass/sections/flags-section-glass.tsx`

### Миграционная карта:

```typescript
// Старый API (deprecated)
<AlertGlass type="info" title="Info">Message</AlertGlass>
<AlertGlass type="error" title="Error">Message</AlertGlass>

// Новый API
<AlertGlass variant="default" title="Info">Message</AlertGlass>
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>
```

---

## 2. ButtonGlass - Legacy `danger` variant

**Статус:** ❌ Используется в 3 файлах
**Deprecated:** `variant="danger"` → `variant="destructive"`
**Найдено:** 3 использования

### Файлы с legacy API:

1. `src/components/blocks/buttons/page.tsx` (1 использование)
2. `src/components/glass/ui/button-glass.stories.tsx` (2 использования)

### Миграционная карта:

```typescript
// Старый API (deprecated)
<ButtonGlass variant="danger">Delete</ButtonGlass>

// Новый API (shadcn/ui compatible)
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

---

## 3. NotificationGlass - Legacy `type` prop

**Статус:** ❌ Используется повсеместно
**Найдено:** 50+ использований

### Файлы с legacy API:

1. **Unit Tests:** `src/components/glass/ui/__tests__/notification-glass.test.tsx` (40+ использований)
2. **Stories:** `src/components/NotificationGlass.stories.tsx` (8 использований)
3. **Blocks:** `src/components/blocks/notifications/page.tsx` (6 использований)

### Вопрос для принятия решения:

⚠️ **NotificationGlass не имеет `variant` prop** - нужно решить:
- A) Добавить `variant` prop и сделать `type` deprecated (как в AlertGlass)
- B) Оставить `type` как основной API (отличие от shadcn/ui)
- C) Переименовать компонент или пересмотреть API

---

## 4. ModalGlass - Legacy vs Compound API

**Статус:** ⚠️ Смешанное использование
**Найдено:** Legacy API в 7 файлах

### Legacy API (Object props):
```typescript
<ModalGlass
  isOpen={open}
  onClose={setOpen}
  title="Title"
  description="Description"
  footer={<Button>OK</Button>}
/>
```

### Compound API (Рекомендуемый):
```typescript
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Title</ModalGlass.Title>
      <ModalGlass.Description>Description</ModalGlass.Description>
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
    <ModalGlass.Footer>
      <Button>OK</Button>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

### Файлы с legacy API:

1. `src/components/__visual__/components.visual.test.tsx`
2. `src/test/compliance/tokens/border-radius.browser.test.tsx`
3. `src/test/compliance/accessibility/focus-states.browser.test.tsx`
4. `src/test/compliance/components/modal.browser.test.tsx`
5. `src/test/compliance/glassmorphism/opacity.browser.test.tsx`
6. `src/components/glass/ui/__tests__/modal-glass.test.tsx`
7. `src/components/ModalGlass.stories.tsx` (показывает оба API)

---

## 5. TabsGlass - Legacy vs Compound API

**Статус:** ⚠️ Смешанное использование
**Найдено:** Legacy API в 3 файлах

### Legacy API (Object props):
```typescript
<TabsGlass
  tabs={[
    { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: '2', label: 'Tab 2', content: <div>Content 2</div> }
  ]}
  activeTab="1"
  onTabChange={setTab}
/>
```

### Compound API (Рекомендуемый):
```typescript
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="1">Content 1</TabsGlass.Content>
  <TabsGlass.Content value="2">Content 2</TabsGlass.Content>
</TabsGlass.Root>
```

### Файлы с legacy API:

1. `src/test/compliance/accessibility/focus-states.browser.test.tsx`
2. `src/components/glass/ui/__tests__/tabs-glass.test.tsx`
3. `src/components/TabsGlass.stories.tsx` (показывает оба API)

---

## 6. Рекомендации по миграции

### Приоритет 1 (Критичный) - Breaking Changes

1. **ButtonGlass `danger` → `destructive`** (3 файла)
   - Это breaking change согласно shadcn/ui v2.8+
   - Требуется для совместимости с shadcn/ui API

### Приоритет 2 (Высокий) - Deprecated Warnings

2. **AlertGlass `type` → `variant`** (14 файлов, 57 использований)
   - Сейчас показывает warning в dev mode
   - Должен быть удалён в следующей мажорной версии

### Приоритет 3 (Средний) - Compound Components

3. **ModalGlass legacy → compound** (7 файлов)
   - Legacy API работает, но не рекомендуется
   - Compound API более гибкий и соответствует Radix UI паттернам

4. **TabsGlass legacy → compound** (3 файла)
   - Legacy API работает, но не рекомендуется
   - Compound API более гибкий

### Приоритет 4 (Низкий) - Для обсуждения

5. **NotificationGlass `type` prop** (50+ использований)
   - Нужно решить стратегию: оставить как есть или мигрировать

---

## 7. План действий

### Шаг 1: ButtonGlass (Breaking Change)
- [ ] Обновить `src/components/blocks/buttons/page.tsx`
- [ ] Обновить `src/components/glass/ui/button-glass.stories.tsx`
- [ ] Удалить `danger` из type definitions (если есть)
- [ ] Запустить тесты

### Шаг 2: AlertGlass (Deprecated)
- [ ] Обновить все visual tests (13 файлов)
- [ ] Обновить unit tests
- [ ] Обновить demo компоненты
- [ ] Обновить stories
- [ ] Запустить тесты
- [ ] Обновить документацию

### Шаг 3: Modal & Tabs (Migration Guide)
- [ ] Создать migration guide для ModalGlass
- [ ] Создать migration guide для TabsGlass
- [ ] Постепенно мигрировать тесты на compound API
- [ ] Оставить legacy API до v3.0

### Шаг 4: NotificationGlass (Решение)
- [ ] Обсудить стратегию с командой
- [ ] Принять решение: оставить/мигрировать
- [ ] Реализовать выбранный подход

---

## 8. Метрики

- **Всего legacy использований:** ~71
- **Файлов требует обновления:** 17 уникальных
- **Breaking changes:** 3 (ButtonGlass)
- **Deprecated warnings:** 57 (AlertGlass)
- **Compound components migration:** 10+ (Modal & Tabs)

---

## 9. Риски

1. **Visual regression tests** - 13 AlertGlass визуальных тестов потребуют обновления screenshots
2. **Breaking changes** - ButtonGlass `danger` может сломать пользовательский код
3. **API documentation** - требуется обновление всей документации
4. **Migration cost** - ~71 использование требует ручной проверки

---

## 10. Deprecated Components & Props

### SelectGlass (v4.0 removal)

**Статус:** ⚠️ Deprecated, будет удалён в v4.0
**Найдено:** 7 файлов используют компонент

#### Миграция: SelectGlass → ComboBoxGlass

```typescript
// Старый API (deprecated)
<SelectGlass
  options={options}
  value={value}
  onChange={setValue}
  label="Country"
  error="Required"
  size="md"
  searchable
/>

// Новый API (ComboBoxGlass)
<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
  label="Country"
  error="Required"
  size="md"
  searchable={true}
/>
```

**Файлы с SelectGlass:**
1. `src/components/glass/ui/select-glass.tsx` (показывает deprecation warning)
2. `src/components/glass/ui/select-glass.stories.tsx`
3. `src/components/__visual__/components.visual.test.tsx`
4. `src/components/glass/ui/__tests__/select-glass.test.tsx`
5. `src/lib/variants/select-glass-variants.ts`
6. `src/lib/variants/dropdown-content-styles.ts`
7. `src/components/glass/ui/index.ts`

### InputGlass - `inputSize` prop (v4.0 removal)

**Статус:** ⚠️ Deprecated, `inputSize` → `size`

```typescript
// Старый API (deprecated)
<InputGlass inputSize="md" />

// Новый API
<InputGlass size="md" />
```

---

## 11. Empty Directories (Cleanup Candidates)

Найдено **8 пустых директорий** в src:

1. `src/components/blocks/progress/components/` - пустая
2. `src/components/blocks/form-elements/components/` - пустая
3. `src/components/blocks/avatar-gallery/components/` - пустая
4. `src/components/blocks/badges/components/` - пустая
5. `src/components/blocks/notifications/components/` - пустая
6. `src/components/__visual__/__screenshots__/showcase.visual.test.tsx/` - пустая (ошибочная директория?)
7. `src/components/pages/` - пустая
8. `src/stories/` - пустая
9. `src/assets/` - пустая

**Рекомендация:** Удалить все пустые директории для чистоты проекта.

---

## 12. Console Usage Audit

**Найдено:** 17 файлов с `console.log/warn/error`

### Production Code (Требует внимания):

1. **Deprecation warnings** (правильное использование):
   - `src/components/glass/ui/select-glass.tsx:147` - deprecation warning (✅ OK)
   - `src/components/glass/ui/input-glass.tsx:144` - deprecation warning (✅ OK)

2. **Stories/Demo files** (допустимо):
   - `src/components/HeaderNavGlass.stories.tsx` (7 использований)
   - `src/components/ModalGlass.stories.tsx` (1 использование)
   - `src/components/DropdownGlass.stories.tsx` (9 использований)
   - `src/components/YearCardGlass.stories.tsx` (2 использования)
   - `src/components/ComponentShowcase.tsx` (4 использования)
   - `src/components/GlassFixesDemo.tsx` (9 использований)

3. **Documentation** (JSDoc examples, ✅ OK):
   - `src/lib/hooks/use-hover.ts:70` - в комментарии

### Compliance Tests (Production env logs):

⚠️ **Требует проверки:** Compliance tests используют console для отладки:
- `src/test/compliance/source-code/css-hardcoded-values.compliance.test.ts`
- `src/test/compliance/source-code/hardcoded-values.compliance.test.ts`
- `src/test/compliance/accessibility/touch-targets.browser.test.tsx`
- `src/test/compliance/tokens/spacing.browser.test.tsx`
- `src/test/compliance/glassmorphism/opacity.browser.test.tsx`

**Рекомендация:** Убедиться, что console.log в тестах не попадают в production bundle.

---

## 13. Import Path Migrations

### Deprecated Imports (Found via @deprecated JSDoc):

1. **ProgressGlass** - `@/components/ProgressGlass` → `@/components/glass/specialized/progress-glass`
   - **Статус:** ✅ Не используется (0 файлов)

2. **GlassCard** - `@/components/glass/composite/glass-card` → `@/components/glass/ui/glass-card`
   - **Статус:** ✅ Используется правильный путь (8 файлов используют новый путь)

3. **ThemeType** - устаревший тип
   - **Статус:** Объявлен как `@deprecated Use Theme instead`

---

## 14. Project Statistics

- **Test files:** 71
- **Story files:** 47
- **Empty directories:** 9
- **Deprecated components:** 2 (SelectGlass, InputGlass.inputSize)
- **Legacy API usage:** 71+ instances
- **Console.log usage:** 17 files (mostly in stories/demos)

---

## 15. Следующие шаги

### Немедленные действия (Приоритет 1):

1. ✅ Аудит завершён
2. ⏳ Удалить пустые директории (9 директорий)
3. ⏳ Получить approval на breaking changes (ButtonGlass)
4. ⏳ Начать миграцию с приоритета 1 (ButtonGlass `danger` → `destructive`)

### Средний приоритет:

5. ⏳ Мигрировать AlertGlass `type` → `variant` (57 использований)
6. ⏳ Обновить visual test screenshots после миграции
7. ⏳ Создать migration guide для ModalGlass и TabsGlass compound API

### Низкий приоритет:

8. ⏳ Решить судьбу NotificationGlass `type` prop
9. ⏳ Создать план миграции SelectGlass → ComboBoxGlass (v4.0)
10. ⏳ Обновить документацию со всеми изменениями

---

## 16. Breaking Changes Roadmap

### v3.x (Current):
- ⚠️ Deprecation warnings для `type` prop в AlertGlass
- ⚠️ Deprecation warnings для SelectGlass
- ⚠️ Deprecation warnings для `inputSize` в InputGlass
- ✅ Legacy API совместимость для ModalGlass и TabsGlass

### v4.0 (Major Release):
- 🔥 Удалить SelectGlass (заменён на ComboBoxGlass)
- 🔥 Удалить `type` prop из AlertGlass
- 🔥 Удалить `inputSize` prop из InputGlass
- 🔥 Удалить `danger` variant из ButtonGlass (заменён на `destructive`)
- ⚠️ Возможно удаление legacy API для ModalGlass и TabsGlass (требует обсуждения)
