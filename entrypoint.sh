#!/bin/bash
# docker-entrypoint.sh

echo instalando dependencias e aguardando processos. 
set -e
npm install 
dockerize -wait tcp://db:3306 -timeout 20s



exec "$@"