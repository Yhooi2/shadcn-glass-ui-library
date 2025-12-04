# Design System Compliance Testing

Этот каталог содержит тесты для проверки соответствия компонентов правилам дизайн-системы из [UI_DIZINE.md](../../../UI_DIZINE.md).

## 📁 Структура

```
compliance/
├── __setup__/              # Setup файлы
│   ├── theme-test-wrapper.tsx
│   └── compliance-setup.ts
│
├── tokens/                 # Тесты токенов
│   ├── spacing.compliance.test.tsx
│   ├── typography.compliance.test.tsx
│   └── border-radius.compliance.test.tsx
│
├── glassmorphism/         # Тесты glassmorphism
│   ├── blur.compliance.test.tsx         # jsdom (ограничено)
│   ├── blur.browser.test.tsx            # browser (полные)
│   ├── opacity.compliance.test.tsx
│   └── antipatterns.compliance.test.tsx
│
├── components/            # Тесты компонентов
│   ├── button.compliance.test.tsx
│   ├── card.compliance.test.tsx
│   ├── modal.compliance.test.tsx
│   ├── tooltip.compliance.test.tsx
│   └── badge.compliance.test.tsx
│
└── accessibility/         # Тесты доступности
    ├── contrast.compliance.test.tsx
    ├── touch-targets.compliance.test.tsx
    └── focus-states.compliance.test.tsx
```

## 🎯 Два режима тестирования

### 1. jsdom режим (быстрый, ограниченный)

**Команда:**
```bash
npm run test:compliance       # Watch mode
npm run test:compliance:run   # Single run
```

**Что работает:**
- ✅ Валидация констант токенов
- ✅ Утилиты парсинга (parseBlurValue, parsePixelValue)
- ✅ Логика валидации (isOnGrid, validateBlurValue)
- ✅ Проверка props компонентов
- ✅ Рендеринг компонентов без стилей

**Что НЕ работает:**
- ❌ `backdrop-filter` - jsdom не компилирует это свойство
- ❌ `getBoundingClientRect` - возвращает 0 для всех размеров
- ❌ Tailwind классы - не компилируются в computed styles
- ❌ Реальные размеры touch targets
- ❌ Реальные значения font-weight

**Результат:** ~73% pass rate (470/644) - **это нормально для jsdom**

### 2. Browser режим (медленный, точный)

**Команда:**
```bash
npm run test:compliance:browser       # Watch mode
npm run test:compliance:browser:run   # Single run
```

**Что работает:**
- ✅ Всё из jsdom режима
- ✅ `backdrop-filter` - реальные вычисленные значения
- ✅ `getBoundingClientRect` - реальные размеры элементов
- ✅ Tailwind классы - компилируются и применяются
- ✅ Hover/focus состояния с CSS transitions
- ✅ Реальные font-weight значения

**Результат:** ~95-100% pass rate (ожидается)

## 🔍 jsdom Limitations

### Проблема 1: backdrop-filter

```typescript
// В jsdom
const style = window.getComputedStyle(element);
console.log(style.backdropFilter); // "" (пустая строка)

// В реальном браузере
const style = window.getComputedStyle(element);
console.log(style.backdropFilter); // "blur(24px)"
```

**Решение:** Используйте `*.browser.test.tsx` файлы для blur тестов.

### Проблема 2: getBoundingClientRect

```typescript
// В jsdom
const rect = element.getBoundingClientRect();
console.log(rect.width, rect.height); // 0, 0

// В реальном браузере
const rect = element.getBoundingClientRect();
console.log(rect.width, rect.height); // 120, 44
```

**Решение:** Touch target тесты должны запускаться в browser режиме.

### Проблема 3: Tailwind Compiled Classes

```typescript
// В jsdom (Tailwind не компилируется)
<button className="font-medium" />
const style = window.getComputedStyle(button);
console.log(style.fontWeight); // "400" (default)

// В реальном браузере (Tailwind компилируется)
<button className="font-medium" />
const style = window.getComputedStyle(button);
console.log(style.fontWeight); // "500" (правильно)
```

