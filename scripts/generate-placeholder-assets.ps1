param(
    [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function New-CircleBadge {
    param(
        [string]$Path,
        [int]$Size,
        [string]$Text = 'HS'
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.Color]::FromArgb(244, 237, 228))

    $gradientRect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
    $gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $gradientRect,
        [System.Drawing.Color]::FromArgb(214, 175, 122),
        [System.Drawing.Color]::FromArgb(181, 111, 90),
        45
    )

    $circleSize = [int]($Size * 0.6)
    $circleOffset = [int](($Size - $circleSize) / 2)
    $graphics.FillEllipse($gradient, $circleOffset, $circleOffset, $circleSize, $circleSize)

    $ringPen = New-Object System.Drawing.Pen(
        [System.Drawing.Color]::FromArgb(72, 181, 111, 90),
        [float]([Math]::Max(2, $Size * 0.025))
    )
    $graphics.DrawEllipse($ringPen, 6, 6, $Size - 12, $Size - 12)

    $font = New-Object System.Drawing.Font(
        'Georgia',
        [float]($Size * 0.28),
        [System.Drawing.FontStyle]::Bold,
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 249, 242))

    $graphics.DrawString(
        $Text,
        $font,
        $textBrush,
        [System.Drawing.RectangleF]::new(0, 0, $Size, $Size),
        $format
    )

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

    $textBrush.Dispose()
    $format.Dispose()
    $font.Dispose()
    $ringPen.Dispose()
    $gradient.Dispose()
    $graphics.Dispose()
    $bmp.Dispose()
}

function New-Scene {
    param(
        [string]$Path,
        [int]$Width,
        [int]$Height,
        [string]$Label
    )

    $bmp = New-Object System.Drawing.Bitmap $Width, $Height
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    $backgroundRect = New-Object System.Drawing.Rectangle 0, 0, $Width, $Height
    $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $backgroundRect,
        [System.Drawing.Color]::FromArgb(248, 242, 234),
        [System.Drawing.Color]::FromArgb(236, 223, 210),
        90
    )
    $graphics.FillRectangle($background, $backgroundRect)

    $glowWarm = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(54, 213, 176, 123))
    $glowRose = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(42, 181, 111, 90))
    $cream = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(246, 239, 231))
    $linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(184, 142, 79, 66), 4)
    $softPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(92, 181, 111, 90), 2)

    $graphics.FillEllipse($glowWarm, [int]($Width * 0.56), [int]($Height * 0.08), [int]($Width * 0.22), [int]($Width * 0.22))
    $graphics.FillEllipse($glowRose, [int]($Width * -0.08), [int]($Height * 0.04), [int]($Width * 0.34), [int]($Width * 0.34))
    $graphics.FillEllipse($glowRose, [int]($Width * 0.62), [int]($Height * 0.62), [int]($Width * 0.28), [int]($Width * 0.28))
    $graphics.FillEllipse($cream, [int]($Width * 0.41), [int]($Height * 0.2), [int]($Width * 0.11), [int]($Width * 0.11))

    $curveA = [System.Drawing.PointF[]] @(
        [System.Drawing.PointF]::new([float]($Width * 0.27), [float]($Height * 0.78)),
        [System.Drawing.PointF]::new([float]($Width * 0.33), [float]($Height * 0.66)),
        [System.Drawing.PointF]::new([float]($Width * 0.37), [float]($Height * 0.52)),
        [System.Drawing.PointF]::new([float]($Width * 0.44), [float]($Height * 0.38)),
        [System.Drawing.PointF]::new([float]($Width * 0.53), [float]($Height * 0.34)),
        [System.Drawing.PointF]::new([float]($Width * 0.66), [float]($Height * 0.39))
    )
    $curveB = [System.Drawing.PointF[]] @(
        [System.Drawing.PointF]::new([float]($Width * 0.31), [float]($Height * 0.83)),
        [System.Drawing.PointF]::new([float]($Width * 0.39), [float]($Height * 0.73)),
        [System.Drawing.PointF]::new([float]($Width * 0.46), [float]($Height * 0.59)),
        [System.Drawing.PointF]::new([float]($Width * 0.52), [float]($Height * 0.47)),
        [System.Drawing.PointF]::new([float]($Width * 0.62), [float]($Height * 0.43)),
        [System.Drawing.PointF]::new([float]($Width * 0.77), [float]($Height * 0.44))
    )
    $curveC = [System.Drawing.PointF[]] @(
        [System.Drawing.PointF]::new([float]($Width * 0.35), [float]($Height * 0.39)),
        [System.Drawing.PointF]::new([float]($Width * 0.46), [float]($Height * 0.34)),
        [System.Drawing.PointF]::new([float]($Width * 0.56), [float]($Height * 0.36)),
        [System.Drawing.PointF]::new([float]($Width * 0.67), [float]($Height * 0.44))
    )

    $graphics.DrawCurve($linePen, $curveA)
    $graphics.DrawCurve($linePen, $curveB)
    $graphics.DrawCurve($softPen, $curveC)

    $titleFont = New-Object System.Drawing.Font('Georgia', [float]($Height * 0.08), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $subFont = New-Object System.Drawing.Font('Segoe UI', [float]($Height * 0.023), [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $tagFont = New-Object System.Drawing.Font('Segoe UI', [float]($Height * 0.024), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(67, 46, 41))
    $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(138, 110, 101))
    $tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(91, 72, 66))
    $pillBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(234, 255, 252, 247))

    $graphics.FillEllipse($pillBrush, [int]($Width * 0.08), [int]($Height * 0.09), [int]($Width * 0.24), [int]($Height * 0.07))
    $graphics.DrawString($Label, $tagFont, $tagBrush, [float]($Width * 0.12), [float]($Height * 0.108))
    $graphics.DrawString('Helen Santos', $titleFont, $titleBrush, [float]($Width * 0.1), [float]($Height * 0.78))
    $graphics.DrawString('presenca . rito . sensorialidade', $subFont, $subBrush, [float]($Width * 0.1), [float]($Height * 0.88))

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

    $pillBrush.Dispose()
    $tagBrush.Dispose()
    $subBrush.Dispose()
    $titleBrush.Dispose()
    $tagFont.Dispose()
    $subFont.Dispose()
    $titleFont.Dispose()
    $softPen.Dispose()
    $linePen.Dispose()
    $cream.Dispose()
    $glowRose.Dispose()
    $glowWarm.Dispose()
    $background.Dispose()
    $graphics.Dispose()
    $bmp.Dispose()
}

$assetsDir = Join-Path $Root 'assets'
$iconsDir = Join-Path $assetsDir 'icons'

New-CircleBadge -Path (Join-Path $iconsDir 'icon-192.png') -Size 192
New-CircleBadge -Path (Join-Path $iconsDir 'icon-512.png') -Size 512
New-CircleBadge -Path (Join-Path $Root 'favicon-32x32.png') -Size 32
New-CircleBadge -Path (Join-Path $Root 'apple-touch-icon.png') -Size 180
New-Scene -Path (Join-Path $assetsDir 'og-helen.png') -Width 1200 -Height 630 -Label 'AI PLACEHOLDER'
New-Scene -Path (Join-Path $assetsDir 'profile-helen.png') -Width 900 -Height 1200 -Label 'TEMPORARY PROFILE'

Copy-Item (Join-Path $Root 'favicon-32x32.png') (Join-Path $Root 'favicon.ico') -Force
