param(
    [string]$WorkspaceRoot = (Get-Location).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Resolve-StartDirectory([string]$PathValue) {
    $resolved = Resolve-Path -LiteralPath $PathValue -ErrorAction Stop
    $item = Get-Item -LiteralPath $resolved.Path -Force
    if (-not $item.PSIsContainer) {
        return $item.Directory
    }
    return $item
}

function Test-GitMarker([string]$DirectoryPath) {
    return Test-Path -LiteralPath (Join-Path $DirectoryPath '.git')
}

function Get-RepoInfo([string]$RepoRoot) {
    try {
        $branch = (git -C $RepoRoot rev-parse --abbrev-ref HEAD 2>$null | Select-Object -First 1)
        if ([string]::IsNullOrWhiteSpace($branch)) {
            $branch = 'HEAD'
        }
    } catch {
        $branch = 'unknown'
    }

    try {
        $status = @(git -C $RepoRoot status --porcelain 2>$null)
        $hasChanges = $status.Count -gt 0
    } catch {
        $hasChanges = $false
    }

    return @{
        is_repo = $true
        repo_path = $RepoRoot
        branch = $branch
        has_changes = $hasChanges
        candidate_repos = @($RepoRoot)
    }
}

function Find-AncestorRepo([System.IO.DirectoryInfo]$Directory) {
    $current = $Directory
    while ($null -ne $current) {
        if (Test-GitMarker -DirectoryPath $current.FullName) {
            return $current.FullName
        }
        $current = $current.Parent
    }
    return $null
}

function Get-ChildRepos([System.IO.DirectoryInfo]$Directory) {
    $skipNames = @('.git', '.history', 'node_modules', 'bin', 'build', 'dist', 'target', '.gradle', '.idea', '.vscode')
    $repos = [System.Collections.Generic.List[string]]::new()
    $queue = [System.Collections.Generic.Queue[System.IO.DirectoryInfo]]::new()
    $queue.Enqueue($Directory)

    while ($queue.Count -gt 0) {
        $current = $queue.Dequeue()
        $children = @(Get-ChildItem -LiteralPath $current.FullName -Force -Directory -ErrorAction SilentlyContinue)
        foreach ($child in $children) {
            if ($skipNames -contains $child.Name) {
                continue
            }
            if (Test-GitMarker -DirectoryPath $child.FullName) {
                $repos.Add($child.FullName)
                continue
            }
            $queue.Enqueue($child)
        }
    }

    return @($repos | Sort-Object Length, { $_.ToLowerInvariant() } -Unique)
}

$startDir = Resolve-StartDirectory -PathValue $WorkspaceRoot
$ancestorRepo = Find-AncestorRepo -Directory $startDir

if ($ancestorRepo) {
    $result = Get-RepoInfo -RepoRoot $ancestorRepo
    $result['message'] = "Resolved active git repository from path $($startDir.FullName)"
    $result | ConvertTo-Json -Depth 4 -Compress
    return
}

$childRepos = @(Get-ChildRepos -Directory $startDir)
if ($childRepos.Count -eq 0) {
    @{
        is_repo = $false
        repo_path = $null
        branch = $null
        has_changes = $false
        candidate_repos = @()
        message = "No git repository found in $($startDir.FullName) or its parents/subdirectories"
    } | ConvertTo-Json -Depth 4 -Compress
    return
}

if ($childRepos.Count -eq 1) {
    $result = Get-RepoInfo -RepoRoot $childRepos[0]
    $result['message'] = "Resolved single nested git repository under $($startDir.FullName)"
    $result | ConvertTo-Json -Depth 4 -Compress
    return
}

@{
    is_repo = $false
    repo_path = $null
    branch = $null
    has_changes = $false
    candidate_repos = $childRepos
    message = "Multiple git repositories found under $($startDir.FullName). Specify a path inside the target repository."
} | ConvertTo-Json -Depth 4 -Compress
