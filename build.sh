#!/bin/bash
echo "Starting build process..."
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

echo "Building frontend..."
if [ -d "frontend" ]; then
    cd frontend
    echo "Installing dependencies in frontend..."
    yarn install
    echo "Building frontend application..."
    yarn build
    echo "Build completed successfully!"
    echo "Build output created at: $(pwd)/build"
    ls -la build/
    echo "Contents verified!"
else
    echo "ERROR: frontend directory not found"
    echo "Available directories:"
    find . -type d -name "*" | head -10
    exit 1
fi