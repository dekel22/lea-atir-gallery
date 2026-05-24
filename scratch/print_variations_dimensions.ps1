Add-Type -AssemblyName System.Drawing

$dir = Get-ChildItem -Path "public/galleries" -Directory | Where-Object { $_.Name -like "*וריאציות*" }
if (-not $dir) {
    Write-Output "Directory not found!"
    return
}

$files = Get-ChildItem -Path $dir.FullName -Filter *
foreach ($file in $files) {
    if ($file.Extension -match "\.(jpg|jpeg|png)$") {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            Write-Output "$($file.Name) : Width=$($img.Width), Height=$($img.Height)"
            $img.Dispose()
        } catch {
            Write-Output "$($file.Name) : Error"
        }
    }
}
