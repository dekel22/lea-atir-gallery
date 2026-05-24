Add-Type -AssemblyName System.Drawing

$file = Get-ChildItem -Path "public/galleries" -Filter "*26.jpg" -Recurse | Select-Object -First 1
if (-not $file) {
    Write-Output "File not found!"
    return
}

Write-Output "Cropping file: $($file.FullName)"
$srcBmp = [System.Drawing.Bitmap]::FromFile($file.FullName)
Write-Output "Original size: Width=$($srcBmp.Width), Height=$($srcBmp.Height)"

# Crop 30 pixels from the right
$cropX = 0
$cropY = 0
$cropW = $srcBmp.Width - 30
$cropH = $srcBmp.Height

Write-Output "New size: Width=$cropW, Height=$cropH"

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$destBmp = $srcBmp.Clone($rect, $srcBmp.PixelFormat)

$tempPath = "$($file.FullName).tmp.jpg"
$destBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Dispose to unlock files
$srcBmp.Dispose()
$destBmp.Dispose()

# Overwrite original
Move-Item -Path $tempPath -Destination $file.FullName -Force
Write-Output "Cropped image saved successfully!"
