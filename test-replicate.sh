#!/bin/bash

# API token from .env.local
# Load from environment variable instead of hardcoding
REPLICATE_API_TOKEN="${REPLICATE_API_TOKEN}"

# Create a prediction
echo "Creating prediction..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: Token $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "black-forest-labs/flux-1.1-pro",
    "input": {
      "prompt": "A beautiful minimalist photo frame on a white wall, high quality, detailed",
      "prompt_upsampling": true
    }
  }' \
  https://api.replicate.com/v1/predictions)

echo "API Response:"
echo "$RESPONSE"

# Extract prediction ID
PREDICTION_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*' | sed 's/"id":"//')

if [ -z "$PREDICTION_ID" ]; then
  echo "Failed to get prediction ID"
  exit 1
fi

echo "Prediction ID: $PREDICTION_ID"

# Poll for results
echo "Polling for results (will check 5 times)..."
for i in {1..5}; do
  echo "Check $i..."
  sleep 5
  STATUS_RESPONSE=$(curl -s -X GET \
    -H "Authorization: Token $REPLICATE_API_TOKEN" \
    -H "Content-Type: application/json" \
    https://api.replicate.com/v1/predictions/$PREDICTION_ID)
  
  echo "Status response:"
  echo "$STATUS_RESPONSE"
  
  STATUS=$(echo $STATUS_RESPONSE | grep -o '"status":"[^"]*' | sed 's/"status":"//')
  
  if [ "$STATUS" == "succeeded" ]; then
    echo "Image generation succeeded!"
    
    # Extract the output URL
    OUTPUT=$(echo $STATUS_RESPONSE | grep -o '"output":\[[^]]*' | sed 's/"output":\[//')
    if [ -z "$OUTPUT" ]; then
      OUTPUT=$(echo $STATUS_RESPONSE | grep -o '"output":"[^"]*' | sed 's/"output":"//')
    fi
    
    echo "Image URL: $OUTPUT"
    break
  elif [ "$STATUS" == "failed" ]; then
    echo "Image generation failed"
    break
  else
    echo "Status: $STATUS, waiting for completion..."
  fi
done
