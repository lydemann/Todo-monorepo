$AffectedAppsObj = Invoke-Expression 'npm run affected:apps -- --base=origin/master --head=HEAD';
$AffectedAppsString = $AffectedAppsObj[4];

if ($AffectedAppsString -eq "") {
    Write-Host "No affected apps. Tagging with all apps.";
    $AffectedAppsObj = Invoke-Expression 'npm run affected:apps -- --all';
    $AffectedAppsString = $AffectedAppsObj[4];
}

"Affected apps: $AffectedAppsString";
New-Item -Path "./dist" -Name "affected-apps.txt" -ItemType "file" -Value "$AffectedAppsString";
