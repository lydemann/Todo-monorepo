function TriggerBuild {
    param (
        [int]$Number
    )

    $Branch = $env:BUILD_SOURCEBRANCH;

    Write-Host "Branch is $Branch";

    $body = @{
        "definition"   = @{
            "id" = $Number
        };
        "sourceBranch" = "$Branch";
    };

    $bodyJson = $body | ConvertTo-Json;

    Write-Host "Body is $bodyJson";

    $headers = @{Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN" };
    Write-Host "Access token: Bearer $env:SYSTEM_ACCESSTOKEN";

    $url = "$($env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)$env:SYSTEM_TEAMPROJECTID/_apis/build/builds?api-version=5.0";

    Write-Host "Url $url";

    Try {
        $buildTriggerRes = Invoke-RestMethod -Uri $url -ContentType application/json -Headers $headers -Body $bodyJson -Method POST;
        Write-Host "Build triggered: $($buildTriggerRes| ConvertTo-Json -Depth 3)";
    }
    Catch {
        $error = $_.Exception.Message
        $errorDetail = $_
        $errorMessage =
        @"
Failed to trigger build.
$error
$errorDetail
"@
        Write-Error $errorMessage -ErrorAction Continue
        return 0
    }
}

# get affected node apps
$AffectedAppsObj = npm run affected:apps -- --base=origin/master --head=HEAD;


$BranchName = $env:BUILD_SOURCEBRANCHNAME;
$IsMaster = $BranchName -eq "master";

Write-Host "Is master: $IsMaster";
Write-Host "Affected apps string: $AffectedAppsString";

# TODO: remove trigger-node-apps-master and just use this in both placeas with isMaster conditional
if ($IsMaster -eq "True") {

    $LastCommit = git show HEAD~1;
    $LastCommitHash = $LastCommit[0].Split(' ')[1];
    Write-Host "Last git hash $LastCommitHash";

    $AffectedAppsObj = npm run affected:apps  -- --base=$LastCommitHash --head=origin/master --prod --parallel;
}

$AffectedAppsString = $AffectedAppsObj[4];

$AffectedApps = $AffectedAppsString.Split(" ");

Write-Host "Affected apps: " $AffectedApps;
$IsQuestionServiceAffected = $AffectedApps.Contains("questions-service");

if ($IsQuestionServiceAffected -eq "True") {
    Write-Host "Questions app is affected";

    $QuestionServiceBuildId = 74;

    TriggerBuild -number $QuestionServiceBuildId;
}
