function TriggerBuild {
	param (
			[int]$Number
	)

	$Branch = $env:BUILD_SOURCEBRANCH;

	Write-Host "Branch is $Branch";

	$body = @{
			"definition" = @{
					"id" = $Number
			};
			"sourceBranch"= "$Branch";
	};

	$bodyJson = $body | ConvertTo-Json;

	Write-Host "Body is $bodyJson";

	$headers = @{Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN"};
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
$AffectedAppsString = Get-Content -Path "$($env:SYSTEM_DEFAULTWORKINGDIRECTORY)/dist/affected-apps.txt";
Write-Host "Affected apps string: $AffectedAppsString";

if ($AffectedAppsString -eq "") {
	Write-Host "No affected apps..."
	return;
}

$AffectedApps = $AffectedAppsString.Split(" ");

Write-Host "Affected apps: " $AffectedApps;
$IsQuestionServiceAffected = $AffectedApps.Contains("questions-service");

if ($IsQuestionServiceAffected -eq "True") {
	Write-Host "Questions app is affected";

	$QuestionServiceBuildId = 74;

	TriggerBuild -number $QuestionServiceBuildId;
}
