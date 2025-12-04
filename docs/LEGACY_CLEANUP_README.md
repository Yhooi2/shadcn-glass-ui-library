# Legacy Code Cleanup - Complete Guide

**Дата аудита:** 2025-12-04 **Статус:** ✅ Audit Complete, Ready for Migration **Версия:** v3.x →
v3.x (with deprecation fixes)

---

## 📋 Быстрая навигация

1. **[CLEANUP_SUMMARY.md](../CLEANUP_SUMMARY.md)** - Краткая сводка (начните отсюда)
2. **[LEGACY_AUDIT.md](../LEGACY_AUDIT.md)** - Полный аудит (детали)
3. **[CLEANUP_PLAN.md](../CLEANUP_PLAN.md)** - Пошаговый план (roadmap)
4. **Automation Scripts:**
   - `scripts/migrate-legacy-apis.sh` - Автоматическая миграция
   - `scripts/verify-migration.sh` - Проверка миграции

---

## 🚀 Quick Start (5 минут)

### Option A: Автоматическая миграция (Рекомендуется)

```bash
# 1. Запустить миграцию
bash scripts/migrate-legacy-apis.sh

# 2. Проверить результат
bash scripts/verify-migration.sh

# 3. Запустить тесты
npm run test

# 4. Обновить screenshots
npm run test:visual:update

# 5. Review и commit
git diff
git add .
git commit -m "refactor: migrate legacy APIs to modern patterns

- Replace ButtonGlass 'danger' with 'destructive' (3 files)
- Replace AlertGlass 'type' with 'variant' (57 uses)
- Remove empty directories (9 dirs)

BREAKING CHANGE: ButtonGlass 'danger' variant replaced with 'destructive'"
```

### Option B: Ручная миграция (Безопаснее)

См. детальный план в [CLEANUP_PLAN.md](../CLEANUP_PLAN.md)

---

## 📊 Что будет изменено

### Breaking Changes (v3.x):

```diff
// ButtonGlass (3 файла)
- <ButtonGlass variant="danger">Delete</ButtonGlass>
+ <ButtonGlass variant="destructive">Delete</ButtonGlass>
```

### Deprecation Fixes (57 использований):

```diff
// AlertGlass
- <AlertGlass type="info" title="Info">Message</AlertGlass>
- <AlertGlass type="error" title="Error">Message</AlertGlass>
- <AlertGlass type="success" title="Success">Message</AlertGlass>
- <AlertGlass type="warning" title="Warning">Message</AlertGlass>

+ <AlertGlass variant="default" title="Info">Message</AlertGlass>
+ <AlertGlass variant="destructive" title="Error">Message</AlertGlass>
+ <AlertGlass variant="success" title="Success">Message</AlertGlass>
+ <AlertGlass variant="warning" title="Warning">Message</AlertGlass>
```

### Cleanup:

- Удаление 9 пустых директорий в `src/`

---

## ⚠️ Предупреждения

### 1. ButtonGlass Breaking Change

**Риск:** Может сломать пользовательский код, если они используют `variant="danger"`

**Миграция для пользователей:**

```typescript
// Before (breaks)
<ButtonGlass variant="danger">Delete</ButtonGlass>

// After (works)
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

### 2. Visual Regression Tests

После миграции AlertGlass потребуется обновить **13+ screenshots**:

```bash
npm run test:visual:update
```

### 3. NotificationGlass

**Решение не принято:** оставить `type` prop или мигрировать на `variant`?

**Текущий статус:** Оставляем `type` как есть (50+ использований)

---

## 📈 Статистика изменений

| Категория         | Количество      |
| ----------------- | --------------- |
| Breaking changes  | 3 (ButtonGlass) |
| Deprecation fixes | 57 (AlertGlass) |
| Пустых директорий | 9               |
| Затронутых файлов | 17              |
| Test files        | 71              |
| Story files       | 47              |

---

## 🔍 Verification Checklist

После миграции проверьте:

- [ ] ✅ Zero `variant="danger"` в ButtonGlass
- [ ] ✅ Zero `type=` prop в AlertGlass
- [ ] ✅ Все пустые директории удалены
- [ ] ✅ TypeScript компилируется: `npx tsc --noEmit`
- [ ] ✅ ESLint проходит: `npm run lint`
- [ ] ✅ Unit tests проходят: `npm run test`
- [ ] ✅ Visual tests обновлены: `npm run test:visual:update`
- [ ] ✅ Build успешен: `npm run build`

---

## 📚 Документация (После миграции)

После завершения миграции обновите:

1. **CHANGELOG.md** - добавить breaking changes
2. **README.md** - обновить API examples
3. **CLAUDE.md** - обновить component list
4. **Migration guides** - создать для Modal/Tabs

---

## 🔄 Rollback Plan

Если что-то пошло не так:

```bash
# 1. Откатить изменения
git reset --hard HEAD

