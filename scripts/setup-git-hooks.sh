#!/bin/bash
#
# Setup git hooks for visual test screenshot protection
#
# This script copies the pre-commit hook to .git/hooks/ and ensures
# proper configuration for preventing accidental commits of platform-specific screenshots.
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Setting up git hooks..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
  echo -e "${RED}Error: Not in a git repository root directory${NC}"
  exit 1
fi

# Ensure hooks directory exists
mkdir -p .git/hooks

# Check if template exists
if [ ! -f ".githooks/pre-commit" ]; then
  echo -e "${RED}Error: Template file .githooks/pre-commit not found${NC}"
  exit 1
fi

# Copy pre-commit hook from template
cp .githooks/pre-commit .git/hooks/pre-commit

# Make hook executable
chmod +x .git/hooks/pre-commit

# Ensure Git is using the standard hooks directory (not Husky or other tools)
if git config core.hookspath > /dev/null 2>&1; then
  hookspath=$(git config core.hookspath)
  echo -e "${YELLOW}Warning: Git is configured to use custom hooks directory: $hookspath${NC}"
  echo -e "${YELLOW}Removing custom hookspath to use standard .git/hooks/${NC}"
  git config --unset core.hookspath
fi

echo -e "${GREEN}✓ Pre-commit hook installed successfully!${NC}"
echo ""
echo "The hook will prevent commits of screenshots from non-Linux platforms."
echo "To update screenshots, use: gh workflow run update-screenshots.yml"
echo ""
echo "To bypass the hook (not recommended): git commit --no-verify"
