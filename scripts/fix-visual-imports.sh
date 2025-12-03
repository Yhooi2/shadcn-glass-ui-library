#!/bin/bash

# Fix all relative imports in visual tests

echo "🔄 Fixing visual test imports..."

find src/components/__visual__ -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from '../AlertGlass'|from '../glass/ui/alert-glass'|g" \
  -e "s|from '../AvatarGlass'|from '../glass/ui/avatar-glass'|g" \
  -e "s|from '../BadgeGlass'|from '../glass/ui/badge-glass'|g" \
  -e "s|from '../ButtonGlass'|from '../glass/ui/button-glass'|g" \
  -e "s|from '../CheckboxGlass'|from '../glass/ui/checkbox-glass'|g" \
  -e "s|from '../DropdownGlass'|from '../glass/ui/dropdown-glass'|g" \
  -e "s|from '../InputGlass'|from '../glass/ui/input-glass'|g" \
  -e "s|from '../ModalGlass'|from '../glass/ui/modal-glass'|g" \
  -e "s|from '../NotificationGlass'|from '../glass/ui/notification-glass'|g" \
  -e "s|from '../SkeletonGlass'|from '../glass/ui/skeleton-glass'|g" \
  -e "s|from '../SliderGlass'|from '../glass/ui/slider-glass'|g" \
  -e "s|from '../TabsGlass'|from '../glass/ui/tabs-glass'|g" \
  -e "s|from '../ToggleGlass'|from '../glass/ui/toggle-glass'|g" \
  -e "s|from '../TooltipGlass'|from '../glass/ui/tooltip-glass'|g" \
  -e "s|from '../ProgressGlass'|from '../glass/specialized/progress-glass'|g" \
  -e "s|from '../GlassCard'|from '../glass/composite/glass-card'|g" \
  {} \;

echo "✅ Visual test imports fixed"
