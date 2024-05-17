#!/bin/bash

# Fetch tags and history if the repository is shallow
if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
  git fetch --prune --unshallow --tags
else
  git fetch --prune --tags
fi

# Retrieve the second to last tag
LAST_TAG=$(git describe --tags --abbrev=0 `git rev-list --tags --skip=1 --max-count=1`)

# Use the first commit if no tags are found
if [ -z "$LAST_TAG" ]; then
  LAST_TAG=$(git rev-list --max-parents=0 HEAD)
  echo "No tags found, using the first commit: $LAST_TAG"
else
  echo "Found tag: $LAST_TAG"
fi

echo "Generating release notes from $LAST_TAG to HEAD"
RELEASE_NOTES=$(git log $LAST_TAG..HEAD --pretty=format:"%h - %s (%an)" --reverse)
echo "::set-output name=notes::$RELEASE_NOTES"
