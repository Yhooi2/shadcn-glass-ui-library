# Полный аудит и план рефакторинга Glass UI Library

## Стратегия публикации

**Имя пакета:** `shadcn-glass-ui`
**Подход:** Hybrid (Registry-first)
**Приоритет:** Внутренний рефакторинг → Публикация

---

## Конкурентный анализ

| Аспект | @crenspire/glass-ui | glasscn-ui | **shadcn-glass-ui** |
|--------|---------------------|------------|---------------------|
| Компоненты | 40+ | 20+ | 31 |
| Темы | Light/Dark | Light/Dark | **Glass/Light/Aurora** |
| Варианты | Glass/Frosted/Fluted/Crystal | Glass | По intensity |
| Stack | Radix UI | shadcn + Tailwind v3 | **React 19 + Tailwind v4** |
| Тестирование | ? | Базовые | **421 visual test** |

### Уникальные преимущества

1. **Aurora тема** — gradient glassmorphism, уникальная
2. **Modern stack** — React 19, Tailwind v4, Storybook 10, Vitest 4
3. **421 visual test** — гарантия качества при обновлениях
4. **Оптимизированные токены** — 85 vs 200+ переменных
5. **Business-ready composites** — MetricCard, TrustScore, ProfileHeader, CareerStats
6. **Real demo** — GitHub Analytics dashboard

### Фичи для заимствования у конкурентов

- **4 Glass варианта** (Glass/Frosted/Fluted/Crystal) — от @crenspire/glass-ui
- **Wallpaper Tinting** — адаптация к фону — от @crenspire/glass-ui
- **CircularProgress** — круговой прогресс — от glasscn-ui
- **ComboBox** — поиск + select — от shadcn/ui

---

## Резюме аудита

### Оценка качества: 5.5/10

| Категория            | Статус          | Критичность |
| -------------------- | --------------- | ----------- |
| React антипаттерны   | 13+ компонентов | ВЫСОКАЯ     |
| Захардкоженные цвета | 150+ значений   | КРИТИЧЕСКАЯ |
| Дублирование кода    | 15+ паттернов   | ВЫСОКАЯ     |
| TypeScript проблемы  | Средние         | СРЕДНЯЯ     |
| Тестовое покрытие    | 245+ тестов     | ХОРОШО      |
| Storybook            | 19 stories      | ХОРОШО      |

---

## 1. Выявленные проблемы

### 1.1 React антипаттерны

**Inline функции в JSX (13 компонентов):**

- ButtonGlass, InputGlass, ModalGlass, DropdownGlass
- HeaderNavGlass, RepoCardGlass, SliderGlass, MetricCardGlass
- CheckboxGlass, GlassCard, NotificationGlass, TooltipGlass

**Отсутствие мемоизации (12 компонентов):**

- getVariantStyles(), getTypeConfig(), getGradientColors()
- Все пересчитываются на каждый рендер

**Большие компоненты без декомпозиции:**

- DesktopShowcase.tsx (500+ строк)
- ComponentShowcase.tsx (400+ строк)
- RepoCardGlass.tsx (250+ строк)

### 1.2 Захардкоженные значения

**Цвета (50+ hex, 100+ rgba):**

```tsx
// ButtonGlass.tsx
boxShadow: "0 4px 15px rgba(124,58,237,0.25)"

// ProgressGlass.tsx
from: "#8b5cf6", to: "#a855f7"

// ModalGlass.tsx
background: "rgba(255,255,255,0.06)"
```

**Blur значения (5 разных):**

- "blur(8px)", "blur(12px)", "blur(16px)", "blur(20px)", "blur(24px)"

### 1.3 Дублирование кода

**Паттерн hover state (13 компонентов):**

```tsx
const [isHovered, setIsHovered] = useState(false);
onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}
```

**Паттерн получения стилей (8 компонентов):**

```tsx
const getConfig = () => {
  const config: Record<Type, Config> = { ... };
  return config[variant];
};
```

**Паттерн isGlass проверки (15 компонентов):**

```tsx
const isGlass = theme === 'glass';
```

### 1.4 Несогласованность CSS и TS

- glass-theme.css использует oklch()
- themeStyles.ts использует rgba()
- 12+ неиспользуемых CSS utility классов
- 3 неиспользуемых анимации

---

## 2. Маппинг Glass → shadcn компонентов

| Glass компонент   | shadcn компонент      | Radix зависимость             |
| ----------------- | --------------------- | ----------------------------- |
| ButtonGlass       | @shadcn/button        | @radix-ui/react-slot          |
| InputGlass        | @shadcn/input         | -                             |
| GlassCard         | @shadcn/card          | -                             |
| ModalGlass        | @shadcn/dialog        | @radix-ui/react-dialog        |
| DropdownGlass     | @shadcn/dropdown-menu | @radix-ui/react-dropdown-menu |
| TabsGlass         | @shadcn/tabs          | @radix-ui/react-tabs          |
| CheckboxGlass     | @shadcn/checkbox      | @radix-ui/react-checkbox      |
| ToggleGlass       | @shadcn/switch        | @radix-ui/react-switch        |
| SliderGlass       | @shadcn/slider        | @radix-ui/react-slider        |
| ProgressGlass     | @shadcn/progress      | @radix-ui/react-progress      |
| BadgeGlass        | @shadcn/badge         | @radix-ui/react-slot          |
| AlertGlass        | @shadcn/alert         | -                             |
| AvatarGlass       | @shadcn/avatar        | @radix-ui/react-avatar        |
| TooltipGlass      | @shadcn/tooltip       | @radix-ui/react-tooltip       |
| SkeletonGlass     | @shadcn/skeleton      | -                             |
| NotificationGlass | @shadcn/sonner        | sonner                        |

**Дополнительные shadcn компоненты для добавления:**

- @shadcn/collapsible - для FlagsSectionGlass, CareerStatsGlass
- @shadcn/separator - для разделителей
- @shadcn/scroll-area - для длинных списков
- @shadcn/popover - для HeaderNavGlass search
- @shadcn/navigation-menu - для HeaderNavGlass

---

## 3. Архитектура рефакторинга

### Выявленные дублирования и проблемы:

| Проблема                                                   | Действие                                            |
| ---------------------------------------------------------- | --------------------------------------------------- |
| RepoCardGlass + RepositoryCardGlass (дублирование)         | Удалить RepoCardGlass, оставить RepositoryCardGlass |
| ProgressGlass + RainbowProgressGlass (дублирование логики) | Извлечь BaseProgressGlass                           |
| ProfileHeaderGlass монолитная                              | Разбить на части                                    |

### Новая структура директорий (5 уровней):

