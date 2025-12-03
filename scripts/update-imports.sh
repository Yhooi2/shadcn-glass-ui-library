#!/bin/bash

# Обновление импортов для мигрированных компонентов

echo "🔄 Updating imports..."

# UI компоненты (glass/ui/) - удаляем ProgressGlass так как он переехал
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|from "@/components/AlertGlass"|from "@/components/glass/ui/alert-glass"|g' \
  -e 's|from "@/components/AvatarGlass"|from "@/components/glass/ui/avatar-glass"|g' \
  -e 's|from "@/components/BadgeGlass"|from "@/components/glass/ui/badge-glass"|g' \
  -e 's|from "@/components/ButtonGlass"|from "@/components/glass/ui/button-glass"|g' \
  -e 's|from "@/components/CheckboxGlass"|from "@/components/glass/ui/checkbox-glass"|g' \
  -e 's|from "@/components/DropdownGlass"|from "@/components/glass/ui/dropdown-glass"|g' \
  -e 's|from "@/components/InputGlass"|from "@/components/glass/ui/input-glass"|g' \
  -e 's|from "@/components/ModalGlass"|from "@/components/glass/ui/modal-glass"|g' \
  -e 's|from "@/components/NotificationGlass"|from "@/components/glass/ui/notification-glass"|g' \
  -e 's|from "@/components/SkeletonGlass"|from "@/components/glass/ui/skeleton-glass"|g' \
  -e 's|from "@/components/SliderGlass"|from "@/components/glass/ui/slider-glass"|g' \
  -e 's|from "@/components/TabsGlass"|from "@/components/glass/ui/tabs-glass"|g' \
  -e 's|from "@/components/ToggleGlass"|from "@/components/glass/ui/toggle-glass"|g' \
  -e 's|from "@/components/TooltipGlass"|from "@/components/glass/ui/tooltip-glass"|g' \
  {} \;

# Specialized компоненты (glass/specialized/)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|from "@/components/StatusIndicatorGlass"|from "@/components/glass/specialized/status-indicator-glass"|g' \
  -e 's|from "@/components/SegmentedControlGlass"|from "@/components/glass/specialized/segmented-control-glass"|g' \
  -e 's|from "@/components/RainbowProgressGlass"|from "@/components/glass/specialized/rainbow-progress-glass"|g' \
  -e 's|from "@/components/LanguageBarGlass"|from "@/components/glass/specialized/language-bar-glass"|g' \
  -e 's|from "@/components/ProfileAvatarGlass"|from "@/components/glass/specialized/profile-avatar-glass"|g' \
  -e 's|from "@/components/FlagAlertGlass"|from "@/components/glass/specialized/flag-alert-glass"|g' \
  -e 's|from "@/components/ProgressGlass"|from "@/components/glass/specialized/progress-glass"|g' \
  -e 's|from "@/components/glass/ui/progress-glass"|from "@/components/glass/specialized/progress-glass"|g' \
  {} \;

# Composite компоненты (glass/composite/)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|from "@/components/GlassCard"|from "@/components/glass/composite/glass-card"|g' \
  -e 's|from "@/components/MetricCardGlass"|from "@/components/glass/composite/metric-card-glass"|g' \
  -e 's|from "@/components/YearCardGlass"|from "@/components/glass/composite/year-card-glass"|g' \
  -e 's|from "@/components/AICardGlass"|from "@/components/glass/composite/ai-card-glass"|g' \
  -e 's|from "@/components/RepositoryCardGlass"|from "@/components/glass/composite/repository-card-glass"|g' \
  -e 's|from "@/components/glass/ui/glass-card"|from "@/components/glass/composite/glass-card"|g' \
  {} \;

# Section компоненты (glass/sections/)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|from "@/components/HeaderNavGlass"|from "@/components/glass/sections/header-nav-glass"|g' \
  -e 's|from "@/components/ProfileHeaderGlass"|from "@/components/glass/sections/profile-header-glass"|g' \
  -e 's|from "@/components/CareerStatsGlass"|from "@/components/glass/sections/career-stats-glass"|g' \
  -e 's|from "@/components/FlagsSectionGlass"|from "@/components/glass/sections/flags-section-glass"|g' \
  -e 's|from "@/components/TrustScoreCardGlass"|from "@/components/glass/sections/trust-score-card-glass"|g' \
  -e 's|from "@/components/ProjectsListGlass"|from "@/components/glass/sections/projects-list-glass"|g' \
  {} \;

echo "✅ Импорты обновлены"
