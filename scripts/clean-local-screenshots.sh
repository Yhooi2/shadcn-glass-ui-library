#!/bin/bash
#
# Clean local (macOS/Windows) screenshots that are not committed to git
#
# This script removes untracked screenshot files from __screenshots__ directories.
# Only Linux-generated screenshots (from CI) should be committed.
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Cleaning local screenshots..."

# Count untracked screenshots
untracked_count=$(git status --porcelain | grep '^??' | grep '__screenshots__.*\.png$' | wc -l)

if [ "$untracked_count" -eq 0 ]; then
  echo -e "${GREEN}✓ No untracked screenshots found${NC}"
  exit 0
fi

echo -e "${YELLOW}Found $untracked_count untracked screenshot(s)${NC}"
echo ""

# List files to be deleted
echo "Files to be deleted:"
git status --porcelain | grep '^??' | grep '__screenshots__.*\.png$' | sed 's/^?? /  - /'
echo ""

# Ask for confirmation
read -p "Delete these files? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

# Delete untracked screenshots
git status --porcelain | grep '^??' | grep '__screenshots__.*\.png$' | sed 's/^?? //' | xargs rm -f

echo -e "${GREEN}✓ Deleted $untracked_count screenshot(s)${NC}"
echo ""
echo "To generate new reference screenshots, use:"
echo "  gh workflow run update-screenshots.yml"