```
src/
├── components/
│   ├── ui/                    # Чистые shadcn компоненты (без изменений)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── glass/
│   │   ├── primitives/        # Level 0: Glass примитивы
│   │   │   ├── glass-surface.tsx
│   │   │   ├── glass-glow.tsx
│   │   │   └── glass-blur.tsx
│   │   │
│   │   ├── ui/                # Level 1: Базовые UI компоненты (14)
│   │   │   ├── button-glass.tsx
│   │   │   ├── input-glass.tsx
│   │   │   ├── badge-glass.tsx
│   │   │   ├── alert-glass.tsx
│   │   │   ├── checkbox-glass.tsx
│   │   │   ├── toggle-glass.tsx
│   │   │   ├── tabs-glass.tsx
│   │   │   ├── tooltip-glass.tsx
│   │   │   ├── slider-glass.tsx
│   │   │   ├── skeleton-glass.tsx
│   │   │   ├── modal-glass.tsx
│   │   │   ├── dropdown-glass.tsx
│   │   │   ├── avatar-glass.tsx
│   │   │   └── notification-glass.tsx
│   │   │
│   │   ├── specialized/       # Level 2: Специализированные (7)
│   │   │   ├── status-indicator-glass.tsx
│   │   │   ├── segmented-control-glass.tsx
│   │   │   ├── base-progress-glass.tsx    # НОВЫЙ: базовый прогресс
│   │   │   ├── progress-glass.tsx         # extends BaseProgress
│   │   │   ├── rainbow-progress-glass.tsx # extends BaseProgress
│   │   │   ├── profile-avatar-glass.tsx
│   │   │   ├── language-bar-glass.tsx
│   │   │   └── flag-alert-glass.tsx
│   │   │
│   │   ├── composite/         # Level 3: Составные (5, убрали дубль)
│   │   │   ├── glass-card.tsx
│   │   │   ├── metric-card-glass.tsx
│   │   │   ├── year-card-glass.tsx
│   │   │   ├── ai-card-glass.tsx
│   │   │   └── repository-card-glass.tsx  # ЕДИНСТВЕННЫЙ (удалён RepoCardGlass)
│   │   │
│   │   └── sections/          # Level 4: Секции страниц (6)
│   │       ├── header-nav-glass.tsx
│   │       ├── profile-header/            # ДЕКОМПОЗИЦИЯ
│   │       │   ├── index.tsx              # ProfileHeaderGlass (композиция)
│   │       │   ├── profile-info.tsx       # Имя, username, дата
│   │       │   └── profile-stats.tsx      # repos, followers, following
│   │       ├── career-stats-glass.tsx
│   │       ├── flags-section-glass.tsx
│   │       ├── trust-score-card-glass.tsx
│   │       └── projects-list-glass.tsx
│   │
│   └── pages/                 # Level 5: Demo страницы
│       ├── component-showcase.tsx
│       ├── desktop-showcase.tsx
│       └── mobile-showcase.tsx
│
├── lib/
│   ├── utils.ts
│   ├── theme/
│   │   ├── context.tsx
│   │   ├── tokens.ts
│   │   ├── styles.ts
│   │   └── animations.ts
│   │
│   └── hooks/
│       ├── use-hover.ts
│       ├── use-focus.ts
│       └── use-glass-styles.ts
│
└── styles/
    ├── globals.css
    └── glass-theme.css
```

### Граф зависимостей компонентов:

```
Level 0: Primitives
  └── GlassSurface, GlassGlow, GlassBlur

Level 1: UI (14 компонентов)
  └── ButtonGlass, InputGlass, BadgeGlass, AlertGlass...
      ↑ extends shadcn/ui + Glass primitives

Level 2: Specialized (7 компонентов)
  ├── StatusIndicatorGlass
  ├── BaseProgressGlass ─┬─→ ProgressGlass
  │                      └─→ RainbowProgressGlass
  ├── ProfileAvatarGlass (uses AvatarGlass)
  ├── LanguageBarGlass
  └── FlagAlertGlass (uses StatusIndicatorGlass)

Level 3: Composite (5 компонентов)
  ├── GlassCard (базовый контейнер)
  ├── MetricCardGlass (GlassCard + ProgressGlass)
  ├── YearCardGlass (GlassCard + ProgressGlass + BadgeGlass)
  ├── AICardGlass (GlassCard + ButtonGlass)
  └── RepositoryCardGlass (GlassCard + StatusIndicatorGlass + ButtonGlass)

Level 4: Sections (6 компонентов)
  ├── HeaderNavGlass
  ├── ProfileHeaderGlass
  │   ├── ProfileInfo
  │   ├── ProfileStats
  │   ├── ProfileAvatarGlass
  │   ├── LanguageBarGlass
  │   └── AICardGlass
  ├── CareerStatsGlass (YearCardGlass list)
  ├── FlagsSectionGlass (FlagAlertGlass list)
  ├── TrustScoreCardGlass (RainbowProgressGlass + MetricCardGlass list)
  └── ProjectsListGlass (RepositoryCardGlass list)

Level 5: Pages
  ├── ComponentShowcase
  ├── DesktopShowcase
  └── MobileShowcase
```

### Принцип разделения:

```
┌─────────────────────────────────────────────────────────┐
│                    Glass Design System                   │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Design Tokens (lib/theme/tokens.ts)    ││
│  │  - Цвета, градиенты, тени, blur, spacing, анимации ││
│  └─────────────────────────────────────────────────────┘│
│                           ↓                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │           Glass Primitives (glass/primitives/)      ││
│  │  - GlassSurface, GlassGlow, GlassBlur              ││
│  └─────────────────────────────────────────────────────┘│
│                           ↓                              │
│  ┌─────────────────────────────────────────────────────┐│
│  │         Glass Components (glass/components/)        ││
│  │  - ButtonGlass = shadcn/button + Glass primitives  ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Pure shadcn/ui (components/ui/)            │
│  - Без изменений, стандартные компоненты               │
│  - Могут использоваться отдельно от glass дизайна      │
└─────────────────────────────────────────────────────────┘
```

---

## 4. План рефакторинга

### Решения по стратегии:

- **API**: Переход на shadcn API (variants, sizes)
- **Миграция**: Постепенная (A) с визуальными тестами для 100% сохранения дизайна
- **Структура**: `components/glass/components/`
- **Stories**: Создать для всех composite компонентов

---

### Фаза -1: Исследование фич конкурентов ✅ ЗАВЕРШЕНО

#### -1.1 Glass варианты ✅ ИССЛЕДОВАНО

**Результаты исследования @crenspire/glass-ui:**

| Вариант | Blur | Opacity | Saturation | Эффект |
|---------|------|---------|------------|--------|
| **Glass** | 20px | 0.05-0.1 | 180% | Стандартный glassmorphism |
| **Frosted** | 30px | 0.08-0.15 | 100% | Сильное размытие, матовый |
| **Fluted** | 16px | 0.06-0.12 | 120% | Рифлёный через mask-image |
| **Crystal** | 8px | 0.15-0.25 | 200% | Чёткий + brightness 1.1 |

**Финальные CSS спецификации:**

```css
/* Glass — стандартный */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Frosted — матовый (максимальный blur) */
.frosted {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px) saturate(100%);
  -webkit-backdrop-filter: blur(30px) saturate(100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Fluted — рифлёный (вертикальные полосы) */
.fluted {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  mask-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 0px 8px,
    rgba(0, 0, 0, 0.75) 8px 10px
  );
  -webkit-mask-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 0px 8px,
    rgba(0, 0, 0, 0.75) 8px 10px
  );
}

/* Crystal — кристальный (минимальный blur, яркий) */
.crystal {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px) saturate(200%) brightness(1.1);
  -webkit-backdrop-filter: blur(8px) saturate(200%) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
```

**Решение:** Добавить `glassVariant` prop параллельно с существующим `intensity`:
```tsx
type GlassVariant = 'glass' | 'frosted' | 'fluted' | 'crystal';
```

**Задачи:**
- [x] Изучить исходники @crenspire/glass-ui
- [x] Проанализировать CSS техники для Fluted эффекта
- [x] Решить: добавить glassVariant как отдельный prop
- [x] Создать CSS utilities в glass-theme.css ✅ ЗАВЕРШЕНО
- [x] Создать прототипы в Storybook ✅ ЗАВЕРШЕНО

#### -1.2 Исследовать Wallpaper Tinting

**Цель:** Адаптация UI к фоновому изображению

**Предлагаемый API:**

```tsx
// Хук
const { tintColor, isLoading } = useWallpaperTint(imageUrl);

// Или Provider
<WallpaperProvider image={backgroundUrl}>
  <GlassCard /> {/* Автоматически получает tint */}
</WallpaperProvider>
```

**Задачи:**
- [ ] Изучить canvas sampling техники
- [ ] Определить API: хук vs Provider
- [ ] Оценить производительность

#### -1.3 CircularProgress ✅ ИССЛЕДОВАНО

**SVG техника (stroke-dasharray + stroke-dashoffset):**

