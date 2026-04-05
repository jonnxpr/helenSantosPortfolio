#!/usr/bin/env pwsh
[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [ValidateSet('claude','gemini','copilot','cursor-agent','qwen','opencode','codex','windsurf','junie','kilocode','auggie','roo','codebuddy','amp','shai','tabnine','kiro-cli','agy','bob','qodercli','vibe','kimi','trae','pi','iflow','generic')]
    [string]$AgentType
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $scriptDir 'common.ps1')

$paths = Get-FeaturePathsEnv
$repoRoot = $paths.REPO_ROOT
$planFile = $paths.IMPL_PLAN
$branchName = $paths.CURRENT_BRANCH
$contextDir = Join-Path $repoRoot '.specify/context'

$agentFileMap = @{
    'claude' = 'claude.md'
    'gemini' = 'gemini.md'
    'copilot' = 'copilot.md'
    'cursor-agent' = 'cursor-agent.md'
    'qwen' = 'qwen.md'
    'opencode' = 'opencode.md'
    'codex' = 'codex.md'
    'windsurf' = 'windsurf.md'
    'junie' = 'junie.md'
    'kilocode' = 'kilocode.md'
    'auggie' = 'auggie.md'
    'roo' = 'roo.md'
    'codebuddy' = 'codebuddy.md'
    'amp' = 'amp.md'
    'shai' = 'shai.md'
    'tabnine' = 'tabnine.md'
    'kiro-cli' = 'kiro-cli.md'
    'agy' = 'antigravity.md'
    'bob' = 'bob.md'
    'qodercli' = 'qodercli.md'
    'vibe' = 'vibe.md'
    'kimi' = 'kimi.md'
    'trae' = 'trae.md'
    'pi' = 'pi.md'
    'iflow' = 'iflow.md'
    'generic' = 'generic.md'
}

$knownAgentTypes = @($agentFileMap.Keys)

function Get-PlanField {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Label
    )

    if (-not (Test-Path -LiteralPath $planFile)) {
        return ''
    }

    $pattern = "^\*\*$([Regex]::Escape($Label))\*\*: (.+)$"
    foreach ($line in Get-Content -LiteralPath $planFile -Encoding utf8) {
        if ($line -match $pattern) {
            return $Matches[1].Trim()
        }
    }

    return ''
}

function Format-Value {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Value
    )

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return 'Unknown'
    }

    return $Value
}

function Get-TargetFileName {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetAgent
    )

    if ($agentFileMap.ContainsKey($TargetAgent)) {
        return $agentFileMap[$TargetAgent]
    }

    return "$TargetAgent.md"
}

function New-ContextContent {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetAgent
    )

    $today = Get-Date -Format 'yyyy-MM-dd'
    $language = Format-Value -Value (Get-PlanField -Label 'Language/Version')
    $dependencies = Format-Value -Value (Get-PlanField -Label 'Primary Dependencies')
    $storage = Format-Value -Value (Get-PlanField -Label 'Storage')
    $testing = Format-Value -Value (Get-PlanField -Label 'Testing')
    $platform = Format-Value -Value (Get-PlanField -Label 'Target Platform')
    $projectType = Format-Value -Value (Get-PlanField -Label 'Project Type')
    $performance = Format-Value -Value (Get-PlanField -Label 'Performance Goals')
    $constraints = Format-Value -Value (Get-PlanField -Label 'Constraints')
    $scale = Format-Value -Value (Get-PlanField -Label 'Scale/Scope')

    return @(
        "# Speckit Context - $TargetAgent"
        ''
        "Last updated: $today"
        ''
        '## Source'
        ''
        ('- Repository root: `{0}`' -f $repoRoot)
        ('- Active feature branch: `{0}`' -f $branchName)
        ('- Plan file: `{0}`' -f $planFile)
        ''
        '## Technical Context'
        ''
        "- Language/Version: $language"
        "- Primary Dependencies: $dependencies"
        "- Storage: $storage"
        "- Testing: $testing"
        "- Target Platform: $platform"
        "- Project Type: $projectType"
        "- Performance Goals: $performance"
        "- Constraints: $constraints"
        "- Scale/Scope: $scale"
        ''
        '## Safe Parity Guardrails'
        ''
        '- This file is repo-local and owned by `.specify/context/`.'
        '- It summarizes the active feature plan for a specific tool or agent.'
        '- It must never be used to rewrite home-dir configs or unrelated governance files.'
        '- Never modify files outside the owning repository.'
    ) -join [Environment]::NewLine
}

function Update-AgentContextFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetAgent
    )

    $fileName = Get-TargetFileName -TargetAgent $TargetAgent
    $targetFile = Join-Path $contextDir $fileName
    $content = New-ContextContent -TargetAgent $TargetAgent
    Set-Content -LiteralPath $targetFile -Value $content -Encoding utf8
    Write-Host "Updated $targetFile"
}

if (-not (Test-Path -LiteralPath $planFile)) {
    Write-Error "No plan.md found at $planFile"
    exit 1
}

New-Item -ItemType Directory -Force -Path $contextDir | Out-Null

if ($AgentType) {
    Update-AgentContextFile -TargetAgent $AgentType
    exit 0
}

$existingAgents = @(
    foreach ($agent in $knownAgentTypes) {
        $fileName = Get-TargetFileName -TargetAgent $agent
        if (Test-Path -LiteralPath (Join-Path $contextDir $fileName)) {
            $agent
        }
    }
)

if ($existingAgents.Count -eq 0) {
    $existingAgents = @('opencode')
}

foreach ($agent in $existingAgents) {
    Update-AgentContextFile -TargetAgent $agent
}
