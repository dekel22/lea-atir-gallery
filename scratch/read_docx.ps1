param (
    [string]$DocxPath
)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$tempDir = Join-Path $env:TEMP "docx_temp"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $tempDir -ErrorAction SilentlyContinue | Out-Null

$zipPath = Join-Path $tempDir "doc.zip"
Copy-Item $DocxPath $zipPath
Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force

$xmlPath = Join-Path $tempDir "word/document.xml"
if (Test-Path $xmlPath) {
    [xml]$xml = Get-Content $xmlPath -Encoding UTF8 -Raw
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    $textNodes = $xml.SelectNodes("//w:t", $ns)
    foreach ($node in $textNodes) {
        Write-Host $node.InnerText
    }
} else {
    Write-Host "Error: word/document.xml not found!"
}

Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
