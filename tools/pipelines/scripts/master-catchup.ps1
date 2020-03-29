Get-ChildItem Env:

git config --global user.email "automation@todoapp.com"
git config --global user.name "TodoApp Automation"

$branch = $env:BUILD_SOURCEBRANCH.replace("refs/heads/", "");
git checkout $branch;

####### Add git remote
# TODO: update integration to merge target into source branch
# get access token
$username = $env:GITHUB_KEY;
$password = $env:GITHUB_SECRET;

$encoded = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($username + ":" + $password ))
$headers = @{Authorization = "Basic $encoded" };

$request = @{
    "grant_type" = "client_credentials"
}

$uri = "https://github.com/site/oauth2/access_token";

Try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $response = (Invoke-WebRequest $uri -Method Post -Body $request -Headers $headers  -UseBasicParsing).Content | ConvertFrom-Json;

}
Catch {

    Write-Error $_ -ErrorAction Continue
    return 0
}

$accessToken = $response.access_token;

# add git remote
$repoUrl = "https://github.com/lydemann/Todo-monorepo.git";

git remote rm remote
git remote add remote $repoUrl;

######### pull and push
Write-Host "Fetch with tags";
git fetch remote --tags

Write-Host "Pulling";
$pullRes = git pull remote master;
Write-Host "Pull res: $pullRes";

if ($pullRes -ne "Already up to date.") {

    Write-Host "Pushing";
    git push remote $branch;

    # stop the build to avoid 2 builds
    Write-Host "Stopping build";

    $headers = @{Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN" };

    $body = @{status = "cancelling" } | ConvertTo-Json;

    $stopBuildUri = "$($env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)$env:SYSTEM_TEAMPROJECTID/_apis/build/builds/$($env:BUILD_BUILDID)?api-version=5.0"

    # Delete build using Azure Devops API
    $response = (Invoke-WebRequest $stopBuildUri -Method Patch -ContentType "application/json" -Headers $headers -Body $body -UseBasicParsing).Content | ConvertFrom-Json;
    return;
}

Write-Host "$pullRes";