```typescript
// Ключевая формула
const circumference = 2 * Math.PI * radius;
const dashOffset = circumference * ((100 - value) / 100);
```

**Финальный Props API:**

```tsx
interface CircularProgressGlassProps {
  // Progress
  value?: number;                    // 0-100 for determinate
  variant?: 'determinate' | 'indeterminate';

  // Sizing
  size?: number;                     // Diameter in px (default: 120)
  thickness?: number;                // Stroke width (default: 8)
  trackWidth?: number;               // Background track width (default: 8)

  // Colors
  color?: string;                    // Progress color (default: theme primary)
  trackColor?: string;               // Track color (default: rgba(255,255,255,0.1))

  // Label
  showLabel?: boolean;               // Show % in center (default: true)
  label?: string;                    // Custom label text

  // Glassmorphism
  showGlow?: boolean;                // Glow effect (default: true)
  glowIntensity?: 'low' | 'medium' | 'high';

  // Animation
  strokeLinecap?: 'round' | 'butt' | 'square';
  animationDuration?: number;        // Seconds (default: 1)
}
```

**CSS анимация для indeterminate:**

```css
@keyframes circular-progress-spin {
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 47;
  }
  100% {
    transform: rotate(360deg);
    stroke-dashoffset: 187;
  }
}

.animate-circular-progress-spin {
  animation: circular-progress-spin 1.4s ease-in-out infinite;
  transform-origin: center;
}
```

**Glow эффект (SVG filter):**

```tsx
<defs>
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
```

**Задачи:**
- [x] Изучить реализацию SVG circular progress
- [x] Определить Props API
- [x] Спецификация glow эффекта
- [x] Создать компонент CircularProgressGlass ✅ ЗАВЕРШЕНО
- [x] Добавить Storybook stories ✅ ЗАВЕРШЕНО
- [x] Добавить visual regression тесты ✅ ЗАВЕРШЕНО

#### -1.4 ComboBox ✅ ИССЛЕДОВАНО

**Архитектура shadcn/ui Combobox:**

```
ComboBox = Popover + Command (cmdk) + Button
```

- `Popover` — контейнер выпадающего списка
- `Command` (cmdk) — поиск + навигация клавиатурой
- `CommandInput` — поле поиска
- `CommandList` → `CommandGroup` → `CommandItem`
- `Button` с `role="combobox"` — триггер

**Финальный Props API:**

```tsx
interface ComboBoxGlassProps<T> {
  // Data
  options: T[];
  value?: T;
  onChange?: (value: T) => void;

  // Display
  placeholder?: string;
  emptyText?: string;              // "No results found"
  searchPlaceholder?: string;      // "Search..."

  // Async support
  async?: {
    loadOptions: (search: string) => Promise<T[]>;
    debounceMs?: number;           // default: 300
  };

  // Rendering
  renderOption?: (option: T) => React.ReactNode;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;

  // Glass styling
  glassVariant?: 'glass' | 'frosted' | 'fluted' | 'crystal';

  // Standard
  disabled?: boolean;
  className?: string;
}
```

**Структура компонента:**

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox" className="glass-combobox-trigger">
      {value ? getOptionLabel(value) : placeholder}
      <ChevronsUpDownIcon />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="glass-combobox-content">
    <Command>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem key={getOptionValue(option)} onSelect={...}>
              <CheckIcon className={value === option ? 'opacity-100' : 'opacity-0'} />
              {renderOption ? renderOption(option) : getOptionLabel(option)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
```

**Зависимости:**
- `cmdk` — уже установлен
- `@radix-ui/react-popover` — уже установлен

**Задачи:**
- [x] Изучить shadcn/ui Combobox архитектуру
- [x] Определить Props API
- [x] Установить базовые shadcn компоненты (popover, command) ✅ ЗАВЕРШЕНО
- [x] Создать ComboBoxGlass с glass стилизацией ✅ ЗАВЕРШЕНО
- [x] Добавить Storybook stories ✅ ЗАВЕРШЕНО
- [x] Добавить visual regression тесты ✅ ЗАВЕРШЕНО

**Файлы созданы:** ✅
- ✅ `src/components/glass/ui/circular-progress-glass.tsx` (212 строк)
- ✅ `src/components/glass/ui/combobox-glass.tsx` (200 строк)
- ⏳ `src/lib/hooks/use-wallpaper-tint.ts` (TODO)
- ✅ `src/styles/utilities/glass-variants.css` (216 строк)
- ✅ `src/components/glass/ui/CircularProgressGlass.stories.tsx` (10 stories)
- ✅ `src/components/glass/ui/ComboBoxGlass.stories.tsx` (8 stories)
- ✅ `src/components/__visual__/new-components.visual.test.tsx` (21 тестов × 3 темы = 63 теста)

---

### Фаза 0: Подготовка visual тестов (ПЕРВЫЙ ПРИОРИТЕТ)

**Цель**: Обеспечить 100% сохранение дизайна при рефакторинге

**0.1 Аудит существующих visual тестов:**

```bash
npx vitest --project=visual --run  # Убедиться что все тесты проходят
```

**0.2 Добавить недостающие visual тесты:**

- Все состояния каждого компонента (hover, focus, active, disabled)
- Все варианты (primary, ghost, text, etc.)
- Все размеры (sm, md, lg, xl)
- Все темы (glass, light, aurora)

**0.3 Снизить threshold для точности:**

```tsx
// vite.config.ts
comparatorOptions: {
  threshold: 0.02,  // 2% вместо 10%
  allowedMismatchedPixelRatio: 0.005, // 0.5% вместо 2%
}
```

**0.4 Создать baseline screenshots:**

```bash
npm run test:visual:update  # Сохранить эталонные скриншоты
```

**0.5 Создать visual тесты для composite компонентов:**

- StatusIndicatorGlass (все статусы, размеры)
- SegmentedControlGlass (все состояния)
- RainbowProgressGlass (все значения)
- MetricCardGlass (все цвета)
- ProfileAvatarGlass
- И остальные 10 composite компонентов

---

### Фаза 1: Подготовка инфраструктуры

**1.1 Создать design tokens (lib/theme/tokens.ts):**

```tsx
export const glassTokens = {
  colors: {
    primary: { 50: '...', 100: '...', ..., 900: '...' },
    // Все цвета из themeStyles.ts
  },
  blur: {
    xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px'
  },
  shadows: {
    glow: { sm: '...', md: '...', lg: '...' }
  },
  // ...
} as const;
```

**1.2 Создать custom hooks (lib/hooks/):**

```tsx
// use-hover.ts
export function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);
  // ... event listeners
  return { ref, isHovered };
}

// use-glass-styles.ts
export function useGlassStyles(variant: string) {
  const { theme } = useTheme();
  return useMemo(() => getGlassStyles(theme, variant), [theme, variant]);
}
```

**1.3 Установить shadcn компоненты:**

```bash
npx shadcn add button input card dialog dropdown-menu tabs checkbox switch slider progress badge alert avatar tooltip skeleton sonner collapsible separator scroll-area popover navigation-menu
```

### Фаза 2: Рефакторинг core компонентов

**Порядок миграции (по зависимостям):**

1. ButtonGlass → extends @shadcn/button
2. InputGlass → extends @shadcn/input
3. CheckboxGlass → extends @shadcn/checkbox
4. ToggleGlass → extends @shadcn/switch
5. SliderGlass → extends @shadcn/slider
6. ProgressGlass → extends @shadcn/progress
7. BadgeGlass → extends @shadcn/badge
8. AlertGlass → extends @shadcn/alert
9. AvatarGlass → extends @shadcn/avatar
10. TooltipGlass → extends @shadcn/tooltip
11. SkeletonGlass → extends @shadcn/skeleton
12. GlassCard → extends @shadcn/card
13. TabsGlass → extends @shadcn/tabs
14. DropdownGlass → extends @shadcn/dropdown-menu
15. ModalGlass → extends @shadcn/dialog
16. NotificationGlass → extends @shadcn/sonner

**Паттерн миграции компонента:**

```tsx
// До: ButtonGlass.tsx (полностью кастомный)
export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  ({ variant, size, ... }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const getVariantStyles = () => { /* ... */ };
    // 150 строк кода
  }
);

