#!/usr/bin/env bash
# Bash3 Boilerplate. Copyright (c) 2014, kvz.io
# https://kvz.io/blog/2013/11/21/bash-best-practices/

set -o errexit
set -o pipefail
set -o nounset

current_date_time="`date +%Y-%m-%d_%H:%M:%S`"

docker exec slim-db bash -c "mysqldump -u root -pidaho slim | gzip > /backup/database_${current_date_time}.sql.gz"

