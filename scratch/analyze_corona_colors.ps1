Add-Type -AssemblyName System.Drawing

$allDirs = Get-ChildItem -Path "public/galleries" -Directory
$targetDir = $allDirs[6]

$subDir = Get-ChildItem -Path $targetDir.FullName -Directory
$scanPath = $targetDir.FullName
if ($subDir) {
    $scanPath = $subDir[0].FullName
}

$files = Get-ChildItem -Path $scanPath -Filter '*'
foreach ($file in $files) {
    if ($file.Extension -match '\.(jpg|jpeg|png)$') {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            $bmp = New-Object System.Drawing.Bitmap($img)
            
            $maxDiff = 0
            $totalDiff = 0
            $count = 0
            
            $stepX = [math]::Max(1, [math]::Floor($bmp.Width / 15))
            $stepY = [math]::Max(1, [math]::Floor($bmp.Height / 15))
            
            for ($x = 1; $x -lt $bmp.Width; $x += $stepX) {
                for ($y = 1; $y -lt $bmp.Height; $y += $stepY) {
                    $pixel = $bmp.GetPixel($x, $y)
                    $diff1 = [math]::Abs($pixel.R - $pixel.G)
                    $diff2 = [math]::Abs($pixel.G - $pixel.B)
                    $diff3 = [math]::Abs($pixel.B - $pixel.R)
                    
                    $m = [math]::Max($diff1, [math]::Max($diff2, $diff3))
                    if ($m -gt $maxDiff) { $maxDiff = $m }
                    $totalDiff += $m
                    $count++
                }
            }
            
            $img.Dispose()
            $avgDiff = $totalDiff / $count
            Write-Host "$($file.Name) : MaxDiff=$maxDiff, AvgDiff=$([math]::Round($avgDiff, 2))"
        } catch {
            Write-Host "$($file.Name) : Error"
        }
    }
}
