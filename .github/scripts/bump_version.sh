#!/bin/bash

# Check if VERSION.txt exists, initialize if not
if [ ! -s VERSION.txt ]; then
  echo "1.0.0" > VERSION.txt
  echo "VERSION.txt was missing, initialized to 1.0.0"
fi

VERSION=$(cat VERSION.txt)
echo "Current version: $VERSION"

COMMIT_MESSAGE=$(git log -1 --pretty=%B)
if [[ "$COMMIT_MESSAGE" == *"[major]"* ]]; then
  NEW_VERSION=$(echo $VERSION | awk -F. '{$1+=1; $2=0; $3=0; print $1"."$2"."$3}')
elif [[ "$COMMIT_MESSAGE" == *"[minor]"* ]]; then
  NEW_VERSION=$(echo $VERSION | awk -F. '{$2+=1; $3=0; print $1"."$2"."$3}')
else
  NEW_VERSION=$(echo $VERSION | awk -F. '{$3+=1; print $1"."$2"."$3}')
fi

echo "::set-output name=new_version::${NEW_VERSION}"
echo ${NEW_VERSION} > VERSION.txt
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git add VERSION.txt
git commit -m "Bump version to ${NEW_VERSION}"
git tag ${NEW_VERSION}