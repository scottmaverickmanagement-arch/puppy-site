$nodeVersion = "v20.11.1"
$url = "https://nodejs.org/dist/$nodeVersion/node-$nodeVersion-win-x64.zip"
$zipPath = "$env:TEMP\node.zip"
$extractPath = "$env:TEMP\node"

if (!(Test-Path "$extractPath\node-$nodeVersion-win-x64\node.exe")) {
    Write-Host "Downloading portable Node.js $nodeVersion..."
    Invoke-WebRequest -Uri $url -OutFile $zipPath
    Write-Host "Extracting Node.js..."
    Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
}

$nodeBinPath = "$extractPath\node-$nodeVersion-win-x64"
$env:PATH = "$nodeBinPath;" + $env:PATH

Write-Host "Node.js version: $(node -v)"
Write-Host "npm version: $(npm -v)"

Write-Host "Installing project dependencies (this may take a minute)..."
npm install

Write-Host "Starting local development server..."
npm run dev
