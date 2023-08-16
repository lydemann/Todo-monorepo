$AffectedAppsObj = Invoke-Expression "npm run affected:apps -- --base=origin/master";
$AffectedAppsString = $AffectedAppsObj[4];

if (!$AffectedAppsString -and $AffectedAppsString -eq "") {
    Write-Host "No affected apps. Building all apps.";
    Invoke-Expression 'npx nx run-many -t=build --prod --all';
    return;
}

Invoke-Expression 'npm run affected:build -- --base=origin/master --head=HEAD --prod';
