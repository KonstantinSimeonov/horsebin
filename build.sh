#!/bin/bash

BUILD_DIR="../npaste-build"

if ! -d "$BUILD_DIR"; then
mkdir "$BUILD_DIR"
mkdir "$BUILD_DIR/server"
fi

echo "Applying changes ..."
rsync -aP ./src/* "$BUILD_DIR/server" --exclude=public/ --delete
rsync -aP ./Procfile ./package.json ./bower.json ./.bowerrc ./.gitignore "$BUILD_DIR"

echo "Running gulp ..."
gulp

# cd "$BUILD_DIR"
# npm install --production
# bower install

echo "Done."