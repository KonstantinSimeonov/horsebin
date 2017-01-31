#!/bin/bash

BUILD_DIR="../horsebin-build"

if [ ! -d "$BUILD_DIR" ]; then
    echo "Creating directory ..."
    mkdir "$BUILD_DIR"
fi

echo "Resolving client dependencies ..."
bower install

echo "Copying files ..."
rsync -aP ./src/* "$BUILD_DIR" --exclude=public/js --exclude=public/css --delete
rsync -aP ./Procfile ./package.json ./package.release.json "$BUILD_DIR"

echo "Building client files ..."
gulp

cd "$BUILD_DIR"
echo "Resolving npm dependencies ..."
npm install --production
echo "Merging release package.json ..."
rsync -aP ./package.release.json ./package.json --delete

echo "Done."