#!/usr/bin/env bash
# discover-git-repo.sh — Resolve which git repository owns a given path
# Bash equivalent of discover-git-repo.ps1 for Linux
set -euo pipefail

WORKSPACE_ROOT="${1:-$(pwd)}"

SKIP_NAMES=(.git .history node_modules bin build dist target .gradle .idea .vscode)

resolve_start_directory() {
    local path="$1"
    if [ -d "$path" ]; then
        echo "$path"
    elif [ -f "$path" ]; then
        dirname "$path"
    else
        echo "$path"
    fi
}

find_ancestor_repo() {
    local dir="$1"
    while [ -n "$dir" ] && [ "$dir" != "/" ]; do
        if [ -d "$dir/.git" ]; then
            echo "$dir"
            return 0
        fi
        dir="$(dirname "$dir")"
    done
    return 1
}

find_child_repos() {
    local dir="$1"
    find "$dir" -name ".git" -type d 2>/dev/null | while read -r gitdir; do
        local parent
        parent="$(dirname "$gitdir")"
        local skip=false
        for name in "${SKIP_NAMES[@]}"; do
            if [ "$(basename "$parent")" = "$name" ]; then
                skip=true
                break
            fi
        done
        if [ "$skip" = false ]; then
            echo "$parent"
        fi
    done | sort -u
}

get_repo_info() {
    local repo="$1"
    local branch
    branch="$(git -C "$repo" rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
    local has_changes
    if [ -n "$(git -C "$repo" status --porcelain 2>/dev/null)" ]; then
        has_changes=true
    else
        has_changes=false
    fi
    printf '{"is_repo":true,"repo_path":"%s","branch":"%s","has_changes":%s}\n' "$repo" "$branch" "$has_changes"
}

START_DIR="$(resolve_start_directory "$WORKSPACE_ROOT")"

ANCESTOR="$(find_ancestor_repo "$START_DIR" || true)"
if [ -n "$ANCESTOR" ]; then
    get_repo_info "$ANCESTOR"
    exit 0
fi

CHILDREN="$(find_child_repos "$START_DIR")"
if [ -z "$CHILDREN" ]; then
    printf '{"is_repo":false,"repo_path":null,"branch":null,"has_changes":false,"message":"No git repository found in %s or its parents/subdirectories"}\n' "$START_DIR"
    exit 0
fi

CHILD_COUNT="$(echo "$CHILDREN" | wc -l)"
if [ "$CHILD_COUNT" -eq 1 ]; then
    get_repo_info "$(echo "$CHILDREN" | head -1)"
    exit 0
fi

printf '{"is_repo":false,"repo_path":null,"branch":null,"has_changes":false,"candidate_repos":[%s],"message":"Multiple git repositories found under %s. Specify a path inside the target repository."}\n' "$(echo "$CHILDREN" | sed 's/.*$/"&"/' | tr '\n' ',' | sed 's/,$//')" "$START_DIR"