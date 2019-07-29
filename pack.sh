#!/bin/sh
node_modules/.bin/webpack

res=production/resources/files;
code=production/code/files;

rm -Rf $res
rm -Rf $code
mkdir $res
mkdir $code

cp favicon.ico $res
cp -r Sounds $res
cp -r Images $res
cp index.html $code
cp "new game.html" $code
cp settings.html $code
cp credits.html $code
mkdir "$code/js"
cp -r js/bundle "$code/js/"