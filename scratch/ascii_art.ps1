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

    $cols = 80
    $rows = 40
    $stepX = $w / $cols
    $stepY = $h / $rows

    Write-Host "=== ASCII ART OF IMAGE ==="
    for ($r = 0; $r -lt $rows; $r++) {
        $line = ""
        $y = [math]::Floor($r * $stepY)
        if ($y -ge $h) { $y = $h - 1 }
        for ($c = 0; $c -lt $cols; $c++) {
            $x = [math]::Floor($c * $stepX)
            if ($x -ge $w) { $x = $w - 1 }
            $p = $bmp.GetPixel($x, $y)
            # Brightness calculation
            $brightness = ($p.R * 0.299 + $p.G * 0.587 + $p.B * 0.114)
            if ($brightness -lt 80) {
                $line += "#"
            } elseif ($brightness -lt 110) {
                $line += "x"
            } elseif ($brightness -lt 140) {
                $line += "."
            } else {
                $line += " "
            }
        }
        Write-Host $line
    }

    $img.Dispose()
    $bmp.Dispose()
} catch {
    Write-Host "Error: $_"
}
