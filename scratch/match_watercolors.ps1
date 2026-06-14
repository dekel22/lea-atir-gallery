Add-Type -AssemblyName System.Drawing

function Get-ColorSignature($filePath) {
    try {
        $img = [System.Drawing.Image]::FromFile($filePath)
        $bmp = New-Object System.Drawing.Bitmap($img)
        
        $width = $bmp.Width
        $height = $bmp.Height
        
        # Calculate color signature on a 5x5 grid
        $gridSize = 5
        $stepX = [math]::Floor($width / ($gridSize + 1))
        $stepY = [math]::Floor($height / ($gridSize + 1))
        
        $signature = @()
        for ($i = 1; $i -le $gridSize; $i++) {
            for ($j = 1; $j -le $gridSize; $j++) {
                $x = $i * $stepX
                $y = $j * $stepY
                if ($x -lt $width -and $y -lt $height) {
                    $pixel = $bmp.GetPixel($x, $y)
                    $signature += $pixel.R
                    $signature += $pixel.G
                    $signature += $pixel.B
                }
            }
        }
        
        $img.Dispose()
        return @{
            Width = $width
            Height = $height
            Signature = $signature
        }
    } catch {
        return $null
    }
}

$uploadedFiles = @(
    "media__1781423132955.jpg",
    "media__1781423132956.jpg",
    "media__1781423132957.jpg",
    "media__1781423132973.jpg"
)

$watercolorFiles = @(
    "דיוקן קורונה23.jpg",
    "דיוקן קורונה25.jpg",
    "דיוקן קורונה26.jpg",
    "דיוקן קורונה28.jpg",
    "דיוקן קורונה29.jpg",
    "דיוקןקורונה19.jpg",
    "דיוקןקוררונה27.jpg",
    "קורונה באקוורל.jpg",
    "קורונה באקוורל2.jpg"
)

# Find target dir dynamically
$allDirs = Get-ChildItem -Path "public/galleries" -Directory
$targetDir = $null
$part1 = "$([char]0x05E7)$([char]0x05DF)$([char]0x05E8)$([char]0x05D5)$([char]0x05E0)$([char]0x05D4)" # קןרונה
$part2 = "$([char]0x05E7)$([char]0x05D5)$([char]0x05E8)$([char]0x05D5)$([char]0x05E0)$([char]0x05D4)" # קורונה
foreach ($d in $allDirs) {
    if ($d.Name.Contains($part1) -or $d.Name.Contains($part2)) {
        $targetDir = $d
        break
    }
}
$scanPath = $targetDir.FullName
$subDir = Get-ChildItem -Path $targetDir.FullName -Directory
if ($subDir) {
    $scanPath = $subDir[0].FullName
}

$outLines = @()
$outLines += "--- WATERCOLOR MATCHING RESULTS ---"

foreach ($upName in $uploadedFiles) {
    $upSig = Get-ColorSignature "scratch/$upName"
    if (-not $upSig) {
        $outLines += "Could not load scratch/$upName"
        continue
    }
    
    $outLines += "`nUploaded Image: $upName ($($upSig.Width)x$($upSig.Height))"
    
    $results = @()
    foreach ($wcName in $watercolorFiles) {
        $wcPath = Join-Path $scanPath $wcName
        $wcSig = Get-ColorSignature $wcPath
        if ($wcSig) {
            # Compute distance
            $dist = 0
            for ($k = 0; $k -lt $upSig.Signature.Count; $k++) {
                $diff = $upSig.Signature[$k] - $wcSig.Signature[$k]
                $dist += $diff * $diff
            }
            $dist = [math]::Sqrt($dist)
            
            $results += [PSCustomObject]@{
                Name = $wcName
                Width = $wcSig.Width
                Height = $wcSig.Height
                Distance = $dist
            }
        }
    }
    
    $sorted = $results | Sort-Object Distance
    foreach ($r in $sorted) {
        $outLines += "  Original: $($r.Name) ($($r.Width)x$($r.Height)) -> Distance: $([math]::Round($r.Distance, 2))"
    }
}

$outLines | Out-File -FilePath "scratch/watercolor_matches.txt" -Encoding utf8
Write-Host "Saved matches to scratch/watercolor_matches.txt"
