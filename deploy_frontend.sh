#!/usr/bin/env bash
# Bash3 Boilerplate. Copyright (c) 2014, kvz.io
# https://kvz.io/blog/2013/11/21/bash-best-practices/

set -o errexit
set -o pipefail
set -o nounset
set -o xtrace

IMAGE_NAME=$1

docker pull $IMAGE_NAME

sed -i '/FRONTEND_IMAGE/d' '.env'

echo "FRONTEND_IMAGE=$IMAGE_NAME" >> '.env'

docker-compose restart