// После: button-glass.tsx (extends shadcn)
import { Button, type ButtonProps } from "@/components/ui/button";
import { useGlassStyles } from "@/lib/hooks/use-glass-styles";
import { cn } from "@/lib/utils";

export interface ButtonGlassProps extends ButtonProps {
  glassIntensity?: "subtle" | "medium" | "strong";
}

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  ({ className, glassIntensity = "medium", ...props }, ref) => {
    const glassStyles = useGlassStyles("button", glassIntensity);

    return (
      <Button
        ref={ref}
        className={cn(glassStyles, className)}
        {...props}
      />
    );
  }
);
```

### Фаза 3: Рефакторинг стилей

**3.1 Миграция цветов в CSS переменные:**

```css
/* glass-theme.css */
:root {
  /* Primary */
  --glass-primary-50: oklch(0.97 0.02 280);
  --glass-primary-500: oklch(0.55 0.25 280);
  --glass-primary-glow: 0 0 16px oklch(0.55 0.25 280 / 0.5);

  /* Blur */
  --glass-blur-xs: 4px;
  --glass-blur-sm: 8px;
  --glass-blur-md: 12px;

  /* ... */
}
```

**3.2 Удалить захардкоженные значения:**

- Заменить все `rgba(...)` на `var(--glass-...)`
- Заменить все `#hex` на `var(--glass-...)`
- Заменить все `blur(Xpx)` на `var(--glass-blur-...)`

**3.3 Удалить неиспользуемые CSS:**

- .glass-modal-overlay
- .glass-dropdown
- Анимации: color-shift, pulse-ring, dropdownFadeIn

### Фаза 4: Декомпозиция и объединение компонентов

**4.1 УДАЛИТЬ дублирующиеся компоненты:**

| Удалить           | Оставить                | Причина               |
| ----------------- | ----------------------- | --------------------- |
| RepoCardGlass.tsx | RepositoryCardGlass.tsx | Идентичный функционал |

**4.2 СОЗДАТЬ базовые компоненты (извлечение общей логики):**

```tsx
// BaseProgressGlass.tsx - НОВЫЙ
interface BaseProgressGlassProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  renderFill: (percentage: number) => React.ReactNode;
}

// ProgressGlass.tsx теперь extends BaseProgressGlass
// RainbowProgressGlass.tsx теперь extends BaseProgressGlass
```

**4.3 ДЕКОМПОЗИЦИЯ ProfileHeaderGlass:**

```
ProfileHeaderGlass/
├── index.tsx              # Композиция всех частей
├── profile-info.tsx       # Левая часть: имя, username, joinDate, иконки
├── profile-stats.tsx      # Статистика: repos, followers, following
└── (использует существующие)
    ├── ProfileAvatarGlass
    ├── LanguageBarGlass
    └── AICardGlass
```

**4.4 ДЕКОМПОЗИЦИЯ DesktopShowcase:**

```tsx
// DesktopShowcase.tsx → разбить на секции:
DesktopShowcase/
├── index.tsx              # Главная композиция
├── desktop-header.tsx     # HeaderNavGlass wrapper
├── desktop-profile.tsx    # ProfileHeaderGlass + TrustScoreCardGlass
├── desktop-career.tsx     # CareerStatsGlass + FlagsSectionGlass
└── desktop-projects.tsx   # ProjectsListGlass
```

**4.5 ДЕКОМПОЗИЦИЯ ComponentShowcase:**

```tsx
ComponentShowcase/
├── index.tsx
├── buttons-section.tsx
├── inputs-section.tsx
├── toggles-section.tsx
├── progress-section.tsx
├── badges-section.tsx
└── modals-section.tsx
```

**4.6 Создать stories для ВСЕХ composite компонентов (15 файлов): ✅ ЗАВЕРШЕНО (15/15)**

| Компонент             | Story файл                        | Варианты для покрытия                   | Статус |
| --------------------- | --------------------------------- | --------------------------------------- | ------ |
| StatusIndicatorGlass  | StatusIndicatorGlass.stories.tsx  | online/away/busy/offline × normal/large | ✅     |
| SegmentedControlGlass | SegmentedControlGlass.stories.tsx | 2-5 сегментов, disabled                 | ✅     |
| RainbowProgressGlass  | RainbowProgressGlass.stories.tsx  | 0-100%, sm/md/lg                        | ✅     |
| LanguageBarGlass      | LanguageBarGlass.stories.tsx      | 1-5 языков                              | ✅     |
| MetricCardGlass       | MetricCardGlass.stories.tsx       | violet/blue/emerald/amber               | ✅     |
| ProfileAvatarGlass    | ProfileAvatarGlass.stories.tsx    | sm/md/lg, with/without glow             | ✅     |
| FlagAlertGlass        | FlagAlertGlass.stories.tsx        | warning/danger types                    | ✅     |
| YearCardGlass         | YearCardGlass.stories.tsx         | expanded/collapsed                      | ✅     |
| AICardGlass           | AICardGlass.stories.tsx           | with/without features                   | ✅     |
| HeaderNavGlass        | HeaderNavGlass.stories.tsx        | search states, theme toggle             | ✅     |
| TrustScoreCardGlass   | TrustScoreCardGlass.stories.tsx   | various scores                          | ✅     |
| ProfileHeaderGlass    | ProfileHeaderGlass.stories.tsx    | full data, minimal data                 | ✅     |
| CareerStatsGlass      | CareerStatsGlass.stories.tsx      | expanded/collapsed years                | ✅     |
| FlagsSectionGlass     | FlagsSectionGlass.stories.tsx     | 0-5 flags, expanded/collapsed           | ✅     |
| RepositoryCardGlass   | RepositoryCardGlass.stories.tsx   | expanded/collapsed, with issues         | ✅     |

**4.7 Структура каждого story файла:**

```tsx
// StatusIndicatorGlass.stories.tsx
const meta = {
  title: 'Glass/Composite/StatusIndicatorGlass',
  component: StatusIndicatorGlass,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['online', 'away', 'busy', 'offline'] },
    size: { control: 'select', options: ['normal', 'large'] },
  },
} satisfies Meta<typeof StatusIndicatorGlass>;

export const Online: Story = { args: { status: 'online' } };
export const Away: Story = { args: { status: 'away' } };
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4">
      {['online', 'away', 'busy', 'offline'].map((s) => (
        <StatusIndicatorGlass key={s} status={s} />
      ))}
    </div>
  ),
};
```

### Фаза 5: Оптимизация производительности

**5.1 Добавить мемоизацию:**

```tsx
// Все style функции
const variantStyles = useMemo(() => getVariantStyles(variant), [variant]);

// Все callback'и
const handleClick = useCallback(() => { ... }, [deps]);

// Wrap компоненты
export const ButtonGlass = memo(forwardRef<...>(...));
```

**5.2 Исправить useEffect в ModalGlass и DropdownGlass:**

```tsx
// Объединить listeners в один useEffect
useEffect(() => {
  if (!isOpen) return;

  const handleEscape = (e: KeyboardEvent) => { ... };
  const handleClickOutside = (e: MouseEvent) => { ... };

  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]); // Убрать handleClose из deps
```

### Фаза 6: Улучшение тестов

**6.1 Усилить play() функции:**

```tsx
async play({ canvasElement }) {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");

  // Проверить начальное состояние
  await expect(button).toHaveClass("glass-button");
  await expect(button).toHaveStyle({ backdropFilter: "blur(12px)" });

  // Проверить hover
  await userEvent.hover(button);
  await expect(button).toHaveClass("glass-button-hovered");

  // Проверить accessibility
  await expect(button).toHaveAccessibleName("Button text");
}
```

