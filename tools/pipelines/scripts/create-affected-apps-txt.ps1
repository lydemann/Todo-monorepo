$AffectedAppsObj = Invoke-Expression 'nx print-affected --type=app --select=projects';
$AffectedAppsString = $AffectedAppsObj;

if ($AffectedAppsString -eq "") {
    Write-Host "No affected apps. Tagging with all apps.";
    $AffectedAppsObj = Invoke-Expression 'npx nx print-affected --type=app --select=projects';
    $AffectedAppsString = $AffectedAppsObj;
}

"Affected apps: $AffectedAppsString";
New-Item -Path "./dist" -Name "affected-apps.txt" -ItemType "file" -Value "$AffectedAppsString";
