#!/bin/bash

# Check if there are tags; if not, use the first commit as the starting point
if git describe --tags --abbrev=0 > /dev/null 2>&1; then
  LAST_TAG=$(git describe --tags --abbrev=0)
else
  LAST_TAG=$(git rev-list --max-parents=0 HEAD)
fi

# Generate a diff from the last tag to HEAD
GIT_DIFF=$(git diff $LAST_TAG HEAD)

# Generate a commit log
COMMIT_LOG=$(git log $LAST_TAG..HEAD --oneline)

# Combine the diff and commit messages
CONTENT="Commit Log:\n$COMMIT_LOG\n\nChanges:\n$GIT_DIFF"

# Prepare the JSON body for the API request
read -r -d '' PAYLOAD <<EOM
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "Generate a concise and informative description of the following software changes for a release note."
    },
    {
      "role": "user",
      "content": "$CONTENT"
    }
  ],
  "temperature": 0.2
}
EOM

# Make the API call to OpenAI
RESPONSE=$(curl -s https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d "$PAYLOAD")

# Extract the response message from the JSON (assuming jq is installed)
DESCRIPTION=$(echo $RESPONSE | jq -r '.choices[0].message.content')

# Output the description for potential use
echo "$DESCRIPTION"



#!/bin/bash

# Assuming GIT_DIFF contains the desired data to send
GIT_DIFF="Summary of changes"
API_KEY=$OPENAI_API_KEY  # Ensure this environment variable is exported

# API payload
PAYLOAD=$(cat <<EOF
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "system",
      "content": "Please summarize these changes for release notes:"
    },
    {
      "role": "user",
      "content": "$GIT_DIFF"
    }
  ]
}
EOF
)

# Make the API call
RESPONSE=$(curl -s -X POST https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "$PAYLOAD")

# Check if the response contains an error
if echo $RESPONSE | grep -q "error"; then
  echo "Failed to generate description: $RESPONSE"
  exit 1
fi

DESCRIPTION=$(echo $RESPONSE | jq -r '.choices[0].message.content')
echo "$DESCRIPTION"
