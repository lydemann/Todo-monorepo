const octokit = require('@octokit/rest');

async function lastMergedPRCommitSha(octokit) {
	const result = await octokit
		.graphql({
			query: `
      query { 
        repository(owner: "lydemann", name: "Todo-monorepo") {
          pullRequests(states: MERGED, last: 1) {
            nodes {
              url,
              commits(last:1) {
                edges {
                  node {
                    commit {
                      oid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
		})
		.catch(error => {
			console.error(JSON.stringify(error));
		});

	const commitSha =
		result.repository.pullRequests.nodes[0].commits.edges[0].node.commit.oid;

	return commitSha;
}

async function run() {
	const token = process.argv[2];
	if (!token) {
		console.log(`'env.GITHUB_TOKEN' not found - exiting...`);
		return;
	}

	const octo = new octokit.Octokit({
		auth: `token ${token}`,
	});

	const commitSha = await lastMergedPRCommitSha(octo);

	console.log(`Found commitSha: ${commitSha}`);

	console.log(`##vso[task.setvariable variable=LAST_PR_SHA]${commitSha}`);
}

run();
