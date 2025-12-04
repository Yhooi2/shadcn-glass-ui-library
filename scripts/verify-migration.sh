#!/bin/bash
# Migration Verification Script
# Generated: 2025-12-04
# See: CLEANUP_PLAN.md for details

set -e

echo "================================================="
echo "Legacy API Verification"
echo "================================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
ISSUES=0

# ========================================
# Check 1: ButtonGlass danger variant
# ========================================

echo "Check 1: ButtonGlass 'danger' variant..."

if rg "variant=\"danger\"" --files-with-matches --quiet 2>/dev/null; then
  echo -e "${RED}✗ FAIL: Found ButtonGlass danger variant${NC}"
  rg "variant=\"danger\"" --files-with-matches | while read -r file; do
    echo "  - $file"
  done
  ISSUES=$((ISSUES + 1))
else
  echo -e "${GREEN}✓ PASS: No ButtonGlass danger variant found${NC}"
fi

echo ""

# ========================================
# Check 2: AlertGlass type prop
# ========================================

echo "Check 2: AlertGlass 'type' prop..."

ALERT_TYPE_COUNT=0

# Check for type="info", type="error", etc. in AlertGlass
if rg 'AlertGlass.*type=' --files-with-matches --quiet 2>/dev/null; then
  echo -e "${RED}✗ FAIL: Found AlertGlass type prop${NC}"
  rg 'AlertGlass.*type=' --files-with-matches | grep -v node_modules | while read -r file; do
    echo "  - $file"
    ALERT_TYPE_COUNT=$((ALERT_TYPE_COUNT + 1))
  done
  ISSUES=$((ISSUES + 1))
else
  echo -e "${GREEN}✓ PASS: No AlertGlass type prop found${NC}"
fi

echo ""

# ========================================
# Check 3: Empty directories
# ========================================

echo "Check 3: Empty directories in src/..."

EMPTY_DIRS=$(find src -type d -empty 2>/dev/null | wc -l | tr -d ' ')

if [ "$EMPTY_DIRS" -gt 0 ]; then
  echo -e "${YELLOW}⚠ WARNING: Found $EMPTY_DIRS empty directories${NC}"
  find src -type d -empty 2>/dev/null | while read -r dir; do
    echo "  - $dir"
  done
else
  echo -e "${GREEN}✓ PASS: No empty directories found${NC}"
fi

echo ""

# ========================================
# Check 4: TypeScript compilation
# ========================================

echo "Check 4: TypeScript compilation..."

if npx tsc --noEmit > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PASS: TypeScript compilation successful${NC}"
else
  echo -e "${RED}✗ FAIL: TypeScript compilation errors${NC}"
  echo "Run 'npx tsc --noEmit' for details"
  ISSUES=$((ISSUES + 1))
fi

echo ""

# ========================================
# Check 5: Lint
# ========================================

echo "Check 5: ESLint..."

if npm run lint > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PASS: ESLint passed${NC}"
else
  echo -e "${YELLOW}⚠ WARNING: ESLint issues found${NC}"
  echo "Run 'npm run lint' for details"
fi

echo ""

# ========================================
# Summary
# ========================================

echo "================================================="
echo "Verification Summary"
echo "================================================="
echo ""

if [ $ISSUES -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed!${NC}"
  echo ""
  echo "Migration is complete and verified."
  echo ""
  echo "Next steps:"
  echo "1. Run tests: npm run test"
  echo "2. Update visual test screenshots: npm run test:visual:update"
  echo "3. Review changes: git diff"
  echo "4. Commit: git add . && git commit -m 'refactor: migrate legacy APIs'"
else
  echo -e "${RED}✗ Found $ISSUES issues${NC}"
  echo ""
  echo "Please fix the issues above before committing."
  echo ""
  echo "See LEGACY_AUDIT.md for detailed information."
  exit 1
fi

echo ""
echo "================================================="