**Решение:** Font-weight тесты должны запускаться в browser режиме.

## 📊 Категории тестов

### Token Compliance (150 тестов)
- **Spacing**: 8px base grid (0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 96)
- **Typography**: Modular scale 1.25, font-weight 500
- **Border Radius**: 4px, 8px, 12px, 16px, 24px

### Glassmorphism Compliance (180 тестов)
- **Blur**: sm=8px, md=16px, lg=24px, xl=32px
- **Opacity**: decorative 5-10%, standard 15-25%, text 30-50%
- **Layers**: maximum 2-3 layers per view
- **Antipatterns**: pure black, excessive blur, contrast issues

### Component Compliance (200 тестов)
- **ButtonGlass**: sizing, spacing, touch targets
- **GlassCard**: padding 24-32px, blur values
- **ModalGlass**: blur 24px, scrim, padding
- **TooltipGlass**: sizing, positioning
- **BadgeGlass**: sizing, variants

### Accessibility Compliance (114 тестов)
- **Contrast**: WCAG 2.1 AA (4.5:1 body, 3:1 large text)
- **Touch Targets**: 44x44px Apple HIG minimum
- **Focus States**: double-outline technique

## 🎨 Когда использовать какой режим

### jsdom режим - для CI/CD
```yaml
# .github/workflows/test.yml
- name: Run compliance tests
  run: npm run test:compliance:run
```

**Плюсы:**
- ⚡ Быстро (секунды)
- 💰 Дешево (без browser overhead)
- 🔄 Подходит для каждого коммита

**Минусы:**
- ⚠️ Много false negatives из-за ограничений
- ❌ Не видит реальные проблемы с backdrop-filter

### Browser режим - для release validation

```bash
# Перед релизом
npm run test:compliance:browser:run
```

**Плюсы:**
- ✅ 100% точность
- 🎯 Видит реальные проблемы
- 🖼️ Тестирует визуальные эффекты

**Минусы:**
- 🐌 Медленно (минуты)
- 💻 Требует браузер

## 📝 Написание новых тестов

### jsdom тесты (*.compliance.test.tsx)

Используйте для:
- Валидации констант
- Проверки props
- Логики без DOM
- Структуры компонентов

```typescript
// ✅ Хорошо для jsdom
describe('Button Token Constants', () => {
  it('has correct height specs', () => {
    expect(COMPONENT_SPECS.BUTTON.md.height).toBe(40);
  });
});
```

### Browser тесты (*.browser.test.tsx)

Используйте для:
- backdrop-filter тестов
- Touch target размеров
- Hover/focus состояний
- Computed styles

```typescript
// ✅ Хорошо для browser
import { test, expect } from '@playwright/experimental-ct-react';

test('has correct backdrop-filter blur', async ({ mount }) => {
  const component = await mount(<GlassCard />);
  const card = component.getByTestId('card');

  const backdropFilter = await card.evaluate((el) => {
    return window.getComputedStyle(el).backdropFilter;
  });

  expect(backdropFilter).toContain('blur(24px)');
});
```

## 🔄 Continuous Integration

```bash
# Pre-commit (быстро)
npm run test:compliance:run

# Pre-release (точно)
npm run test:compliance:browser:run

# Visual regression (полная картина)
npm run test:visual
```

## 📚 Полезные ссылки

- [DESIGN_SYSTEM.md](../../../docs/DESIGN_SYSTEM.md) - Полная дизайн-система
- [COMPLIANCE_CHECKLIST.md](../../../docs/COMPLIANCE_CHECKLIST.md) - Чеклисты
- [COMPLIANCE_TESTING.md](../../../docs/COMPLIANCE_TESTING.md) - Гайд по тестированию
- [UI_DIZINE.md](../../../UI_DIZINE.md) - Оригинальные правила

---

**TL;DR:**
- jsdom тесты = быстро, но ~27% false failures
- Browser тесты = медленно, но 100% точность
- Используйте jsdom для CI, browser для release validation