# 2. Или откатить конкретный commit
git revert <commit-hash>

# 3. Проверить статус
git status
npm run test
```

---

## 🎯 Timeline

### Текущий статус: Sprint Planning

- **Sprint 1 (Week 1):** Breaking changes (ButtonGlass + cleanup)
- **Sprint 2 (Week 2):** AlertGlass migration (57 uses)
- **Sprint 3 (Week 3):** Documentation updates
- **Sprint 4 (Week 4):** Quality assurance + release

**Target release:** v3.1.0 (4 weeks from now)

---

## 💡 Tips & Best Practices

### Перед миграцией:

1. ✅ Создайте feature branch: `git checkout -b refactor/legacy-cleanup`
2. ✅ Сделайте backup: `git branch backup/before-cleanup`
3. ✅ Прочитайте [LEGACY_AUDIT.md](../LEGACY_AUDIT.md)

### Во время миграции:

1. ✅ Запускайте тесты после каждого шага
2. ✅ Делайте commit после каждой фазы
3. ✅ Используйте `git diff` для review

### После миграции:

1. ✅ Обновите visual test screenshots
2. ✅ Проверьте все checklist items
3. ✅ Создайте PR для review
4. ✅ Обновите документацию

---

## 🤝 Contributing

Если вы нашли дополнительные legacy API или deprecated patterns:

1. Добавьте в [LEGACY_AUDIT.md](../LEGACY_AUDIT.md)
2. Обновите [CLEANUP_PLAN.md](../CLEANUP_PLAN.md)
3. Создайте issue с label `tech-debt`

---

## 📞 Вопросы?

- **Полный аудит:** [LEGACY_AUDIT.md](../LEGACY_AUDIT.md)
- **План действий:** [CLEANUP_PLAN.md](../CLEANUP_PLAN.md)
- **Краткая сводка:** [CLEANUP_SUMMARY.md](../CLEANUP_SUMMARY.md)
- **GitHub Issues:** https://github.com/your-org/shadcn-glass-ui-library/issues

---

## 📝 Changelog Template

После завершения миграции добавьте в CHANGELOG.md:

```markdown
## [3.1.0] - 2025-01-XX

### ⚠️ BREAKING CHANGES

- **ButtonGlass:** Removed `danger` variant in favor of `destructive` for shadcn/ui API
  compatibility
  - **Migration:** Replace `variant="danger"` with `variant="destructive"`
  - **Affected:** 3 files in library, user code may require updates

### 🔧 Refactored

- **AlertGlass:** Migrated from deprecated `type` prop to `variant` prop (57 instances)
  - `type="info"` → `variant="default"`
  - `type="error"` → `variant="destructive"`
  - `type="success"` → `variant="success"`
  - `type="warning"` → `variant="warning"`

### 🧹 Cleanup

- Removed 9 empty directories from `src/`
- Updated 17 files with legacy API usage
- Improved code consistency and maintainability

### 📚 Documentation

- Added comprehensive legacy API audit ([LEGACY_AUDIT.md](LEGACY_AUDIT.md))
- Created cleanup plan with automation scripts ([CLEANUP_PLAN.md](CLEANUP_PLAN.md))
- Added migration guides for compound components
```

---

**Last updated:** 2025-12-04 **Status:** ✅ Ready for execution **Approver:** Pending team review
