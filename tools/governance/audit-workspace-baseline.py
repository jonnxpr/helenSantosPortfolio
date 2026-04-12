from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

REQUIRED_FILES = [
    "PRE-FLIGHT.md",
    "AGENTS.md",
    "CLAUDE.md",
    "README.md",
    "package.json",
    "opencode.json",
    "index.html",
]

REQUIRED_GOVERNANCE_TOOLS = [
    "tools/governance/scan-secrets.sh",
    "tools/governance/sync-instructions.py",
    "tools/governance/audit-compliance.py",
    "tools/governance/verify-precedence.py",
    "tools/governance/audit-workspace-baseline.py",
]


def main() -> int:
    findings: list[str] = []

    for rel_path in REQUIRED_FILES:
        if not (ROOT / rel_path).is_file():
            findings.append(f"missing file: {rel_path}")

    for rel_path in REQUIRED_GOVERNANCE_TOOLS:
        if not (ROOT / rel_path).is_file():
            findings.append(f"missing governance tool: {rel_path}")

    if findings:
        print("Findings:")
        for finding in findings:
            print(f"- {finding}")
        print(f"Summary: {len(findings)} required finding(s)")
        return 1

    print("OK: workspace baseline audit passed")
    print(
        f"Summary: {len(REQUIRED_FILES)} files and "
        f"{len(REQUIRED_GOVERNANCE_TOOLS)} governance tools verified"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
