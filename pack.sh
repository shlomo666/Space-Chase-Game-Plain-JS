#!/bin/sh

node_modules/.bin/webpack
mkdir -p production/resources
rm -Rf production/resources
mkdir production/resources

cp index.html production/resources/
cp "new game.html" production/resources/
cp settings.html production/resources/
cp credits.html production/resources/
cp favicon.ico production/resources/
cp -r Sounds production/resources/
cp -r Images production/resources/
mkdir -p production/resources/js
cp -r js/bundle production/resources/js/