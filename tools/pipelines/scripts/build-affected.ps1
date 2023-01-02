$AffectedAppsObj = Invoke-Expression "npm run affected:apps -- --base=origin/master --plain";
$AffectedAppsString = $AffectedAppsObj[4];

if (!$AffectedAppsString -and $AffectedAppsString -eq "") {
    Write-Host "No affected apps. Building all apps.";
    Invoke-Expression 'npm run affected:build -- --prod --plain --all';
    return;
}

Invoke-Expression 'npm run affected:build -- --base=origin/master --head=HEAD --prod';