**6.2 Включить A11y тесты:**

```tsx
// preview.ts
parameters: {
  a11y: {
    test: 'error', // Изменить с 'todo' на 'error'
  },
}
```

**6.3 Снизить visual test threshold:**

```tsx
// vite.config.ts
comparatorOptions: {
  threshold: 0.05,  // Было 0.1
  allowedMismatchedPixelRatio: 0.01, // Было 0.02
}
```

---

## 5. Файлы для модификации

### Критичные (полный рефакторинг):

1. src/components/DesktopShowcase.tsx
2. src/components/ComponentShowcase.tsx
3. src/components/ModalGlass.tsx
4. src/components/DropdownGlass.tsx
5. src/lib/themeStyles.ts → tokens.ts

### Высокий приоритет:

6. src/components/ButtonGlass.tsx
7. src/components/SliderGlass.tsx
8. src/components/ProgressGlass.tsx
9. src/components/RepoCardGlass.tsx
10. src/components/HeaderNavGlass.tsx

### Средний приоритет:

11-26. Все остальные Glass компоненты

### Новые файлы для создания:

- src/lib/theme/tokens.ts
- src/lib/theme/animations.ts
- src/lib/hooks/use-hover.ts
- src/lib/hooks/use-focus.ts
- src/lib/hooks/use-glass-styles.ts
- src/components/glass/primitives/glass-surface.tsx
- src/components/glass/primitives/glass-glow.tsx

---

## 6. Оценка трудозатрат

| Фаза               | Компонентов | Оценка  |
| ------------------ | ----------- | ------- |
| 0. Visual тесты    | -           | Средняя |
| 1. Инфраструктура  | -           | Средняя |
| 2. Core компоненты | 16          | Высокая |
| 3. Стили           | -           | Средняя |
| 4. Декомпозиция    | 15          | Средняя |
| 5. Оптимизация     | -           | Низкая  |
| 6. Тесты           | -           | Низкая  |

---

## 7. Риски и митигация

| Риск                       | Митигация                              |
| -------------------------- | -------------------------------------- |
| Breaking changes в API     | Сохранить обратную совместимость props |
| Визуальные регрессии       | Visual tests перед каждым изменением   |
| Потеря glass эффектов      | Тщательная проверка каждого компонента |
| Конфликты с shadcn updates | Минимальные изменения в ui/ папке      |

---

## 8. Критерии успеха

### Визуальная идентичность (ГЛАВНЫЙ ПРИОРИТЕТ):

- [x] Visual тесты проходят для всех компонентов ✅ **484 теста** (было 421)
- [x] Все 3 темы (glass, light, aurora) визуально идентичны оригиналу
- [x] Все состояния (hover, focus, active, disabled) сохранены
- [x] Visual тесты для новых компонентов (+63 теста) ✅
- [ ] threshold снижен до 0.02 (текущий: 0.1)

### Архитектура:

- [x] Все 16 core компонентов используют CVA (class-variance-authority)
- [x] Структура `components/glass/ui/` реализована
- [x] Стили вынесены в CSS variables (`glass-theme.css`)
- [x] 2 новых компонента добавлены (CircularProgress, ComboBox) ✅
- [x] 4 Glass варианта реализованы (glass/frosted/fluted/crystal) ✅
- [ ] Design tokens вынесены в `lib/theme/tokens.ts`

### Качество кода:

- [x] Ноль захардкоженных цветов (все через CSS variables)
- [x] useHover hook создан и используется
- [x] TypeScript strict mode - 0 ошибок ✅
- [ ] useMemo/useCallback для всех style функций
- [ ] React.memo для leaf компонентов

### Документация:

- [x] Stories для 15 composite компонентов ✅
- [x] Stories для новых компонентов (+18 stories) ✅
- [ ] A11y тесты включены (mode: 'error') - сейчас 'warn'
- [ ] ArgTypes и controls для всех props

---

## 9. Порядок выполнения

```
Фаза -1: Исследование конкурентов ✅ ЗАВЕРШЕНО
  ├─ 4 Glass варианта (Glass/Frosted/Fluted/Crystal) ✅
  ├─ Wallpaper Tinting (исследовано)
  ├─ CircularProgress ✅
  └─ ComboBox ✅

Фаза 0: Новые компоненты ✅ ЗАВЕРШЕНО
  ├─ CircularProgressGlass ✅
  ├─ ComboBoxGlass ✅
  ├─ Glass Variants CSS ✅
  ├─ Storybook stories (18) ✅
  └─ Visual regression тесты (63) ✅
                                                   ▼
Фаза 1: CSS Optimization ✅ ЗАВЕРШЕНО
  ├─ Разделить glass-theme.css на модули ✅
  ├─ Оптимизировать переменные (200 → 85) ✅
  ├─ Стандартизировать шкалы ✅
  ├─ Модульная структура (10 файлов) ✅
  ├─ Создан lib/theme/tokens.ts (598 строк) ✅
  └─ Visual тесты: 484/484 passed ✅
                                                   ▼
Фаза 2: Декомпозиция ⏳ В ОЖИДАНИИ
  ├─ ДЕКОМПОЗИЦИЯ ProfileHeaderGlass
  ├─ ДЕКОМПОЗИЦИЯ DesktopShowcase
  ├─ ДЕКОМПОЗИЦИЯ ComponentShowcase
  └─ useWallpaperTint hook (опционально)
                                                   ▼
Фаза 3: Performance Optimization ⏳ В ОЖИДАНИИ
  ├─ React.memo для leaf компонентов
  ├─ useMemo/useCallback оптимизация
  └─ A11y тесты mode: 'error'
                                                   ▼
Фаза 4: Registry Infrastructure ⏳ В ОЖИДАНИИ
  ├─ registry.json
  ├─ package.json exports
  └─ Tailwind preset
                                                   ▼
Фаза 5: Build & Publish ⏳ В ОЖИДАНИИ
  ├─ GitHub Pages
  ├─ npm publish
  └─ shadcn Directory (исследование)
```

### Итоговая статистика компонентов:

| Уровень              | До рефакторинга | Текущий статус                                     |
| -------------------- | --------------- | -------------------------------------------------- |
| Level 0: Primitives  | 0               | 0 (планируется 3: GlassSurface, GlassGlow, Blur)   |
| Level 1: UI          | 16              | **18** ✅ (+CircularProgressGlass, +ComboBoxGlass) |
| Level 2: Specialized | 7               | 7 (BaseProgressGlass - отложен)                    |
| Level 3: Composite   | 6               | 5 (-RepoCardGlass дубликат)                        |
| Level 4: Sections    | 6               | 6 (декомпозиция - в ожидании)                      |
| Level 5: Pages       | 3               | 3 (декомпозиция - в ожидании)                      |
| **Всего**            | **38**          | **40** ✅ (+2 компонента, +4 Glass варианта)       |

**Новые файлы (создано):**
- ✅ CircularProgressGlass (212 строк)
- ✅ ComboBoxGlass (200 строк)
- ✅ glass-variants.css (216 строк)
- ✅ CircularProgressGlass.stories.tsx (10 stories)
- ✅ ComboBoxGlass.stories.tsx (8 stories)
- ✅ new-components.visual.test.tsx (63 теста)

**Visual тесты:**
- Было: 421 тестов
- Стало: **484 тестов** (+63)

**Storybook stories:**
- Было: ~30 stories
- Стало: **~48 stories** (+18)

### Удаляемые файлы:

- `src/components/RepoCardGlass.tsx` (дубликат RepositoryCardGlass)

### Созданные файлы (Фаза 0):

**Компоненты:** ✅
- ✅ `src/components/glass/ui/circular-progress-glass.tsx` (212 строк)
- ✅ `src/components/glass/ui/combobox-glass.tsx` (200 строк)
- ✅ `src/styles/utilities/glass-variants.css` (216 строк)

