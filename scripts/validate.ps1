<#
.SYNOPSIS
    Orchestrates validate-fast and validate-full gates for the HelenSantosPortfolio ecosystem.
.DESCRIPTION
    Governance tools + metadata sync verification + build.
    Non-destructive — read-only validators only.
.PARAMETER Mode
    fast — governance audits + metadata sync verification.
    full — fast + npm build.
#>
param(
    [ValidateSet('fast', 'full')]
    [string]$Mode = 'fast'
)

Set-StrictMode -Version Latest
$RootDir = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Failures = [System.Collections.Generic.List[string]]::new()

function Invoke-Gate([string]$Label, [string]$WorkDir, [scriptblock]$Action) {
    Write-Host "`n=== $Label ===" -ForegroundColor Cyan
    $saved = Get-Location
    try {
        Set-Location $WorkDir
        & $Action
        Write-Host "  PASSED" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
        $script:Failures.Add($Label)
    } finally {
        Set-Location $saved
    }
}

# ---- Governance (fast) ----

Invoke-Gate 'verify-precedence' $RootDir {
    python tools/governance/verify-precedence.py
    if ($LASTEXITCODE -ne 0) { throw "verify-precedence exit code $LASTEXITCODE" }
}

Invoke-Gate 'verify-metadata-sync' $RootDir {
    node scripts/verify-metadata-sync.mjs
    if ($LASTEXITCODE -ne 0) { throw "exit code $LASTEXITCODE" }
}

# ---- Full-only gates ----

if ($Mode -eq 'full') {
    Invoke-Gate 'npm build' $RootDir {
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "exit code $LASTEXITCODE" }
    }
}

# ---- Summary ----

Write-Host "`n=============================" -ForegroundColor White
if ($Failures.Count -eq 0) {
    Write-Host "validate-$Mode PASSED" -ForegroundColor Green
    exit 0
} else {
    Write-Host "validate-$Mode FAILED ($($Failures.Count) gate(s)):" -ForegroundColor Red
    $Failures | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    exit 1
}
