# SplitLayoutGlass - Промт для создания компонента

> **Цель**: Создать компонент `SplitLayoutGlass` для библиотеки shadcn-glass-ui с **паттерном Sticky
> Scrollable Sidebar** как в MDN, GitHub Docs, Linear.

---

## 🎯 Главная фишка компонента

**Sticky scroll behavior с независимой прокруткой колонок:**

1. ✅ При скролле страницы → панели прокручиваются **вместе** до `top: offset`
2. ✅ После прилипания → `max-height` ограничивает высоту viewport'ом
3. ✅ Если контент > viewport → **независимая прокрутка** внутри каждой панели
4. ✅ Headers всегда видны (через `shrink-0`)
5. ✅ **НЕТ** синхронной прокрутки до конца страницы

**Это решает классическую проблему split layouts!**

---

## 📋 Текущая реализация (из git-user-info)

### Desktop (≥1440px) - 2 колонки с sticky

```tsx
<section className="grid grid-cols-[1fr_2fr] gap-6">
  {/* Sidebar - 33% */}
  <aside>
    <div className="sticky top-6 max-h-[calc(100vh-3rem)] flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Fixed Header */}
      <div className="shrink-0">
        <CareerSummaryHeader />
        <AllTimeButton />
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-2 p-3">
          {years.map((year) => (
            <YearCard key={year} />
          ))}
        </div>
      </ScrollArea>
    </div>
  </aside>

  {/* Main - 67% */}
  <main>
    <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
      <YearDetailPanel />
    </div>
  </main>
</section>
```

### Проблемы текущей реализации:

❌ **Нет минимальной ширины** - при узких экранах sidebar сжимается до нечитаемости ❌ **Нет
адаптации под мобильные** - 2 колонки на телефоне = UX disaster ❌ **Sticky на мобильных не
нужен** - в одной колонке sticky бессмысленен

---

## 🏗️ Архитектура компонента для библиотеки

### Ключевые улучшения:

1. **`minmax()` для минимальной ширины sidebar**
2. **Responsive breakpoints** - 2 колонки на desktop, 1 на mobile
3. **Sticky только на desktop** - на мобильных обычные блоки
4. **Разные gap** - меньше на мобильных, больше на desktop
5. **Опции mobile layout** - stack/main-only/sidebar-only
6. **БЕЗ ResizablePanel** - простой CSS Grid

---

## 📝 TypeScript интерфейс

```typescript
interface SplitLayoutGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  // ==================== ОСНОВНЫЕ ====================

  /**
   * Контент sidebar (левая колонка)
   * Обычно содержит header + scrollable список
   */
  readonly sidebar: React.ReactNode;

  /**
   * Контент main (правая колонка)
   * Обычно содержит header + scrollable контент
   */
  readonly main: React.ReactNode;

  // ==================== LAYOUT ====================

  /**
   * Соотношение sidebar к main (в fr units)
   * @default { sidebar: 1, main: 2 }
   * @example { sidebar: 1, main: 3 } = 25% : 75%
   */
  readonly ratio?: { sidebar: number; main: number };

  /**
   * Минимальная ширина sidebar (для предотвращения сжатия)
   * ВАЖНО: используется в minmax(min, fraction)
   * @default "300px"
   */
  readonly minSidebarWidth?: string;

  /**
   * Максимальная ширина sidebar (опционально)
   * @default undefined (не ограничена, используется fraction)
   * @example "500px" - sidebar не шире 500px
   */
  readonly maxSidebarWidth?: string;

  /**
   * Gap между панелями
   * Может быть числом (одинаковый) или объектом (разные для mobile/desktop)
   * @default { mobile: 16, desktop: 24 }
   */
  readonly gap?: number | { mobile?: number; desktop?: number };

  // ==================== RESPONSIVE ====================

  /**
   * Breakpoint для переключения desktop/mobile layout
   * @default "xl" (1440px)
   *
   * Tailwind breakpoints:
   * - sm: 640px
   * - md: 768px
   * - lg: 1024px
   * - xl: 1440px
   * - 2xl: 1536px
   */
  readonly breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Layout на мобильных устройствах (<breakpoint)
   *
   * - 'stack': sidebar сверху, main снизу (по умолчанию)
   * - 'main-only': скрыть sidebar, показать только main
   * - 'sidebar-only': скрыть main, показать только sidebar
   *
   * @default "stack"
   */
  readonly mobileLayout?: 'stack' | 'main-only' | 'sidebar-only';

  // ==================== STICKY SCROLL ====================

  /**
   * Sticky offset от верха viewport (только desktop)
   * На мобильных sticky не применяется
   * @default 24 (соответствует top-6 в Tailwind)
   */
  readonly stickyOffset?: number;

  // ==================== GLASSMORPHISM ====================

  /**
   * Glass intensity для панелей
   * @default "medium"
   */
  readonly intensity?: 'low' | 'medium' | 'high';

  // ==================== ACCESSIBILITY ====================

  /**
   * ARIA label для sidebar
   * @default "Sidebar navigation"
   */
  readonly sidebarLabel?: string;

  /**
   * ARIA label для main
   * @default "Main content"
   */
  readonly mainLabel?: string;

  // ==================== CUSTOMIZATION ====================

  /**
   * Custom className для контейнера
   */
  readonly className?: string;

  /**
   * Custom className для sidebar
   */
  readonly sidebarClassName?: string;

  /**
   * Custom className для main
   */
  readonly mainClassName?: string;
}
```

