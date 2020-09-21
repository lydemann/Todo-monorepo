# Merge queue

Merge queue is for a more scalable way of merging PRs. When the PR is ready to be merged, you apply the merge queue label in the Github PR (merge:ready) and it will get a place in the merge queue.
Once it is the PR's turn, it will get the automerge label and be merged to master while the merge bot will make sure the branch is catched up with master and all build checks have passed.
