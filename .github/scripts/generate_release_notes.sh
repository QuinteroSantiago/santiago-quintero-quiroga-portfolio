#!/bin/bash

# Fetch tags and ensure the repository is not shallow
if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
  git fetch --prune --unshallow --tags
else
  git fetch --prune --tags
fi

# Retrieve all tags sorted by date
TAGS=$(git tag --sort=-creatordate)

# Get the number of tags
TAG_COUNT=$(echo "$TAGS" | wc -l)

# Determine the second to last tag, or handle when fewer than two tags exist
if [ "$TAG_COUNT" -ge 2 ]; then
  LAST_TAG=$(echo "$TAGS" | sed -n '2p')
elif [ "$TAG_COUNT" -eq 1 ]; then
  LAST_TAG=$(echo "$TAGS" | sed -n '1p')
  echo "Only one tag found, using it: $LAST_TAG"
else
  LAST_TAG=$(git rev-list --max-parents=0 HEAD)
  echo "No tags found, using the first commit: $LAST_TAG"
fi

echo "Generating release notes from ${LAST_TAG} to HEAD"
# Retrieve the commit log from LAST_TAG to HEAD
RELEASE_NOTES=$(git log $LAST_TAG..HEAD --pretty=format:"%h - %s (%an)" --reverse)
echo "notes=${RELEASE_NOTES}" >> $GITHUB_ENV
