#!/bin/bash

# Migration script for ModalGlass and TabsGlass tests to Compound API
# Usage: bash scripts/migrate-tests-to-compound-api.sh

set -e

echo "🚀 Migrating tests to Compound API..."

# ========================================
# ModalGlass Test Migration Patterns
# ========================================

echo "📝 Migrating ModalGlass tests..."

# Pattern 1: Simple ModalGlass with isOpen/onClose/title
# Before: <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">Content</ModalGlass>
# After: <ModalGlass.Root open={true} onOpenChange={vi.fn()}>
#          <ModalGlass.Overlay />
#          <ModalGlass.Content>
#            <ModalGlass.Header>
#              <ModalGlass.Title>Test</ModalGlass.Title>
#              <ModalGlass.Close />
#            </ModalGlass.Header>
#            <ModalGlass.Body>Content</ModalGlass.Body>
#          </ModalGlass.Content>
#        </ModalGlass.Root>

# Note: Complex multi-line replacements are difficult in sed
# This script will prepare files for manual review

# Find all ModalGlass test files
MODAL_TEST_FILES=$(rg "ModalGlass.*isOpen" src/ -l)

echo "Found ModalGlass test files:"
echo "$MODAL_TEST_FILES"

# ========================================
# TabsGlass Test Migration Patterns
# ========================================

echo "📝 Migrating TabsGlass tests..."

# Pattern: <TabsGlass tabs={tabs} activeTab="tab1" onChange={onChange} />
# After: <TabsGlass.Root value="tab1" onValueChange={onChange}>
#          <TabsGlass.List>
#            <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
#          </TabsGlass.List>
#        </TabsGlass.Root>

TABS_TEST_FILES=$(rg "TabsGlass.*tabs=" src/ -l)

echo "Found TabsGlass test files:"
echo "$TABS_TEST_FILES"

echo ""
echo "✅ Test files identified"
echo "⚠️  Manual migration required due to complex AST transformations"
echo ""
echo "Next steps:"
echo "1. Migrate ModalGlass unit tests (src/components/glass/ui/__tests__/modal-glass.test.tsx)"
echo "2. Migrate TabsGlass unit tests (src/components/glass/ui/__tests__/tabs-glass.test.tsx)"
echo "3. Migrate compliance tests (4 files in src/test/compliance/)"
echo "4. Run: npm run test:visual:update"
echo "5. Run: npm test"
