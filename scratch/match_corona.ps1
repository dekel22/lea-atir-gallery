Add-Type -AssemblyName System.Drawing

function Get-ImageProfile($filePath) {
    try {
        $img = [System.Drawing.Image]::FromFile($filePath)
        $bmp = New-Object System.Drawing.Bitmap($img)
        
        $width = $bmp.Width
        $height = $bmp.Height
        
        # Calculate average color on a 5x5 grid
        $gridSize = 5
        $stepX = [math]::Floor($width / ($gridSize + 1))
        $stepY = [math]::Floor($height / ($gridSize + 1))
        
        $totalR = 0
        $totalG = 0
        $totalB = 0
        $count = 0
        
        for ($i = 1; $i -le $gridSize; $i++) {
            for ($j = 1; $j -le $gridSize; $j++) {
                $x = $i * $stepX
                $y = $j * $stepY
                if ($x -lt $width -and $y -lt $height) {
                    $pixel = $bmp.GetPixel($x, $y)
                    $totalR += $pixel.R
                    $totalG += $pixel.G
                    $totalB += $pixel.B
                    $count++
                }
            }
        }
        
        $avgR = [math]::Round($totalR / $count, 1)
        $avgG = [math]::Round($totalG / $count, 1)
        $avgB = [math]::Round($totalB / $count, 1)
        
        $img.Dispose()
        return [PSCustomObject]@{
            Path = $filePath
            Name = [System.IO.Path]::GetFileName($filePath)
            Width = $width
            Height = $height
            AvgR = $avgR
            AvgG = $avgG
            AvgB = $avgB
        }
    } catch {
        Write-Error "Error processing $filePath : $_"
        return $null
    }
}

# Scan scratch folder
Write-Host "--- UPLOADED IMAGES ---"
$scratchFiles = Get-ChildItem -Path "scratch/media__*.jpg"
$uploadedProfiles = @()
foreach ($file in $scratchFiles) {
    $profile = Get-ImageProfile $file.FullName
    if ($profile) {
        $uploadedProfiles += $profile
        Write-Host "$($profile.Name) : $($profile.Width)x$($profile.Height) | AvgRGB: $($profile.AvgR), $($profile.AvgG), $($profile.AvgB)"
    }
}

# Scan corona folder using char codes to avoid encoding issues
Write-Host "`n--- ORIGINAL GALLERY CORONA IMAGES (Colored ones) ---"
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

if (-not $targetDir) {
    Write-Host "Target directory not found!"
    return
}

$scanPath = $targetDir.FullName
$subDir = Get-ChildItem -Path $targetDir.FullName -Directory
if ($subDir) {
    $scanPath = $subDir[0].FullName
}

Write-Host "Scanning target directory: $scanPath"

$galleryFiles = Get-ChildItem -Path "$scanPath/*.jpg"
$galleryProfiles = @()
foreach ($file in $galleryFiles) {
    $profile = Get-ImageProfile $file.FullName
    if ($profile) {
        # Filter for colored ones to keep it simple, or just list all
        $maxDiff = [math]::Max([math]::Abs($profile.AvgR - $profile.AvgG), [math]::Abs($profile.AvgG - $profile.AvgB))
        $maxDiff = [math]::Max($maxDiff, [math]::Abs($profile.AvgB - $profile.AvgR))
        
        # Color or Grayscale
        $imgType = "Grayscale"
        if ($maxDiff -gt 8) {
            $imgType = "Color"
        }
        
        $galleryProfiles += $profile
        Write-Host "$($profile.Name) : $($profile.Width)x$($profile.Height) | AvgRGB: $($profile.AvgR), $($profile.AvgG), $($profile.AvgB) | Type: $imgType"
    }
}
