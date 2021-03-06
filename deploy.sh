#!/usr/bin/env bash
# Bash3 Boilerplate. Copyright (c) 2014, kvz.io
# https://kvz.io/blog/2013/11/21/bash-best-practices/

set -o errexit
set -o pipefail
set -o nounset

BRANCH=$1

ssh idaho "cd /app/react-api/ && git fetch origin && git checkout --force --detach origin/${BRANCH}"

cd ./frontend/
npm run build

cd ../react/build/
scp index_bundle.js idaho:/app/react-api/react/build/
scp index.html idaho:/app/react-api/react/build/

ssh idaho "cd /app/react-api/ && docker-compose down && docker-compose up -d"

echo -e "\e[92mSuccessfully deployed"
echo ' '
