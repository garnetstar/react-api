#!/usr/bin/env bash
# Bash3 Boilerplate. Copyright (c) 2014, kvz.io
# https://kvz.io/blog/2013/11/21/bash-best-practices/

set -o errexit
set -o pipefail
set -o nounset

BACKUP_NAME="database_`date +%Y-%m-%d_%H:%M:%S`.sql.gz"
APP_DIR="/app/react-api"

docker exec slim-db bash -c "mysqldump -u root -pidaho pg | gzip > /backup/${BACKUP_NAME}"

scp -P 65500 ${APP_DIR}/backup/${BACKUP_NAME} nas:/volume1/data/garnetstar

rm ${APP_DIR}/backup/${BACKUP_NAME}