**Storybook Stories:** ✅
- ✅ `src/components/glass/ui/CircularProgressGlass.stories.tsx` (10 stories)
- ✅ `src/components/glass/ui/ComboBoxGlass.stories.tsx` (8 stories)

**Visual Tests:** ✅
- ✅ `src/components/__visual__/new-components.visual.test.tsx` (21 тестов × 3 темы = 63)

**TODO (отложено):**
- ⏳ `src/lib/hooks/use-wallpaper-tint.ts` (Wallpaper Tinting - опционально)

**Primitives:**
- `src/components/glass/primitives/glass-surface.tsx`
- `src/components/glass/primitives/glass-glow.tsx`
- `src/components/glass/primitives/glass-blur.tsx`

**Декомпозиция:**
- `src/components/glass/specialized/base-progress-glass.tsx`
- `src/components/glass/sections/profile-header/profile-info.tsx`
- `src/components/glass/sections/profile-header/profile-stats.tsx`
- `src/components/pages/desktop-showcase/desktop-header.tsx`
- `src/components/pages/desktop-showcase/desktop-profile.tsx`
- `src/components/pages/desktop-showcase/desktop-career.tsx`
- `src/components/pages/desktop-showcase/desktop-projects.tsx`
- `src/components/pages/component-showcase/buttons-section.tsx`
- `src/components/pages/component-showcase/inputs-section.tsx`
- ... (и другие секции)

**Registry & Publish:**
- `registry/registry.json`
- `src/tailwind/preset.ts`
- `vite.lib.config.ts`
- `.github/workflows/publish.yml`

---

## 10. Детальный аудит по компонентам

### 10.1 Компоненты с inline функциями в JSX (требуют useCallback):

| Компонент         | Файл                  | Строки  | Проблема                             |
| ----------------- | --------------------- | ------- | ------------------------------------ |
| ButtonGlass       | ButtonGlass.tsx       | 54-94   | getVariantStyles() переопределяется  |
| ModalGlass        | ModalGlass.tsx        | 177-188 | onMouseEnter/onMouseLeave inline     |
| DropdownGlass     | DropdownGlass.tsx     | 120-128 | getItemStyles(), getIconStyles()     |
| HeaderNavGlass    | HeaderNavGlass.tsx    | 76-84   | handleSearch(), handleKeyDown()      |
| RepoCardGlass     | RepoCardGlass.tsx     | 105-110 | onKeyDown inline                     |
| SliderGlass       | SliderGlass.tsx       | 47-71   | trackStyles, fillStyles, thumbStyles |
| InputGlass        | InputGlass.tsx        | varies  | style objects recreated              |
| MetricCardGlass   | MetricCardGlass.tsx   | 45-69   | style calculations                   |
| CheckboxGlass     | CheckboxGlass.tsx     | varies  | checkboxStyles                       |
| GlassCard         | GlassCard.tsx         | varies  | cardStyles                           |
| NotificationGlass | NotificationGlass.tsx | 40-47   | getTypeConfig()                      |
| TooltipGlass      | TooltipGlass.tsx      | varies  | style objects                        |
| AlertGlass        | AlertGlass.tsx        | 45-55   | getTypeConfig()                      |

### 10.2 Захардкоженные цвета по файлам:

| Файл                     | Примеры захардкоженных значений                                             |
| ------------------------ | --------------------------------------------------------------------------- |
| ButtonGlass.tsx          | `rgba(124,58,237,0.25)`, `rgba(239,68,68,0.25)`, `rgba(16,185,129,0.25)`    |
| ProgressGlass.tsx        | `#8b5cf6`, `#a855f7`, `#3b82f6`, `#60a5fa`, `#10b981`, `#34d399`            |
| RainbowProgressGlass.tsx | `#f59e0b`, `#fbbf24`, `#84cc16`, `#22c55e`, `#14b8a6`, `#06b6d4`, `#3b82f6` |
| SliderGlass.tsx          | `#8b5cf6`                                                                   |
| ModalGlass.tsx           | `rgba(255,255,255,0.06)`, `rgba(255,255,255,0.12)`, `rgba(168,85,247,0.35)` |
| MetricCardGlass.tsx      | colorGlows объект с rgba                                                    |
| themeStyles.ts           | 170+ свойств с rgba() и hex                                                 |

### 10.3 Дублирование hover state паттерна:

Все эти компоненты имеют идентичный код:

```tsx
const [isHovered, setIsHovered] = useState(false);
// ...
onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}
```

**Компоненты:** ButtonGlass, CheckboxGlass, GlassCard, DropdownGlass, InputGlass, MetricCardGlass,
ModalGlass, NotificationGlass, RepoCardGlass, SliderGlass, TooltipGlass, RepositoryCardGlass,
ProfileAvatarGlass

### 10.4 Неиспользуемые CSS классы (glass-theme.css):

- `.glass-modal` (используется inline styles вместо)
- `.glass-modal-overlay`
- `.glass-dropdown`
- `.glass-dropdown-item`
- `.glass-tabs`
- `.glass-tab`
- `.glass-tooltip`

### 10.5 Неиспользуемые анимации (glass-theme.css):

- `@keyframes color-shift` (lines 644-651)
- `@keyframes pulse-ring` (lines 663-671)
- `@keyframes dropdownFadeIn` (lines 685-693)

---

## 11. Чеклист для каждой фазы

### Фаза 0 Чеклист:

- [x] Запустить `npx vitest --project=visual --run`
- [x] Все существующие тесты проходят (421 тестов)
- [x] Добавлены тесты для hover/focus/disabled состояний
- [x] Добавлены тесты для всех composite компонентов
- [ ] threshold снижен до 0.02
- [x] Baseline screenshots созданы

### Фаза 1 Чеклист:

- [x] shadcn компоненты установлены
- [ ] lib/theme/tokens.ts создан
- [x] lib/hooks/use-hover.ts создан
- [ ] lib/hooks/use-glass-styles.ts создан (УДАЛЁН - не нужен после миграции на CSS variables)
- [x] Структура папок создана (components/glass/ui/, components/glass/composite/, etc.)

### Фаза 2 Чеклист (для каждого компонента):

- [x] Компоненты мигрированы на CVA (class-variance-authority)
- [x] Visual тесты проходят (421 тестов)
- [x] Props API совместим (forwardRef паттерн)
- [x] TypeScript ошибок нет (build проходит)

### Фаза 3 Чеклист:

- [x] Все rgba() заменены на var() - компоненты используют CSS переменные
- [x] Все hex заменены на var() - цвета через CSS variables
- [x] Все blur значения централизованы
- [x] themeStyles.ts УДАЛЁН (deprecated)
- [ ] Неиспользуемый CSS удален (частично)

### Фаза 4 Чеклист:

- [x] RepoCardGlass.tsx удален (DesktopShowcase мигрирован на RepositoryCardGlass)
- [x] BaseProgressGlass - пропущен (текущая реализация достаточна)
- [ ] ProfileHeaderGlass декомпозирован
- [ ] DesktopShowcase декомпозирован
- [ ] ComponentShowcase декомпозирован
- [x] Stories созданы: StatusIndicator, SegmentedControl, MetricCard, RainbowProgress, RepositoryCard (5/15)

### Фаза 5 Чеклист:

- [x] useMemo добавлен для style функций (ModalGlass, DropdownGlass)
- [x] useCallback добавлен для handlers (уже было)
- [ ] React.memo применен к leaf компонентам
- [x] useEffect объединены (DropdownGlass - click outside + escape в одном effect)

### Фаза 6 Чеклист:

- [ ] play() функции усилены
- [x] A11y mode: 'warn' (переключено с 'todo')
- [x] Исправлен импорт Theme в preview.ts (был из удалённого themeStyles)

---

## 12. Систематизация CSS-токенов Glass UI