---

## 🎨 Полная реализация

```tsx
import { GlassCard } from '@/components/glass/ui/glass-card';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const SplitLayoutGlass = forwardRef<HTMLDivElement, SplitLayoutGlassProps>(
  (
    {
      sidebar,
      main,
      ratio = { sidebar: 1, main: 2 },
      minSidebarWidth = '300px',
      maxSidebarWidth,
      gap = { mobile: 16, desktop: 24 },
      breakpoint = 'xl',
      mobileLayout = 'stack',
      stickyOffset = 24,
      intensity = 'medium',
      sidebarLabel = 'Sidebar navigation',
      mainLabel = 'Main content',
      className,
      sidebarClassName,
      mainClassName,
      ...props
    },
    ref
  ) => {
    // Normalize gap values
    const gapMobile = typeof gap === 'number' ? gap : (gap.mobile ?? 16);
    const gapDesktop = typeof gap === 'number' ? gap : (gap.desktop ?? 24);

    // Build grid-template-columns for desktop
    // Examples:
    // - minmax(300px, 1fr) 2fr          // min 300px, no max
    // - minmax(300px, 400px) 2fr        // min 300px, max 400px
    const gridTemplate = maxSidebarWidth
      ? `minmax(${minSidebarWidth}, ${maxSidebarWidth}) ${ratio.main}fr`
      : `minmax(${minSidebarWidth}, ${ratio.sidebar}fr) ${ratio.main}fr`;

    // Breakpoint classes
    const bp = breakpoint;

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          // Mobile: определяем layout через mobileLayout prop
          mobileLayout === 'stack' && 'grid-cols-1',
          mobileLayout === 'main-only' && 'grid-cols-1 [&>aside]:hidden',
          mobileLayout === 'sidebar-only' && 'grid-cols-1 [&>main]:hidden',
          className
        )}
        style={
          {
            // CSS Variables для динамических значений
            '--grid-template': gridTemplate,
            '--gap-mobile': `${gapMobile}px`,
            '--gap-desktop': `${gapDesktop}px`,
            '--sticky-offset': `${stickyOffset}px`,
            '--sticky-max-height': `calc(100vh - calc(var(--sticky-offset) * 2))`,

            // Gap: mobile по умолчанию
            gap: 'var(--gap-mobile)',
          } as React.CSSProperties
        }
        {...props}
      >
        {/* ==================== SIDEBAR ==================== */}
        <aside
          aria-label={sidebarLabel}
          className={cn(
            // Mobile: обычный card, NO sticky
            'rounded-xl',

            // Desktop: sticky с max-height и flex для ScrollArea
            // ВАЖНО: все desktop классы с префиксом breakpoint
            `${bp}:sticky`,
            `${bp}:top-[var(--sticky-offset)]`,
            `${bp}:max-h-[var(--sticky-max-height)]`,
            `${bp}:flex`,
            `${bp}:flex-col`,
            `${bp}:overflow-hidden`,

            // Desktop: gap меняется
            `${bp}:[grid-column:1]`, // явно указываем колонку

            sidebarClassName
          )}
        >
          <GlassCard intensity={intensity} className="h-full">
            {sidebar}
          </GlassCard>
        </aside>

        {/* ==================== MAIN ==================== */}
        <main
          aria-label={mainLabel}
          className={cn(
            // Mobile: обычный card, NO sticky
            'rounded-xl',

            // Desktop: sticky с max-height и overflow-hidden
            `${bp}:sticky`,
            `${bp}:top-[var(--sticky-offset)]`,
            `${bp}:max-h-[var(--sticky-max-height)]`,
            `${bp}:overflow-hidden`,

            mainClassName
          )}
        >
          <GlassCard intensity={intensity} className="h-full">
            {main}
          </GlassCard>
        </main>

        {/* Desktop: применяем grid-template-columns через style в useEffect */}
        <style jsx>{`
          @media (min-width: ${breakpoint === 'xl'
              ? '1440px'
              : breakpoint === 'lg'
                ? '1024px'
                : '768px'}) {
            div[data-split-layout] {
              grid-template-columns: var(--grid-template);
              gap: var(--gap-desktop);
            }
          }
        `}</style>
      </div>
    );
  }
);

SplitLayoutGlass.displayName = 'SplitLayoutGlass';
```

