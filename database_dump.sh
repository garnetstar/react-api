#!/usr/bin/env bash
# Bash3 Boilerplate. Copyright (c) 2014, kvz.io
# https://kvz.io/blog/2013/11/21/bash-best-practices/

set -o errexit
set -o pipefail
set -o nounset

docker exec -it slim-db bash -c "mysqldump -u root -pidaho slim > /backup/db_backup.sql"
