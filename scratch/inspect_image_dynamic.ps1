Add-Type -AssemblyName System.Drawing

$file = Get-ChildItem -Path "public/galleries" -Filter "*28.jpg" -Recurse | Select-Object -First 1
if (-not $file) {
    Write-Output "File not found!"
    return
}

Write-Output "Found file: $($file.FullName)"
$img = [System.Drawing.Image]::FromFile($file.FullName)
$bmp = New-Object System.Drawing.Bitmap($img)
Write-Output "Image size: Width=$($bmp.Width), Height=$($bmp.Height)"

$midY = [math]::Floor($bmp.Height / 2)
Write-Output "Left border (first 50 columns):"
for ($x = 0; $x -lt 50; $x++) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "Right border (last 50 columns):"
for ($x = $bmp.Width - 50; $x -lt $bmp.Width; $x++) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

$midX = [math]::Floor($bmp.Width / 2)
Write-Output "Top border (first 50 rows):"
for ($y = 0; $y -lt 50; $y++) {
    $p = $bmp.GetPixel($midX, $y)
    Write-Output "y=$($y) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "Bottom border (last 50 rows):"
for ($y = $bmp.Height - 50; $y -lt $bmp.Height; $y++) {
    $p = $bmp.GetPixel($midX, $y)
    Write-Output "y=$($y) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

$img.Dispose()
