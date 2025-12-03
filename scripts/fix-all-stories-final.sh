#!/bin/bash

# Fix ALL story file imports in src/components/*.stories.tsx

echo "🔄 Fixing all story file imports..."

find src/components -maxdepth 1 -name "*.stories.tsx" -type f -exec sed -i '' \
  -e 's|from "\./TooltipGlass"|from "./glass/ui/tooltip-glass"|g' \
  -e 's|from "\./ButtonGlass"|from "./glass/ui/button-glass"|g' \
  -e 's|from "\./NotificationGlass"|from "./glass/ui/notification-glass"|g' \
  -e 's|from "\./AlertGlass"|from "./glass/ui/alert-glass"|g' \
  -e 's|from "\./AvatarGlass"|from "./glass/ui/avatar-glass"|g' \
  -e 's|from "\./BadgeGlass"|from "./glass/ui/badge-glass"|g' \
  -e 's|from "\./CheckboxGlass"|from "./glass/ui/checkbox-glass"|g' \
  -e 's|from "\./DropdownGlass"|from "./glass/ui/dropdown-glass"|g' \
  -e 's|from "\./InputGlass"|from "./glass/ui/input-glass"|g' \
  -e 's|from "\./ModalGlass"|from "./glass/ui/modal-glass"|g' \
  -e 's|from "\./SkeletonGlass"|from "./glass/ui/skeleton-glass"|g' \
  -e 's|from "\./SliderGlass"|from "./glass/ui/slider-glass"|g' \
  -e 's|from "\./TabsGlass"|from "./glass/ui/tabs-glass"|g' \
  -e 's|from "\./ToggleGlass"|from "./glass/ui/toggle-glass"|g' \
  -e 's|from "\./GlassCard"|from "./glass/composite/glass-card"|g' \
  -e 's|from "\./ProgressGlass"|from "./glass/specialized/progress-glass"|g' \
  -e 's|from "\./RainbowProgressGlass"|from "./glass/specialized/rainbow-progress-glass"|g' \
  -e 's|from "\./ProfileAvatarGlass"|from "./glass/specialized/profile-avatar-glass"|g' \
  -e 's|from "\./LanguageBarGlass"|from "./glass/specialized/language-bar-glass"|g' \
  -e 's|from "\./FlagAlertGlass"|from "./glass/specialized/flag-alert-glass"|g' \
  -e 's|from "\./StatusIndicatorGlass"|from "./glass/specialized/status-indicator-glass"|g' \
  -e 's|from "\./SegmentedControlGlass"|from "./glass/specialized/segmented-control-glass"|g' \
  -e 's|from "\./MetricCardGlass"|from "./glass/composite/metric-card-glass"|g' \
  -e 's|from "\./YearCardGlass"|from "./glass/composite/year-card-glass"|g' \
  -e 's|from "\./AICardGlass"|from "./glass/composite/ai-card-glass"|g' \
  -e 's|from "\./RepositoryCardGlass"|from "./glass/composite/repository-card-glass"|g' \
  -e 's|from "\./HeaderNavGlass"|from "./glass/sections/header-nav-glass"|g' \
  -e 's|from "\./ProfileHeaderGlass"|from "./glass/sections/profile-header-glass"|g' \
  -e 's|from "\./CareerStatsGlass"|from "./glass/sections/career-stats-glass"|g' \
  -e 's|from "\./FlagsSectionGlass"|from "./glass/sections/flags-section-glass"|g' \
  -e 's|from "\./TrustScoreCardGlass"|from "./glass/sections/trust-score-card-glass"|g' \
  -e 's|from "\./ProjectsListGlass"|from "./glass/sections/projects-list-glass"|g' \
  -e 's|from "\./RepoCardGlass"|from "./glass/sections/repo-card-glass"|g' \
  {} \;

echo "✅ All story imports fixed"
