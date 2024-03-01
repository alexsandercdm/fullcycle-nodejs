#!/bin/bash
# docker-entrypoint.sh

set -e

echo instalando dependencias e aguardando processos. 
npm install 
dockerize -wait tcp://db:3306 -timeout 20s

exec "$@"