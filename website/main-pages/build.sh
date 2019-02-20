#!/bin/sh
#nightly build script
echo ".....Building main pages....."
if [ $OSTYPE == "msys" ];
    then
	mkdir -p $1
        mkdocs build && cp -r site/* $1/
    else
	mkdir -p $1
        mkdocs build; rsync -ir site/ $1/;
fi
echo "....Completed building main pages...."
