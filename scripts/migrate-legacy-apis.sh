#!/bin/bash
# Automated Legacy API Migration Script
# Generated: 2025-12-04
# See: CLEANUP_PLAN.md for details

set -e

echo "================================================="
echo "Legacy API Migration Script"
echo "================================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
CHANGES=0

# ========================================
# Phase 1: ButtonGlass danger → destructive
# ========================================

echo "Phase 1: Migrating ButtonGlass 'danger' → 'destructive'..."

if rg "variant=\"danger\"" --files-with-matches --quiet 2>/dev/null; then
  echo -e "${YELLOW}Found ButtonGlass danger variant usage${NC}"

  FILES=$(rg "variant=\"danger\"" --files-with-matches)
  echo "$FILES" | while read -r file; do
    echo "  - $file"
  done

  # Replace
  rg "variant=\"danger\"" -l | xargs sed -i '' 's/variant="danger"/variant="destructive"/g'
  CHANGES=$((CHANGES + 1))
  echo -e "${GREEN}✓ Replaced 'danger' with 'destructive'${NC}"
else
  echo -e "${GREEN}✓ No ButtonGlass danger variant found${NC}"
fi

echo ""

# ========================================
# Phase 2: AlertGlass type → variant
# ========================================

echo "Phase 2: Migrating AlertGlass 'type' → 'variant'..."

# type="info" → variant="default"
if rg 'type="info"' --files-with-matches --quiet 2>/dev/null; then
  echo -e "${YELLOW}Found AlertGlass type=\"info\"${NC}"
  FILES=$(rg 'type="info"' --files-with-matches | grep -v node_modules)
  echo "$FILES" | while read -r file; do
    echo "  - $file"
  done

  sed -i '' 's/type="info"/variant="default"/g' $(rg 'type="info"' -l | grep -v node_modules)
  CHANGES=$((CHANGES + 1))
  echo -e "${GREEN}✓ Replaced type=\"info\" with variant=\"default\"${NC}"
fi

# type="error" → variant="destructive"
if rg 'type="error"' --files-with-matches --quiet 2>/dev/null; then
  echo -e "${YELLOW}Found AlertGlass type=\"error\"${NC}"
  FILES=$(rg 'type="error"' --files-with-matches | grep -v node_modules)
  echo "$FILES" | while read -r file; do
    echo "  - $file"
  done

  sed -i '' 's/type="error"/variant="destructive"/g' $(rg 'type="error"' -l | grep -v node_modules)
  CHANGES=$((CHANGES + 1))
  echo -e "${GREEN}✓ Replaced type=\"error\" with variant=\"destructive\"${NC}"
fi

# type="success" → variant="success"
if rg 'type="success"' --files-with-matches --quiet 2>/dev/null; then
  echo -e "${YELLOW}Found AlertGlass type=\"success\"${NC}"
  FILES=$(rg 'type="success"' --files-with-matches | grep -v node_modules)
  echo "$FILES" | while read -r file; do
    echo "  - $file"
  done

  sed -i '' 's/type="success"/variant="success"/g' $(rg 'type="success"' -l | grep -v node_modules)
  CHANGES=$((CHANGES + 1))
  echo -e "${GREEN}✓ Replaced type=\"success\" with variant=\"success\"${NC}"
fi

# type="warning" → variant="warning"
if rg 'type="warning"' --files-with-matches --quiet 2>/dev/null; then
  echo -e "${YELLOW}Found AlertGlass type=\"warning\"${NC}"
  FILES=$(rg 'type="warning"' --files-with-matches | grep -v node_modules)
  echo "$FILES" | while read -r file; do
    echo "  - $file"
  done

  sed -i '' 's/type="warning"/variant="warning"/g' $(rg 'type="warning"' -l | grep -v node_modules)
  CHANGES=$((CHANGES + 1))
  echo -e "${GREEN}✓ Replaced type=\"warning\" with variant=\"warning\"${NC}"
fi

echo ""

# ========================================
# Phase 3: Remove empty directories
# ========================================

echo "Phase 3: Removing empty directories..."

EMPTY_DIRS=$(find src -type d -empty 2>/dev/null | wc -l | tr -d ' ')

if [ "$EMPTY_DIRS" -gt 0 ]; then
  echo -e "${YELLOW}Found $EMPTY_DIRS empty directories${NC}"
  find src -type d -empty 2>/dev/null | while read -r dir; do
    echo "  - $dir"
  done

  find src -type d -empty -delete 2>/dev/null
  CHANGES=$((CHANGES + 1))
  echo -e "${GREEN}✓ Removed $EMPTY_DIRS empty directories${NC}"
else
  echo -e "${GREEN}✓ No empty directories found${NC}"
fi

echo ""

# ========================================
# Summary
# ========================================

echo "================================================="
echo "Migration Summary"
echo "================================================="
echo ""

if [ $CHANGES -gt 0 ]; then
  echo -e "${GREEN}✓ Migration completed successfully!${NC}"
  echo ""
  echo "Changes made: $CHANGES"
  echo ""
  echo "Next steps:"
  echo "1. Review changes: git diff"
  echo "2. Run tests: npm run test"
  echo "3. Update screenshots: npm run test:visual:update"
  echo "4. Verify: bash scripts/verify-migration.sh"
  echo "5. Commit: git add . && git commit -m 'refactor: migrate legacy APIs'"
else
  echo -e "${GREEN}✓ No changes needed - all APIs already migrated!${NC}"
fi

echo ""
echo "================================================="
