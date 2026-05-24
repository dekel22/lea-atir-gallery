Add-Type -AssemblyName System.Drawing

$file = Get-ChildItem -Path "public/galleries" -Filter "*כמעט שחור לבן6.JPG" -Recurse | Select-Object -First 1
if (-not $file) {
    Write-Output "File not found!"
    return
}

Write-Output "Found file: $($file.FullName)"
$img = [System.Drawing.Image]::FromFile($file.FullName)
$bmp = New-Object System.Drawing.Bitmap($img)
Write-Output "Image size: Width=$($bmp.Width), Height=$($bmp.Height)"

$midX = [math]::Floor($bmp.Width / 2)
$midY = [math]::Floor($bmp.Height / 2)

Write-Output "=== Top border (first 100 pixels, midX) ==="
for ($y = 0; $y -lt 100; $y += 5) {
    $p = $bmp.GetPixel($midX, $y)
    Write-Output "y=$($y) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "=== Bottom border (last 100 pixels, midX) ==="
for ($y = $bmp.Height - 100; $y -lt $bmp.Height; $y += 5) {
    $p = $bmp.GetPixel($midX, $y)
    Write-Output "y=$($y) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "=== Left border (first 100 pixels, midY) ==="
for ($x = 0; $x -lt 100; $x += 5) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "=== Right border (last 100 pixels, midY) ==="
for ($x = $bmp.Width - 100; $x -lt $bmp.Width; $x += 5) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

$img.Dispose()
$bmp.Dispose()
