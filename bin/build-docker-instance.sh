#!/usr/bin/env bash

set -e

GERMANIUM_FOLDER=$(readlink -f $(dirname $0)/..)
TAG_VERSION=$($GERMANIUM_FOLDER/bin/version/python-version.sh --tag)

cd $GERMANIUM_FOLDER

docker build -t germanium/germanium-$TAG_VERSION .

