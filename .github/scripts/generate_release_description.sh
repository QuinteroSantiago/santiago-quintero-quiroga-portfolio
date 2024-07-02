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
CONTENT="Commit Log:`\n`
$COMMIT_LOG"

# Output the description for potential use

# # Assuming GIT_DIFF contains the desired data to send
# API_KEY=$OPENAI_API_KEY  # Ensure this environment variable is exported

# # API payload
# PAYLOAD=$(cat <<EOF
# {
#   "model": "gpt-3.5-turbo",
#   "messages": [
#     {
#       "role": "system",
#       "content": "Please summarize these changes for release notes:"
#     },
#     {
#       "role": "user",
#       "content": "${CONTENT}"
#     }
#   ]
# }
# EOF
# )

# echo "Payload: ${PAYLOAD};"

# Make the API call
# RESPONSE=$(curl -s -X POST https://api.openai.com/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer ${API_KEY}" \
#   -d "${PAYLOAD}")

# echo "GPT Response: ${RESPONSE}"


# Check if the response contains an error
# if echo ${RESPONSE} | grep -q "error"; then
#   echo "Failed to generate description: ${RESPONSE}"
#   exit 1
# fi

# DESCRIPTION=$(echo ${COMMIT_LOG} | jq -r '.choices[0].message.content')
# echo "Extracted Description: ${COMMIT_LOG}"

# Output the description for potential use
{
  echo 'description<<EOF'
  $COMMIT_LOG
  echo EOF
} >> "${GITHUB_ENV}"
