$AffectedAppsObj = Invoke-Expression 'npx nx print-affected --type=app --select=projects --base=origin/master';
$AffectedAppsString = $AffectedAppsObj;

if ($AffectedAppsString -eq "") {
    Write-Host "No affected apps. Tagging with all apps.";
    $AffectedAppsObj = Invoke-Expression 'npx nx show projects -t build';
    $AffectedAppsString = $AffectedAppsObj -join ' ';
}

"Affected apps: $AffectedAppsString";
New-Item -Path "./dist" -Name "affected-apps.txt" -ItemType "file" -Value "$AffectedAppsString";
