Add-Type -AssemblyName System.Drawing

$allDirs = Get-ChildItem -Path "public/galleries" -Directory
$targetDir = $allDirs[6]

Write-Host "Matched Dir: $($targetDir.Name)"

$subDir = Get-ChildItem -Path $targetDir.FullName -Directory
$scanPath = $targetDir.FullName
if ($subDir) {
    $scanPath = $subDir[0].FullName
}

Write-Host "Scanning: $($scanPath)"

$files = Get-ChildItem -Path $scanPath -Filter '*'
foreach ($file in $files) {
    if ($file.Extension -match '\.(jpg|jpeg|png)$') {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            $bmp = New-Object System.Drawing.Bitmap($img)
            $isGrayscale = $true
            
            $stepX = [math]::Max(1, [math]::Floor($bmp.Width / 20))
            $stepY = [math]::Max(1, [math]::Floor($bmp.Height / 20))
            
            for ($x = 1; $x -lt $bmp.Width; $x += $stepX) {
                for ($y = 1; $y -lt $bmp.Height; $y += $stepY) {
                    $pixel = $bmp.GetPixel($x, $y)
                    $diff1 = [math]::Abs($pixel.R - $pixel.G)
                    $diff2 = [math]::Abs($pixel.G - $pixel.B)
                    $diff3 = [math]::Abs($pixel.B - $pixel.R)
                    
                    if ($diff1 -gt 12 -or $diff2 -gt 12 -or $diff3 -gt 12) {
                        $isGrayscale = $false
                        break
                    }
                }
                if (-not $isGrayscale) { break }
            }
            
            $img.Dispose()
            $colorType = 'Color'
            if ($isGrayscale) { $colorType = 'Grayscale' }
            Write-Host "$($file.Name) : $($colorType)"
        } catch {
            Write-Host "$($file.Name) : Error"
        }
    }
}
