# Unit Test Plan - Glass UI Library

**Дата создания:** 2025-12-03
**Цель:** Достичь 90% unit test coverage
**Текущий coverage:** 13.87% (после добавления 4 компонентов)

---

## Прогресс

### ✅ Выполнено (4 компонента + 110 тестов)

| Компонент | Тестов | Coverage | Статус |
|-----------|--------|----------|--------|
| ButtonGlass | 24 | 88.88% | ✅ |
| InputGlass | 31 | 100% | ✅ |
| AlertGlass | 28 | 91.66% | ✅ |
| BadgeGlass | 27 | 100% | ✅ |
| **Итого** | **110** | **~95%** | **4/18 UI компонентов** |

### Hooks (3/4 покрыто)

| Hook | Coverage | Статус |
|------|----------|--------|
| use-hover | 100% | ✅ |
| use-focus | 100% | ✅ |
| use-responsive | 95.65% | ✅ |
| use-wallpaper-tint | 0% | ❌ |

---

## Приоритеты тестирования

### P0 - Критические компоненты (для достижения базового покрытия)

#### UI Components (14 осталось):
1. **CheckboxGlass** - форма контроль
2. **ToggleGlass** - форма контроль
3. **SliderGlass** - форма контроль
4. **TabsGlass** - навигация
5. **ModalGlass** - критический UX
6. **DropdownGlass** - критический UX
7. **TooltipGlass** - UX helper
8. **NotificationGlass** - feedback
9. **SkeletonGlass** - loading state
10. **AvatarGlass** - display
11. **GlassCard** - layout
12. **CircularProgressGlass** - loading
13. **ComboboxGlass** - форма контроль
14. **ProgressGlass** - уже в specialized/

#### Hooks (1 осталось):
- **use-wallpaper-tint** - 0% coverage

### P1 - Важные модули

#### Variants (17 файлов, 0% coverage):
- alert-glass-variants.ts
- avatar-glass-variants.ts
- badge-glass-variants.ts
- button-glass-variants.ts
- checkbox-glass-variants.ts
- dropdown-glass-variants.ts
- input-glass-variants.ts
- modal-glass-variants.ts
- notification-glass-variants.ts
- progress-glass-variants.ts
- skeleton-glass-variants.ts
- slider-glass-variants.ts
- tabs-glass-variants.ts
- toggle-glass-variants.ts
- tooltip-glass-variants.ts
- index.ts
- (другие variants)

#### Theme (1 файл, 0% coverage):
- tokens.ts (598 строк)

### P2 - Дополнительные модули

- Atomic components (6 компонентов)
- Composite components (13 компонентов)
- Sections components (7 компонентов)
- Specialized components (8 компонентов)

---

## Оценка работы

### Текущий прогресс (13.87%)

**Что сделано:**
- 4 UI компонента = ~22% UI coverage
- 110 unit тестов
- 3 hook покрыто

**Что осталось для 90% coverage:**

| Категория | Количество | Оценка времени |
|-----------|-----------|----------------|
| UI компоненты (14 шт) | ~400 тестов | 14-20 часов |
| Hooks (1 шт) | ~30 тестов | 2-3 часа |
| Variants (17 файлов) | ~170 тестов | 8-12 часов |
| tokens.ts | ~50 тестов | 3-4 часа |
| Atomic (6 шт) | ~120 тестов | 6-8 часов |
| Composite (13 шт) | ~260 тестов | 13-18 часов |
| Sections (7 шт) | ~140 тестов | 7-10 часов |
| Specialized (8 шт) | ~160 тестов | 8-12 часов |
| **ИТОГО** | **~1330 тестов** | **61-87 часов** |

---

## Рекомендуемая стратегия

### Подход 1: Фокус на UI компонентах (быстрый результат)

**Цель:** 40-50% coverage за 20-30 часов

1. Покрыть все 18 UI компонентов (осталось 14)
2. Покрыть use-wallpaper-tint hook
3. Добавить базовые тесты для variants (10-15 файлов)

**Результат:**
- ~510 тестов
- 40-50% coverage
- Все критические UI компоненты протестированы

### Подход 2: Полное покрытие (цель 90%)

**Цель:** 90% coverage за 60-90 часов

1. Все UI компоненты (18 шт)
2. Все hooks (4 шт)
3. Все variants (17 файлов)
4. tokens.ts
5. Atomic components (6 шт)
6. Composite components (13 шт)
7. Sections components (7 шт)
8. Specialized components (8 шт)

**Результат:**
- ~1440 тестов
- 90%+ coverage
- Полное тестовое покрытие

### Подход 3: Hybrid (рекомендуемый)

**Цель:** 60-70% coverage за 30-40 часов

1. ✅ UI компоненты (18 шт) - 20-30 часов
2. ✅ Hooks (4 шт) - 2-3 часа
3. ⚠️ Variants (базовые тесты для 10 самых используемых) - 5-8 часов
4. ⚠️ tokens.ts (базовые тесты) - 2-3 часа

**Результат:**
- ~650 тестов
- 60-70% coverage
- Все критические компоненты протестированы
- Базовое покрытие variants и tokens

---

## Следующие шаги

### Немедленные действия (сегодня):

1. ✅ ButtonGlass - done
2. ✅ InputGlass - done
3. ✅ AlertGlass - done
4. ✅ BadgeGlass - done
5. ⏭️ CheckboxGlass - next (2-3 часа)
6. ⏭️ ToggleGlass - next (2-3 часа)
7. ⏭️ use-wallpaper-tint - next (2-3 часа)

**Итого на сегодня:** 6-9 часов для +3 компонента/hook

### Краткосрочные задачи (эта неделя):

- SliderGlass
- TabsGlass
- ModalGlass
- DropdownGlass
- TooltipGlass
- NotificationGlass

**Цель:** 40% coverage к концу недели

### Долгосрочные задачи (следующая неделя):

- Остальные UI компоненты
- Variants тесты
- Atomic/Composite тесты

**Цель:** 70-90% coverage к концу следующей недели

---

## Автоматизация тестирования

### Возможные улучшения:

1. **Test templates** - создать шаблоны для компонентов
2. **Test generators** - автогенерация базовых тестов
3. **CI/CD integration** - автоматический запуск при PR
4. **Coverage gates** - блокировка PR при падении coverage
5. **Snapshot testing** - для visual regression

### Coverage goals в package.json:

```json
"jest": {
  "coverageThreshold": {
    "global": {
      "statements": 90,
      "branches": 90,
      "functions": 90,
      "lines": 90
    }
  }
}
```

---

## Заключение

**Текущий статус:**
- ✅ 4/18 UI компонентов протестировано (22%)
- ✅ 110 unit тестов написано
- ✅ 13.87% coverage (было 8.92%)
- ⚠️ До 90% coverage осталось ~1330 тестов и 60-90 часов работы

**Рекомендация:**
Использовать **Hybrid подход** для достижения 60-70% coverage за 30-40 часов, фокусируясь на:
1. Всех UI компонентах (высший приоритет)
2. Всех hooks
3. Базовых тестах для variants
4. Базовых тестах для tokens.ts

Это обеспечит хорошее тестовое покрытие критических компонентов и позволит безопасно двигаться к Фазе 3 (Registry & Publish).

---

**Последнее обновление:** 2025-12-03 21:18
