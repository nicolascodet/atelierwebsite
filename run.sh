#!/bin/bash

# Display ASCII art for Atelier Frames
echo "
   _   _       _ _           ___                         
  /_\ | |_ ___| (_)___ _ _  | __|_ _ __ _ _ __  ___ ___ 
 / _ \|  _/ -_) | / -_) '_| | _/ _\` / _\` | '  \/ -_|_-< 
/_/ \_\\__\___|_|_\___|_|   |_|\__,_\__,_|_|_|_\___/__/ 
                                                        
"

echo "🖼️  Starting Atelier Frames website..."

# Check if .env.local exists, if not create it with placeholder for Replicate API token
if [ ! -f .env.local ]; then
  echo "Creating .env.local file..."
  echo "REPLICATE_API_TOKEN=your_replicate_api_token_here" > .env.local
  echo "⚠️  Please update your REPLICATE_API_TOKEN in .env.local for AI art generation to work"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start the development server
echo "🚀 Launching development server..."
npm run dev
