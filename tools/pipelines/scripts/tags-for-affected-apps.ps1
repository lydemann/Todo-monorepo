# Finds last git hash with tag. The param Tag just has to match some part of the tag
# TODO: use this to find last successful master build, if running this on master
function FindLastGithashWithTag {
    param (
        $Tag
    )

    $gitTags = git tag -l -n $Tag*;
    Write-Host "gitTags $gitTags";

    $gitTag = $gitTags[1]; # take the last git tag, because current commit has the first

    Write-Host "Finding commit for git tag $gitTag";

    $gitHash = Invoke-Expression "git rev-list -n 1 $gitTag";

    Write-Host "Found git hash $gitHash";
}

# Create Build tag
#Tag the build with app name in order to trigger deployment
#Same tag should be in release definition triggers
function addTagToBuildArtifact {
    param (
        [String]$tag
    )

    Write-Host "Creating tag for $tag";
    $url =
    "$($env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)$env:SYSTEM_TEAMPROJECTID/_apis/build/builds/$($env:BUILD_BUILDID)/tags/$($tag)?api-version=2.0";
    $headers = @{Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN" };

    Write-Host "Sending request to Azure DevOps";
    Write-Host $url;

    Try {
        $tag = Invoke-RestMethod -Uri $url -Headers $headers -Method PUT;
        Write-Host "Tag= $($tag| ConvertTo-Json -Depth 3)";
    }
    Catch {
        $_ERROR = $_.Exception.Message
        $errorDetail = $_
        $errorMessage = @"
Failed to tag build.
$error
$errorDetail
"@
        Write-Error $errorMessage -ErrorAction Continue
        return 0
    }
}

########## Main flow
$sourceVersion = $env:SYSTEM_PULLREQUEST_SOURCECOMMITID;

Write-Host "Tagging git hash in artifact: $($sourceVersion)";
addTagToBuildArtifact -tag $sourceVersion;


$AffectedAppsObj = Invoke-Expression 'npm run affected:apps -- --base=origin/master --head=HEAD --plain';
$AffectedAppsString = $AffectedAppsObj[4];

if (!$AffectedAppsString -and $AffectedAppsString -eq "") {
    Write-Host "No affected apps. Tagging with all apps.";
    $AffectedAppsObj = Invoke-Expression 'npm run affected:apps -- --all --plain';
    $AffectedAppsString = $AffectedAppsObj[4];
}

$AffectedApps = $AffectedAppsString.Split(" ");
Write-Host "Affected apps: " $AffectedApps;

$branchname = $env:SYSTEM_PULLREQUEST_SOURCEBRANCHNAME;
Write-Host "Branch is $branchname";
    
$AffectedApps | ForEach-Object {
    $AffectedAppName = $_;
    addTagToBuildArtifact -tag $AffectedAppName;
}
