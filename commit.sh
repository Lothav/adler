#!/bin/bash

gulp &&
git commit -am "$1" && git push origin master &&
mv adler.js ../LuizOtav.io/adler &&
cp -r assets ../LuizOtav.io/adler &&
cd ../LuizOtav.io &&
git add * && git pull origin master &&
git commit -am "changes in @Luiz0tavio/adler -> $1" && git push origin master &&
cd ../adler