#!/usr/bin/env bash
# Bash3 Boilerplate. Copyright (c) 2014, kvz.io
# https://kvz.io/blog/2013/11/21/bash-best-practices/

set -o errexit
set -o pipefail
set -o nounset

<<<<<<< Updated upstream
docker-compose run --rm --entrypoint="bash -c" node "npm install"
=======
git clone git@bitbucket.org:garnetstar/pg-api.git src/api

make -C ./src/api/ composer-install

mkdir ./src/api/src/temp

docker-compose run --rm --entrypoint="bash -c" node "npm install"

 docker-compose exec db mysql -u root -pidaho -e "CREATE DATABASE IF NOT EXISTS pg CHARACTER SET utf8 COLLATE utf8_unicode_ci"
>>>>>>> Stashed changes