---

## ⚡ Улучшенная реализация (без styled-jsx)

```tsx
export const SplitLayoutGlass = forwardRef<HTMLDivElement, SplitLayoutGlassProps>(
  (
    {
      sidebar,
      main,
      ratio = { sidebar: 1, main: 2 },
      minSidebarWidth = '300px',
      maxSidebarWidth,
      gap = { mobile: 16, desktop: 24 },
      breakpoint = 'xl',
      mobileLayout = 'stack',
      stickyOffset = 24,
      intensity = 'medium',
      sidebarLabel = 'Sidebar navigation',
      mainLabel = 'Main content',
      className,
      sidebarClassName,
      mainClassName,
      ...props
    },
    ref
  ) => {
    const gapMobile = typeof gap === 'number' ? gap : (gap.mobile ?? 16);
    const gapDesktop = typeof gap === 'number' ? gap : (gap.desktop ?? 24);

    const gridTemplate = maxSidebarWidth
      ? `minmax(${minSidebarWidth}, ${maxSidebarWidth}) ${ratio.main}fr`
      : `minmax(${minSidebarWidth}, ${ratio.sidebar}fr) ${ratio.main}fr`;

    const bp = breakpoint;

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          // Mobile layout
          mobileLayout === 'stack' && 'grid-cols-1',
          mobileLayout === 'main-only' && 'grid-cols-1 [&>aside]:hidden',
          mobileLayout === 'sidebar-only' && 'grid-cols-1 [&>main]:hidden',
          // Desktop layout - применяем grid-template через Tailwind arbitrary value
          bp === 'xl' && `xl:grid-cols-[var(--grid-template)]`,
          bp === 'lg' && `lg:grid-cols-[var(--grid-template)]`,
          bp === 'md' && `md:grid-cols-[var(--grid-template)]`,
          className
        )}
        style={
          {
            '--grid-template': gridTemplate,
            '--sticky-offset': `${stickyOffset}px`,
            '--sticky-max-height': `calc(100vh - calc(${stickyOffset}px * 2))`,
            gap: `${gapMobile}px`,
            [`@media (min-width: ${bp === 'xl' ? '1440px' : bp === 'lg' ? '1024px' : '768px'})`]: {
              gap: `${gapDesktop}px`,
            },
          } as React.CSSProperties
        }
        {...props}
      >
        <aside
          aria-label={sidebarLabel}
          className={cn(
            'rounded-xl',
            `${bp}:sticky ${bp}:top-[var(--sticky-offset)] ${bp}:max-h-[var(--sticky-max-height)]`,
            `${bp}:flex ${bp}:flex-col ${bp}:overflow-hidden`,
            sidebarClassName
          )}
        >
          <GlassCard intensity={intensity} className="h-full">
            {sidebar}
          </GlassCard>
        </aside>

        <main
          aria-label={mainLabel}
          className={cn(
            'rounded-xl',
            `${bp}:sticky ${bp}:top-[var(--sticky-offset)] ${bp}:max-h-[var(--sticky-max-height)]`,
            `${bp}:overflow-hidden`,
            mainClassName
          )}
        >
          <GlassCard intensity={intensity} className="h-full">
            {main}
          </GlassCard>
        </main>
      </div>
    );
  }
);
```

---

## 🎯 Примеры использования

### 1. Базовый (как в git-user-info)

```tsx
<SplitLayoutGlass
  sidebar={
    <>
      <div className="shrink-0">
        <CareerSummaryHeader />
        <AllTimeButton />
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-2 p-3">
          {years.map((y) => (
            <YearCard key={y} />
          ))}
        </div>
      </ScrollArea>
    </>
  }
  main={<YearDetailPanel />}
/>
```

**Результат:**

- Desktop (≥1440px): 2 колонки 33/67, sticky с независимой прокруткой
- Mobile (<1440px): stack (sidebar сверху, main снизу), БЕЗ sticky

---

### 2. С минимальной и максимальной шириной

