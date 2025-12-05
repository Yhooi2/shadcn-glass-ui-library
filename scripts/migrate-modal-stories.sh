#!/bin/bash

# Script to help identify Modal stories that still use legacy API
# This is a helper script - actual migration requires manual review

FILE="src/components/ModalGlass.stories.tsx"

echo "=== Modal Stories using legacy API ==="
echo ""
echo "Stories with args.isOpen:"
rg -n "args: \{" "$FILE" -A 10 | rg -B 10 "isOpen:" | rg "export const" || echo "None found"

echo ""
echo "Stories with <ModalGlass isOpen=:"
rg -n "<ModalGlass\s+isOpen=" "$FILE" || echo "None found"

echo ""
echo "=== Total count ==="
echo "Legacy API usages: $(rg -c "isOpen=" "$FILE" || echo "0")"
echo ""
