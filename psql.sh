#! /bin/sh

CONTAINER_ID=$(docker ps | grep fullstack-sql | awk '{print $1}')
docker exec -it $CONTAINER_ID psql -U postgres postgres