#!/usr/bin/env bash
set -euo pipefail

UPDATE_BASELINE=false
FAIL_ON_LEAKS=false

for arg in "$@"; do
  case "$arg" in
    --update-baseline) UPDATE_BASELINE=true ;;
    --fail-on-leaks)   FAIL_ON_LEAKS=true ;;
  esac
done

mkdir -p tasks .governance

REPORT="tasks/secret-scan.sarif"
BASELINE=".governance/gitleaks-baseline.json"

if command -v gitleaks &>/dev/null; then
  SCAN_ARGS=(detect --source . --redact --report-format sarif --report-path "$REPORT")
  BASELINE_ARGS=(detect --source . --redact --report-format json --report-path "$BASELINE" --exit-code 0)

  if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    SCAN_ARGS+=(--no-git)
    BASELINE_ARGS+=(--no-git)
  fi

  if [ "$FAIL_ON_LEAKS" = false ]; then
    SCAN_ARGS+=(--exit-code 0)
  fi

  if [ "$UPDATE_BASELINE" = true ]; then
    gitleaks "${BASELINE_ARGS[@]}"
    echo "Updated baseline: $BASELINE"
    exit 0
  fi

  if [ -f "$BASELINE" ]; then
    SCAN_ARGS+=(--baseline-path "$BASELINE")
  fi

  gitleaks "${SCAN_ARGS[@]}"
  echo "Report: $REPORT"
else
  echo "WARNING: gitleaks not found. Falling back to grep-based secret scan." >&2

  SECRET_PATTERNS=(
    -E '(password|passwd|secret|api[_-]?key|apikey|token|auth[_-]?token|private[_-]?key|access[_-]?key)\s*[=:]'
    -E '(AKIA[0-9A-Z]{16})'
    -E '(eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+)'
    -E '(-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----)'
  )

  EXCLUDE_DIRS=(\
    -not -path '*/\.git/*' \
    -not -path '*/node_modules/*' \
    -not -path '*/vendor/*' \
    -not -path '*/dist/*' \
    -not -path '*/\.governance/*' \
  )

  FOUND=0
  {
    echo "Results:"
    for pattern in "${SECRET_PATTERNS[@]}"; do
      while IFS= read -r line; do
        [ -n "$line" ] && echo "$line" && FOUND=1
      done < <(grep -rn "$pattern" --include='*.js' --include='*.ts' --include='*.py' --include='*.env' --include='*.json' --include='*.yml' --include='*.yaml' --include='*.toml' --include='*.cfg' --include='*.conf' --include='*.sh' --include='*.bash' . "${EXCLUDE_DIRS[@]}" 2>/dev/null || true)
    done
    if [ "$FOUND" -eq 0 ]; then
      echo "No obvious secrets detected by grep fallback."
    fi
  } | tee "$REPORT"

  if [ "$FAIL_ON_LEAKS" = true ] && [ "$FOUND" -eq 1 ]; then
    echo "FAILURE: Potential secrets detected. Review the report." >&2
    exit 1
  fi

  echo "Report: $REPORT (grep-fallback mode)"
fi