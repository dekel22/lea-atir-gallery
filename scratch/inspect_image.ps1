Add-Type -AssemblyName System.Drawing
$imgPath = "public/galleries/באקוורל/באקוורל/אקוורל28.jpg"
$img = [System.Drawing.Image]::FromFile((Resolve-Path $imgPath).Path)
$bmp = New-Object System.Drawing.Bitmap($img)
Write-Output "Image size: Width=$($bmp.Width), Height=$($bmp.Height)"

Write-Output "Left border (first 50 columns along the middle row):"
$midY = [math]::Floor($bmp.Height / 2)
for ($x = 0; $x -lt 50; $x++) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "Right border (last 50 columns along the middle row):"
for ($x = $bmp.Width - 50; $x -lt $bmp.Width; $x++) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "Top border (first 50 rows along the middle column):"
$midX = [math]::Floor($bmp.Width / 2)
for ($y = 0; $y -lt 50; $y++) {
    $p = $bmp.GetPixel($midX, $y)
    Write-Output "y=$($y) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

Write-Output "Bottom border (last 50 rows along the middle column):"
for ($y = $bmp.Height - 50; $y -lt $bmp.Height; $y++) {
    $p = $bmp.GetPixel($midX, $y)
    Write-Output "y=$($y) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

$img.Dispose()
