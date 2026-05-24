Add-Type -AssemblyName System.Drawing

$allDirs = Get-ChildItem -Path "public/galleries" -Directory
$targetDir = $allDirs[7]
Write-Host "Matched Dir: $($targetDir.Name)"

$files = Get-ChildItem -Path $targetDir.FullName -Filter *
foreach ($file in $files) {
    if ($file.Extension -match "\.(jpg|jpeg|png)$") {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            Write-Host "$($file.Name) : Width=$($img.Width), Height=$($img.Height)"
            $img.Dispose()
        } catch {
            Write-Host "$($file.Name) : Error"
        }
    }
}
