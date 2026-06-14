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
            Orientation = if ($width -gt $height) { "landscape" } else { "portrait" }
        }
    } catch {
        return $null
    }
}

# Load uploaded images
$uploaded = @{}
$scratchFiles = Get-ChildItem -Path "scratch/media__*.jpg"
foreach ($file in $scratchFiles) {
    $sig = Get-ColorSignature $file.FullName
    if ($sig) {
        $uploaded[$file.Name] = $sig
    }
}

# Scan original corona gallery directory
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

$galleryFiles = Get-ChildItem -Path "$scanPath/*.jpg"
$originals = @{}
foreach ($file in $galleryFiles) {
    $sig = Get-ColorSignature $file.FullName
    if ($sig) {
        $originals[$file.Name] = $sig
    }
}

$outLines = @()
$outLines += "--- MATCHING RESULTS ---"

foreach ($upName in $uploaded.Keys) {
    $upSig = $uploaded[$upName]
    $outLines += "`nUploaded: $upName ($($upSig.Width)x$($upSig.Height), $($upSig.Orientation))"
    
    # Calculate distance to all originals and sort
    $results = @()
    foreach ($origName in $originals.Keys) {
        $origSig = $originals[$origName]
        if ($upSig.Signature.Count -eq $origSig.Signature.Count) {
            $dist = 0
            for ($k = 0; $k -lt $upSig.Signature.Count; $k++) {
                $diff = $upSig.Signature[$k] - $origSig.Signature[$k]
                $dist += $diff * $diff
            }
            $dist = [math]::Sqrt($dist)
            
            $results += [PSCustomObject]@{
                Name = $origName
                Width = $origSig.Width
                Height = $origSig.Height
                Orientation = $origSig.Orientation
                Distance = $dist
            }
        }
    }
    
    # Sort and take top 5
    $sorted = $results | Sort-Object Distance
    for ($i = 0; $i -lt [math]::Min(5, $sorted.Count); $i++) {
        $r = $sorted[$i]
        $outLines += "  Match #$($i+1): $($r.Name) ($($r.Width)x$($r.Height), $($r.Orientation)) -> Distance: $([math]::Round($r.Distance, 2))"
    }
}

$outLines | Out-File -FilePath "scratch/matches.txt" -Encoding utf8
Write-Host "Saved matches to scratch/matches.txt"
