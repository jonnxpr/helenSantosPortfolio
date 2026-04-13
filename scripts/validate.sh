#!/usr/bin/env bash
# Validação rápida ou completa do ecossistema HelenSantosPortfolio
# Uso: ./validate.sh [fast|full]
set -euo pipefail

MODE="${1:-fast}"
if [[ "$MODE" != "fast" && "$MODE" != "full" ]]; then
    echo "Usage: $0 [fast|full]" >&2
    exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAILURES=()

invoke_gate() {
    local label="$1"
    local work_dir="$2"
    shift 2
    echo ""
    echo -e "\033[36m=== $label ===\033[0m"
    local saved_dir
    saved_dir="$(pwd)"
    cd "$work_dir"
    if "$@"; then
        echo -e "  \033[32mPASSED\033[0m"
    else
        echo -e "  \033[31mFAILED\033[0m"
        FAILURES+=("$label")
    fi
    cd "$saved_dir"
}

invoke_gate "verify-precedence" "$ROOT_DIR" python3 tools/governance/verify-precedence.py
invoke_gate "verify-metadata-sync" "$ROOT_DIR" node scripts/verify-metadata-sync.mjs

if [[ "$MODE" == "full" ]]; then
    invoke_gate "npm build" "$ROOT_DIR" npm run build
fi

echo ""
echo "============================="
if [[ ${#FAILURES[@]} -eq 0 ]]; then
    echo -e "\033[32mvalidate-$MODE PASSED\033[0m"
    exit 0
else
    echo -e "\033[31mvalidate-$MODE FAILED (${#FAILURES[@]} gate(s)):\033[0m"
    for f in "${FAILURES[@]}"; do
        echo -e "  \033[31m- $f\033[0m"
    done
    exit 1
fi
