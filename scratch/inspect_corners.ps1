param (
    [string]$ImagePath
)
Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $ImagePath)) {
    Write-Host "Error: Path not found!"
    return
}

try {
    $img = [System.Drawing.Image]::FromFile($ImagePath)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $w = $bmp.Width
    $h = $bmp.Height

    Write-Host "=== Top-Left Corner ==="
    for ($y = 0; $y -lt 15; $y++) {
        $p = $bmp.GetPixel(0, $y)
        Write-Host "x=0, y=$y : R=$($p.R) G=$($p.G) B=$($p.B)"
    }
    for ($x = 0; $x -lt 15; $x++) {
        $p = $bmp.GetPixel($x, 0)
        Write-Host "x=$x, y=0 : R=$($p.R) G=$($p.G) B=$($p.B)"
    }

    Write-Host "=== Bottom-Left Corner ==="
    for ($y = $h - 15; $y -lt $h; $y++) {
        $p = $bmp.GetPixel(0, $y)
        Write-Host "x=0, y=$y : R=$($p.R) G=$($p.G) B=$($p.B)"
    }
    for ($x = 0; $x -lt 15; $x++) {
        $p = $bmp.GetPixel($x, $h - 1)
        Write-Host "x=$x, y=$($h-1) : R=$($p.R) G=$($p.G) B=$($p.B)"
    }

    Write-Host "=== Top-Right Corner ==="
    for ($y = 0; $y -lt 15; $y++) {
        $p = $bmp.GetPixel($w - 1, $y)
        Write-Host "x=$($w-1), y=$y : R=$($p.R) G=$($p.G) B=$($p.B)"
    }
    for ($x = $w - 15; $x -lt $w; $x++) {
        $p = $bmp.GetPixel($x, 0)
        Write-Host "x=$x, y=0 : R=$($p.R) G=$($p.G) B=$($p.B)"
    }

    $img.Dispose()
    $bmp.Dispose()
} catch {
    Write-Host "Error: $_"
}