### Контекст

UI-библиотека с 31 компонентом, ~200+ CSS-переменных в `src/glass-theme.css`.
**Цель:** систематизировать до 80-100 переменных.

### Задачи

| #   | Задача                                                                              | Статус |
| --- | ----------------------------------------------------------------------------------- | ------ |
| 1   | **Анализ** текущего `glass-theme.css` — найти дубли, пробелы в шкалах, избыточность | ✅     |
| 2   | **Исследование** best practices design tokens for shadcn                            | ✅     |
| 3   | **Предложение** системы токенов: spacing, radius, blur, sizing                      | ✅     |
| 4   | **Показать** структуру файла и оценку "было → станет"                               | ✅     |

---

### 12.1 Анализ текущего состояния

#### Статистика файла (1737 строк)

| Категория                | Количество | Проблемы                                    |
| ------------------------ | ---------- | ------------------------------------------- |
| Базовые цвета (shadcn)   | 49         | oklch формат ✅                             |
| Glass переменные         | 8          | ✅ хорошая структура                        |
| Компонентные переменные  | ~180       | ⚠️ Избыточность, дубли                      |
| Glow/Shadow переменные   | ~35        | ⚠️ Много похожих значений                   |
| Status переменные        | 18         | ⚠️ Дублирование (status-online = status-green) |
| Анимации (@keyframes)    | 16         | ⚠️ 3-4 не используются                      |
| Utility классы           | ~25        | ⚠️ Частично не используются                 |

#### Выявленные проблемы

**1. Дублирование цветов status:**
```css
/* Одинаковые значения в 3 местах */
--status-online: #34d399;      /* line 319 */
--status-green: #34d399;       /* line 326 */
--notification-success-color: #34d399;  /* line 363 */
```

**2. Избыточные glow-переменные (35+ штук):**
```css
--glow-primary, --glow-secondary, --glow-success, --glow-warning, --glow-error
--progress-glow, --progress-glow-violet, --progress-glow-blue, --progress-glow-cyan...
--metric-emerald-glow, --metric-amber-glow, --metric-blue-glow, --metric-red-glow
--slider-fill-glow, --slider-thumb-glow
--avatar-glow, --avatar-hover-glow, --profile-avatar-glow
--toggle-glow, --checkbox-glow, --input-focus-glow
--modal-glow, --dropdown-glow, --notification-shadow
--card-hover-glow, --year-card-hover-glow, --ai-card-hover-glow, --repo-card-hover-glow
```

**3. Пробелы в шкале blur:**
```css
--blur-xs: 4px;   /* ✅ */
--blur-sm: 8px;   /* ✅ */
--blur-md: 20px;  /* ⚠️ Скачок 8→20 */
--blur-lg: 24px;  /* ⚠️ Близко к md */
/* Нет --blur-xl */
```

**4. Несистемные компонентные переменные:**
- Каждый компонент имеет собственный набор: `--btn-*`, `--badge-*`, `--input-*`, `--alert-*`...
- Нет переиспользования базовых токенов
- ~180 переменных можно сократить до ~40 через композицию

**5. Дублирование между темами:**
- 3 темы (glass/light/aurora) × ~120 переменных = 360 определений
- Многие значения отличаются только opacity/intensity

---

### 12.2 Best Practices (shadcn/ui + Tailwind v4)

#### shadcn/ui Token Structure (~30 базовых токенов):
```css
:root {
  /* Semantic colors - 16 токенов */
  --background, --foreground
  --card, --card-foreground
  --popover, --popover-foreground
  --primary, --primary-foreground
  --secondary, --secondary-foreground
  --muted, --muted-foreground
  --accent, --accent-foreground
  --destructive, --destructive-foreground
  --border, --input, --ring

  /* Charts - 5 токенов */
  --chart-1 ... --chart-5

  /* Sizing - 4 токена */
  --radius, --radius-sm, --radius-md, --radius-lg
}
```

#### Tailwind v4 @theme Directive:
```css
@theme {
  --spacing: 0.25rem;           /* Base unit (4px) */
  --color-*: oklch(...);        /* Color palette */
  --font-*: "Inter", sans-serif; /* Typography */
  --ease-*: cubic-bezier(...);  /* Animations */
  --blur-*: Npx;                /* Effects */
}
```

#### 8-Point Grid System:
```
4px  → xs, spacing-1
8px  → sm, spacing-2
12px → md, spacing-3
16px → base, spacing-4
24px → lg, spacing-6
32px → xl, spacing-8
48px → 2xl, spacing-12
64px → 3xl, spacing-16
```

---

### 12.3 Предложение новой системы токенов

#### Уровень 1: Primitive Tokens (неизменяемые)

```css
@theme {
  /* ===== SPACING (8-point grid) ===== */
  --spacing: 0.25rem;  /* 4px base */

  /* ===== BLUR SCALE ===== */
  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 20px;
  --blur-xl: 32px;

  /* ===== RADIUS SCALE ===== */
  --radius: 0.75rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-full: 9999px;

  /* ===== OPACITY SCALE ===== */
  --opacity-subtle: 0.03;
  --opacity-light: 0.05;
  --opacity-medium: 0.08;
  --opacity-strong: 0.15;
  --opacity-solid: 0.25;

  /* ===== GLOW INTENSITY ===== */
  --glow-sm: 8px;
  --glow-md: 16px;
  --glow-lg: 24px;
  --glow-xl: 40px;

  /* ===== TRANSITION ===== */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
}
```

#### Уровень 2: Semantic Tokens (per theme)

```css
:root {
  /* ===== CORE (shadcn standard) ===== */
  --background: oklch(...);
  --foreground: oklch(...);
  --primary: oklch(...);
  --primary-foreground: oklch(...);
  /* ... остальные 16 shadcn токенов */

  /* ===== GLASS-SPECIFIC (6 tokens) ===== */
  --glass-bg: rgba(255, 255, 255, var(--opacity-light));
  --glass-border: rgba(255, 255, 255, 0.10);
  --glass-blur: var(--blur-lg);

  /* ===== STATUS COLORS (4 tokens, не 18!) ===== */
  --status-success: oklch(0.75 0.18 160);
  --status-warning: oklch(0.85 0.18 85);
  --status-error: oklch(0.70 0.20 25);
  --status-info: oklch(0.65 0.18 250);

  /* ===== SEMANTIC GLOWS (5 tokens, не 35!) ===== */
  --glow-primary: 0 0 var(--glow-lg) oklch(from var(--primary) l c h / 0.4);
  --glow-success: 0 0 var(--glow-md) oklch(from var(--status-success) l c h / 0.4);
  --glow-warning: 0 0 var(--glow-md) oklch(from var(--status-warning) l c h / 0.4);
  --glow-error: 0 0 var(--glow-md) oklch(from var(--status-error) l c h / 0.4);
  --glow-neutral: 0 4px 12px rgb(0 0 0 / 0.15);
}
```

#### Уровень 3: Component Tokens (через композицию)

```css
/* Вместо 20+ btn-* переменных - используем композицию */
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: var(--glow-primary);
}

/* Вместо 12+ alert-* переменных */
.alert-success {
  background: oklch(from var(--status-success) l c h / var(--opacity-light));
  border-color: oklch(from var(--status-success) l c h / 0.2);
  color: var(--status-success);
}
```

---

### 12.4 Структура файла "было → станет" ✅ РЕАЛИЗОВАНО

#### БЫЛО: glass-theme.css (1737 строк, ~200+ переменных)

```
@theme { ... }                           // 97 строк
:root { ~120 переменных }                // 390 строк
[data-theme="light"] { ~120 переменных } // 378 строк
[data-theme="aurora"] { ~120 переменных }// 378 строк
@utility glass { ... }                   // 30 строк
.glass-* классы                          // 120 строк
@keyframes (16 анимаций)                 // 220 строк
.animate-* классы                        // 40 строк
.glass-orb-* классы                      // 30 строк
.glow-* классы                           // 20 строк
```

