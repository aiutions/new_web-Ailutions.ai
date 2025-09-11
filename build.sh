#!/bin/bash
echo "Starting build process..."
echo "Current directory: $(pwd)"

echo "Building frontend..."
if [ -d "frontend" ]; then
    cd frontend
    echo "Installing dependencies in frontend..."
    yarn install
    echo "Building frontend application..."
    yarn build
    echo "Build completed successfully!"
    
    # Move build output to root level for Vercel
    echo "Moving build output to root level..."
    cd ..
    rm -rf build 2>/dev/null || true
    cp -r frontend/build ./build
    echo "Build output moved to: $(pwd)/build"
    ls -la build/
    echo "Deployment ready!"
else
    echo "ERROR: frontend directory not found"
    echo "Available directories:"
    find . -type d -name "*" | head -10
    exit 1
fi