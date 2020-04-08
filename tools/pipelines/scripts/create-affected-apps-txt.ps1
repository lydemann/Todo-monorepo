$AffectedAppsObj = Invoke-Expression 'npm run affected:apps -- --base=origin/master --head=HEAD --plain';
$AffectedAppsString = $AffectedAppsObj[4];

if ($AffectedAppsString -eq "") {
    Write-Host "No affected apps";
}

"Affected apps: $AffectedAppsString";
New-Item -Path "./dist" -Name "affected-apps.txt" -ItemType "file" -Value "$AffectedAppsString";
