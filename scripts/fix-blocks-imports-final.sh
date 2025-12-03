#!/bin/bash

# Fix all blocks imports to use glass/ structure

echo "🔄 Fixing blocks imports..."

find src/components/blocks -name "page.tsx" -type f -exec sed -i '' \
  -e "s|from '@/components/GlassCard'|from '@/components/glass/composite/glass-card'|g" \
  -e "s|from '@/components/AvatarGlass'|from '@/components/glass/ui/avatar-glass'|g" \
  -e "s|from '@/components/ProfileAvatarGlass'|from '@/components/glass/specialized/profile-avatar-glass'|g" \
  -e "s|from '@/components/StatusIndicatorGlass'|from '@/components/glass/specialized/status-indicator-glass'|g" \
  -e "s|from '@/components/BadgeGlass'|from '@/components/glass/ui/badge-glass'|g" \
  -e "s|from '@/components/TooltipGlass'|from '@/components/glass/ui/tooltip-glass'|g" \
  -e "s|from '@/components/ButtonGlass'|from '@/components/glass/ui/button-glass'|g" \
  -e "s|from '@/components/InputGlass'|from '@/components/glass/ui/input-glass'|g" \
  -e "s|from '@/components/SliderGlass'|from '@/components/glass/ui/slider-glass'|g" \
  -e "s|from '@/components/ToggleGlass'|from '@/components/glass/ui/toggle-glass'|g" \
  -e "s|from '@/components/CheckboxGlass'|from '@/components/glass/ui/checkbox-glass'|g" \
  -e "s|from '@/components/NotificationGlass'|from '@/components/glass/ui/notification-glass'|g" \
  -e "s|from '@/components/AlertGlass'|from '@/components/glass/ui/alert-glass'|g" \
  -e "s|from '@/components/ProgressGlass'|from '@/components/glass/specialized/progress-glass'|g" \
  -e "s|from '@/components/RainbowProgressGlass'|from '@/components/glass/specialized/rainbow-progress-glass'|g" \
  -e "s|from '@/components/SkeletonGlass'|from '@/components/glass/ui/skeleton-glass'|g" \
  {} \;

echo "✅ Blocks imports fixed"
