Add-Type -AssemblyName System.Drawing

$file = Get-ChildItem -Path "public/galleries" -Filter "*26.jpg" -Recurse | Select-Object -First 1
if (-not $file) {
    Write-Output "File not found!"
    return
}

Write-Output "Found file: $($file.FullName)"
$img = [System.Drawing.Image]::FromFile($file.FullName)
$bmp = New-Object System.Drawing.Bitmap($img)
Write-Output "Image size: Width=$($bmp.Width), Height=$($bmp.Height)"

$midY = [math]::Floor($bmp.Height / 2)
Write-Output "Right border (last 80 columns):"
for ($x = $bmp.Width - 80; $x -lt $bmp.Width; $x++) {
    $p = $bmp.GetPixel($x, $midY)
    Write-Output "x=$($x) : R=$($p.R) G=$($p.G) B=$($p.B)"
}

$img.Dispose()
