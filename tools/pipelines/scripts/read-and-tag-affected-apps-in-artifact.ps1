
function addTagToGithubCommit {
	param (
			[String]$tag
	)

	Write-Host "Tagging the release in Git";
	$releaseNumber = $env:BUILD_BUILDNUMBER;
	$sourceVersion = $env:BUILD_SOURCEVERSION;
	$repositoryUri = $env:BUILD_REPOSITORY_URI;
	$repoSlug = $repositoryUri.Split('/')[-1].Replace(".git", "");

	Write-Host "Tagging hash $sourceVersion with tag $tag"

	$request = @{ };
	$request.name = $tag;
	$request.target = @{ };
	$request.target.hash = $sourceVersion;

	$body = $request | ConvertTo-Json;
	# TODO: create integration for creating tag in your version control provider
	$tagsUri = "https://github.org/!api/2.0/repositories/todo-app/$repoSlug/refs/tags";

	Write-Host "Sending request to Github"
	Write-Host $tagsUri
	Write-Host $body
	Write-Host

	$GithubToken = $env:GITHUB_TOKEN;
	$GithubHeader = @{ "Authorization" = "Basic $GithubToken" }

	Try {
			$result = (Invoke-WebRequest $tagsUri -Method "Post" -Headers $GithubHeader -ContentType "application/json" -Body $body -UseBasicParsing).Content | ConvertFrom-Json
	}
	Catch {
			$errorDetail = $_
			$errorMessage = @"
Failed to tag git commit.
$error
$errorDetail
"@

			Write-Error $errorMessage -ErrorAction Continue
			return 0
	}

	If ($result.name -eq $releaseNumber) {
			Write-Host "Release tagged in git.";
	}
}

# Create Build tag
#Tag the build with app name in order to trigger deployment
#Same tag should be in release definition triggers
function addTagToBuildArtifact {
	param (
			[String]$tag
	)

		 Write-Host "Creating artifact tag: $tag";
	$url =
	"$($env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)$env:SYSTEM_TEAMPROJECTID/_apis/build/builds/$($env:BUILD_BUILDID)/tags/$($tag)?api-version=2.0";
	$headers = @{Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN"};

	Write-Host "Sending request to Azure DevOps";
	Write-Host $url;

	Try {
			$tag = Invoke-RestMethod -Uri $url -Headers $headers -Method PUT;
			Write-Host "Tag= $($tag| ConvertTo-Json -Depth 3)";
	}
	Catch {
			$error = $_.Exception.Message;
			$errorMessage = "Failed to tag build.$error $errorDetail";
					Write-Error $errorMessage -ErrorAction Continue
					return 0;
			}
}


############ main flow
Write-Host "Reading and setting affected apps variable";

Write-Host "Working dir is $($env:SYSTEM_DEFAULTWORKINGDIRECTORY)";

# TODO: delete this and just get from previous master commit
$AffectedAppsString = Get-Content -Path "$($env:SYSTEM_DEFAULTWORKINGDIRECTORY)/dist/affected-apps.txt";

Write-Host "Affected apps to tag $AffectedAppsString";
Write-Host "##vso[task.setvariable variable=AffectedApps;]$AffectedAppsString"

if(!$AffectedAppsString) {
	Write-Host "No affected apps";
	return;
}

$AffectedApps = $AffectedAppsString.Split(" ");

$AffectedApps | ForEach-Object {
	$AffectedAppName = $_;

	addTagToBuildArtifact -tag $AffectedAppName;

	$ReleaseId = $env:BUILD_BUILDID;
	$GitTag = "$AffectedAppName-$ReleaseId";
	addTagToGithubCommit -tag $GitTag;
}