```tsx
<SplitLayoutGlass
  sidebar={<Filters />}
  main={<ProductGrid />}
  minSidebarWidth="250px"
  maxSidebarWidth="400px" // sidebar не шире 400px
  ratio={{ sidebar: 1, main: 3 }} // 25% : 75%
/>
```

**Результат:**

- Sidebar: min 250px, max 400px
- Соотношение: 25% : 75% (вместо 33/67)

---

### 3. Только main на мобильных

```tsx
<SplitLayoutGlass
  sidebar={<ComplexFilters />}
  main={<ShoppingCart />}
  mobileLayout="main-only" // Скрыть sidebar на мобильных
/>
```

**Use case:** Корзина покупок - на мобильных фильтры не нужны.

---

### 4. Другой breakpoint

```tsx
<SplitLayoutGlass
  sidebar={<Navigation />}
  main={<Content />}
  breakpoint="lg" // Переключение на 1024px вместо 1440px
/>
```

**Результат:**

- Desktop (≥1024px): 2 колонки с sticky
- Mobile (<1024px): stack

---

### 5. Разные gap для mobile/desktop

```tsx
<SplitLayoutGlass
  sidebar={<Sidebar />}
  main={<Main />}
  gap={{ mobile: 12, desktop: 32 }} // 12px на мобильных, 32px на desktop
/>
```

---

## 🔑 Ключевые паттерны

### 1. Sticky scroll behavior

```tsx
// КРИТИЧНО: эти классы применяются ТОЛЬКО на desktop
`${breakpoint}:sticky``${breakpoint}:top-[var(--sticky-offset)]``${breakpoint}:max-h-[var(--sticky-max-height)]`;
```

**Почему:**

- На мобильных sticky не нужен (одна колонка)
- `max-height` ограничивает высоту → независимая прокрутка работает
- CSS variables для динамических значений

---

### 2. Минимальная ширина через minmax()

```tsx
// ❌ ПЛОХО: может сжаться до нечитаемости
grid-template-columns: 1fr 2fr

// ✅ ХОРОШО: минимум 300px гарантирован
grid-template-columns: minmax(300px, 1fr) 2fr
```

**Вычисление:**

```tsx
const gridTemplate = maxSidebarWidth
  ? `minmax(${minSidebarWidth}, ${maxSidebarWidth}) ${ratio.main}fr`
  : `minmax(${minSidebarWidth}, ${ratio.sidebar}fr) ${ratio.main}fr`;
```

---

### 3. Responsive через CSS variables

```tsx
style={{
  '--grid-template': 'minmax(300px, 1fr) 2fr',
  '--sticky-offset': '24px',
  '--sticky-max-height': 'calc(100vh - 48px)',
}}

className="xl:grid-cols-[var(--grid-template)]"
```

**Преимущества:**

- Динамические значения из props
- Чистый CSS, без JavaScript
- Работает с Tailwind arbitrary values

---

### 4. Структура sidebar с ScrollArea

```tsx
<aside className="xl:sticky xl:flex xl:flex-col xl:overflow-hidden">
  <GlassCard className="h-full">
    {/* Пользователь должен передать: */}
    <>
      <div className="shrink-0">Header</div>
      <ScrollArea className="flex-1 min-h-0">Content</ScrollArea>
    </>
  </GlassCard>
</aside>
```

**ВАЖНО:** Пользователь сам структурирует контент sidebar!

---

## 🎓 Заключение

Этот компонент решает **классическую проблему split layouts** с поведением как в **MDN, GitHub Docs,
Linear**:

### ✅ Что компонент делает:

1. **Sticky scroll** - прокрутка вместе, затем независимо
2. **Responsive** - 2 колонки на desktop, 1 на mobile
3. **Минимальная ширина** - sidebar не сжимается через minmax()
4. **Glassmorphism** - красивый визуал через GlassCard
5. **Гибкость** - настраиваемые breakpoints, gap, ratio

### ✅ Что пользователь делает:

1. **Структурирует sidebar** - сам добавляет `shrink-0` и `ScrollArea`
2. **Структурирует main** - сам организует layout внутри
3. **Настраивает внешний вид** - через className props

### 🎯 Ключ к успеху:

```tsx
// 1. Минимальная ширина через minmax()
grid-template-columns: minmax(300px, 1fr) 2fr

// 2. Sticky ТОЛЬКО на desktop
className="xl:sticky xl:max-h-[calc(100vh-3rem)]"

// 3. Пользователь управляет структурой
<div className="shrink-0">Header</div>
<ScrollArea className="flex-1 min-h-0">Content</ScrollArea>

// 4. CSS variables для динамики
style={{ '--grid-template': gridTemplate }}
```

**Результат:** Простой, мощный, гибкий компонент для современных split layouts! 🚀
