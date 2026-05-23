Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem "public/galleries/ברוש" -Filter *
foreach ($file in $files) {
    if ($file.Extension -match "\.(jpg|jpeg|png)$") {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            $bmp = New-Object System.Drawing.Bitmap($img)
            $isGrayscale = $true
            # Sample a 10x10 grid of pixels
            $stepX = [math]::Max(1, [math]::Floor($bmp.Width / 10))
            $stepY = [math]::Max(1, [math]::Floor($bmp.Height / 10))
            for ($x = 1; $x -lt $bmp.Width; $x += $stepX) {
                for ($y = 1; $y -lt $bmp.Height; $y += $stepY) {
                    $pixel = $bmp.GetPixel($x, $y)
                    $diff1 = [math]::Abs($pixel.R - $pixel.G)
                    $diff2 = [math]::Abs($pixel.G - $pixel.B)
                    $diff3 = [math]::Abs($pixel.B - $pixel.R)
                    # If R, G, B differ by more than 8, it has color
                    if ($diff1 -gt 8 -or $diff2 -gt 8 -or $diff3 -gt 8) {
                        $isGrayscale = $false
                        break
                    }
                }
                if (-not $isGrayscale) { break }
            }
            $img.Dispose()
            Write-Output "$($file.Name):$isGrayscale"
        } catch {
            Write-Output "$($file.Name):Error ($($_.Exception.Message))"
        }
    }
}
