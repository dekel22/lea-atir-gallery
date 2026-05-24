param (
    [string]$ImagePath
)
Add-Type -AssemblyName System.Drawing

Write-Host "Analyzing ImagePath: $ImagePath"
if (-not (Test-Path $ImagePath)) {
    Write-Host "Error: Path not found!"
    return
}

try {
    $img = [System.Drawing.Image]::FromFile($ImagePath)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $w = $bmp.Width
    $h = $bmp.Height

    Write-Host "=== IMAGE SIZE ==="
    Write-Host "Width=$w Height=$h"

    # Profile columns (average color per column, sampling every 5 pixels for better resolution)
    Write-Host "=== COLUMNS ==="
    for ($x = 0; $x -lt $w; $x += 5) {
        $rSum = 0; $gSum = 0; $bSum = 0;
        for ($y = 0; $y -lt $h; $y += 5) {
            $p = $bmp.GetPixel($x, $y)
            $rSum += $p.R; $gSum += $p.G; $bSum += $p.B
        }
        $cnt = [math]::Floor($h / 5)
        $r = [math]::Floor($rSum / $cnt)
        $g = [math]::Floor($gSum / $cnt)
        $b = [math]::Floor($bSum / $cnt)
        Write-Host "col $x : R=$r G=$g B=$b"
    }

    # Profile rows (average color per row, sampling every 5 pixels for better resolution)
    Write-Host "=== ROWS ==="
    for ($y = 0; $y -lt $h; $y += 5) {
        $rSum = 0; $gSum = 0; $bSum = 0;
        for ($x = 0; $x -lt $w; $x += 5) {
            $p = $bmp.GetPixel($x, $y)
            $rSum += $p.R; $gSum += $p.G; $bSum += $p.B
        }
        $cnt = [math]::Floor($w / 5)
        $r = [math]::Floor($rSum / $cnt)
        $g = [math]::Floor($gSum / $cnt)
        $b = [math]::Floor($bSum / $cnt)
        Write-Host "row $y : R=$r G=$g B=$b"
    }

    $img.Dispose()
    $bmp.Dispose()
} catch {
    Write-Host "Error: $_"
}
