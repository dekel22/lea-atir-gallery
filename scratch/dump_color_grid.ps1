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

    $gridW = 12
    $gridH = 12
    $stepX = $w / $gridW
    $stepY = $h / $gridH

    for ($r = 0; $r -lt $gridH; $r++) {
        $line = ""
        $y = [math]::Floor($r * $stepY)
        if ($y -ge $h) { $y = $h - 1 }
        for ($c = 0; $c -lt $gridW; $c++) {
            $x = [math]::Floor($c * $stepX)
            if ($x -ge $w) { $x = $w - 1 }
            $p = $bmp.GetPixel($x, $y)
            # Format: R,G,B
            $line += " | " + $p.R + "," + $p.G + "," + $p.B
        }
        Write-Host $line
    }

    $img.Dispose()
    $bmp.Dispose()
} catch {
    Write-Host "Error: $_"
}
