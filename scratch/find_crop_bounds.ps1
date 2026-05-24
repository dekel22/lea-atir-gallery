Add-Type -AssemblyName System.Drawing

$targetDir = "public/galleries/וריאציות על נושא"
$files = Get-ChildItem -Path $targetDir -Filter "*כמעט שחור לבן6*"
if (-not $files) {
    Write-Output "File not found!"
    return
}

$file = $files[0]
Write-Output "Analyzing file: $($file.FullName)"

try {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $w = $bmp.Width
    $h = $bmp.Height

    Write-Output "=== IMAGE SIZE ==="
    Write-Output "Width=$w Height=$h"

    # Profile columns (average color per column)
    Write-Output "=== COLUMNS ==="
    for ($x = 0; $x -lt $w; $x += 10) {
        $rSum = 0; $gSum = 0; $bSum = 0;
        for ($y = 0; $y -lt $h; $y += 10) {
            $p = $bmp.GetPixel($x, $y)
            $rSum += $p.R; $gSum += $p.G; $bSum += $p.B
        }
        $cnt = [math]::Floor($h / 10)
        $r = [math]::Floor($rSum / $cnt)
        $g = [math]::Floor($gSum / $cnt)
        $b = [math]::Floor($bSum / $cnt)
        Write-Output "col $x : R=$r G=$g B=$b"
    }

    # Profile rows (average color per row)
    Write-Output "=== ROWS ==="
    for ($y = 0; $y -lt $h; $y += 10) {
        $rSum = 0; $gSum = 0; $bSum = 0;
        for ($x = 0; $x -lt $w; $x += 10) {
            $p = $bmp.GetPixel($x, $y)
            $rSum += $p.R; $gSum += $p.G; $bSum += $p.B
        }
        $cnt = [math]::Floor($w / 10)
        $r = [math]::Floor($rSum / $cnt)
        $g = [math]::Floor($gSum / $cnt)
        $b = [math]::Floor($bSum / $cnt)
        Write-Output "row $y : R=$r G=$g B=$b"
    }

    $img.Dispose()
    $bmp.Dispose()
} catch {
    Write-Output "Error: $_"
}