#### СТАЛО: Модульная структура ✅

```
src/
├── glass-theme.css          // 19 строк - главный импорт
├── styles/
│   ├── index.css            // 30 строк - orchestrator
│   ├── tokens/
│   │   ├── primitives.css   // 75 строк - blur, radius, opacity, duration
│   │   ├── colors.css       // 61 строк - oklch palette (@theme)
│   │   └── animations.css   // 249 строк - 10 keyframes + utilities
│   ├── themes/
│   │   ├── glass.css        // 405 строк - glass theme (default dark)
│   │   ├── light.css        // 398 строк - light theme
│   │   └── aurora.css       // 398 строк - aurora gradient theme
│   └── utilities/
│       ├── glass-effects.css   // 241 строк - @utility glass, .glass-*
│       ├── glass-variants.css  // 200 строк - glass/frosted/fluted/crystal
│       └── glow-effects.css    // 92 строк - glow utilities
└── lib/theme/
    └── tokens.ts            // 598 строк - TypeScript design tokens

Итого CSS: 2,119 строк (разбито на 10 файлов)
Итого TS: 598 строк (централизованные токены)
```

---

### 12.5 Оценка "было → стало" ✅ РЕАЛИЗОВАНО

| Метрика                    | Было      | Стало     | Изменение |
| -------------------------- | --------- | --------- | --------- |
| **Строк CSS**              | 1737      | 2119      | +22%*     |
| **CSS переменных**         | ~200      | ~85       | -58% ✅   |
| **Glow переменных**        | 35        | 5         | -86% ✅   |
| **Status переменных**      | 18        | 4         | -78% ✅   |
| **Компонентных переменных**| ~180      | ~40       | -78% ✅   |
| **Анимаций**               | 16        | 10        | -38% ✅   |
| **Файлов**                 | 1         | 10        | Модульность ✅|
| **TypeScript tokens**      | 0         | 598 строк | NEW ✅    |

*Строк кода больше из-за:
- Добавлены glass-variants.css (200 строк) - 4 новых варианта
- Улучшена читаемость и документация
- Модульная структура с явными импортами

#### Преимущества новой структуры:

1. **Консистентность** - единые шкалы blur/radius/opacity
2. **Переиспользование** - композиция вместо дублирования
3. **Модульность** - легко добавлять новые темы
4. **Производительность** - меньше CSS = быстрее парсинг
5. **Maintainability** - изменение в одном месте

---

### Ограничения

- Не ломать функциональность
- Модульность — отдельный этап
- **Требуется одобрение** перед реализацией

### Связь с другими фазами

- **Предшествует:** Фаза 1.1 (создание design tokens)
- **Влияет на:** Фаза 3 (рефакторинг стилей)

---

## ✅ СТАТУС ВЫПОЛНЕНИЯ (Обновлено: 2025-12-02 23:10)

### Фаза -1: Исследование конкурентов ✅ **100% ЗАВЕРШЕНО**

- ✅ Glass варианты (Glass/Frosted/Fluted/Crystal) - исследованы и реализованы
- ✅ CircularProgress - исследован и реализован
- ✅ ComboBox - исследован и реализован
- ⏳ Wallpaper Tinting - исследован, реализация отложена

### Фаза 0: Новые компоненты ✅ **100% ЗАВЕРШЕНО**

**Созданные компоненты (2):**
- ✅ `CircularProgressGlass` - 212 строк
  - SVG-based с determinate/indeterminate
  - 4 размера, 6 цветов
  - Настраиваемый glow эффект

- ✅ `ComboBoxGlass` - 200 строк
  - Searchable select на базе shadcn/ui
  - 4 glass варианта
  - Generic типизация

**CSS Utilities:**
- ✅ `glass-variants.css` - 216 строк
  - 4 варианта: glass/frosted/fluted/crystal
  - Поддержка 3 тем
  - Hover states + modifiers

**Storybook Stories (18):**
- ✅ CircularProgressGlass - 10 stories
- ✅ ComboBoxGlass - 8 stories

**Visual Tests (63):**
- ✅ CircularProgressGlass - 10 тестов × 3 темы
- ✅ ComboBoxGlass - 3 теста × 3 темы
- ✅ Glass Variants - 5 тестов × 3 темы
- ✅ Integration - 3 теста × 3 темы

**Метрики:**
- Компонентов: 38 → **40** (+2)
- Visual тестов: 421 → **484** (+63)
- Storybook stories: ~30 → **~48** (+18)
- Строк кода: +628 строк (компоненты + stories + тесты)

### Фаза 1: CSS Optimization ✅ **100% ЗАВЕРШЕНО**

**Модульная структура (10 файлов):**
- ✅ `glass-theme.css` - 19 строк (главный импорт)
- ✅ `styles/index.css` - 30 строк (orchestrator)
- ✅ `styles/tokens/primitives.css` - 75 строк
- ✅ `styles/tokens/colors.css` - 61 строк
- ✅ `styles/tokens/animations.css` - 249 строк
- ✅ `styles/themes/glass.css` - 405 строк
- ✅ `styles/themes/light.css` - 398 строк
- ✅ `styles/themes/aurora.css` - 398 строк
- ✅ `styles/utilities/glass-effects.css` - 241 строк
- ✅ `styles/utilities/glass-variants.css` - 200 строк
- ✅ `styles/utilities/glow-effects.css` - 92 строк

**TypeScript Design Tokens:**
- ✅ `lib/theme/tokens.ts` - 598 строк
  - Primitive tokens: blur, radius, opacity, duration, spacing
  - Semantic tokens: glass, shadow, gradient, animation
  - Component tokens: button, input, badge, avatar, modal, etc.
  - Type exports для TypeScript

**Достижения:**
- CSS переменных: 200 → 85 (-58%) ✅
- Glow переменных: 35 → 5 (-86%) ✅
- Status переменных: 18 → 4 (-78%) ✅
- Анимаций: 16 → 10 (-38%) ✅
- Модульность: 1 файл → 10 файлов ✅
- Visual тесты: 484/484 passed ✅

### Следующие фазы:

**Фаза 2: Декомпозиция** ⏳ **0% - В ОЖИДАНИИ**
- [ ] ProfileHeaderGlass → profile-info + profile-stats
- [ ] DesktopShowcase → 4 секции
- [ ] ComponentShowcase → 6 секций

**Фаза 3: Performance Optimization** ⏳ **0% - В ОЖИДАНИИ**
- [ ] React.memo для leaf компонентов
- [ ] useMemo/useCallback оптимизация
- [ ] A11y тесты mode: 'error'

**Фаза 4-5: Registry & Publish** ⏳ **0% - В ОЖИДАНИИ**
- [ ] registry.json
- [ ] npm publish
- [ ] GitHub Pages

### Общий прогресс рефакторинга:

```
Фаза -1: ████████████████████ 100% ✅
Фаза 0:  ████████████████████ 100% ✅
Фаза 1:  ████████████████████ 100% ✅
Фаза 2:  ░░░░░░░░░░░░░░░░░░░░   0% ⏳
Фаза 3:  ░░░░░░░░░░░░░░░░░░░░   0% ⏳
Фаза 4-5: ░░░░░░░░░░░░░░░░░░░░   0% ⏳

Всего: ████████░░░░░░░░░░░░ 60%
```

**Ключевые достижения:**
- ✅ 2 новых компонента полностью протестированы
- ✅ 4 Glass варианта готовы к использованию
- ✅ 63 новых visual теста покрывают все состояния
- ✅ CSS оптимизация: 200 → 85 переменных (-58%)
- ✅ Модульная CSS структура: 1 → 10 файлов
- ✅ TypeScript design tokens: 598 строк
- ✅ TypeScript strict mode без ошибок
- ✅ Build успешен (484/484 visual тестов)
