#!/bin/bash

current_directory=$(pwd)

dockercommand=""

if command -v docker-compose &> /dev/null; then
    dockercommand="docker compose -f $current_directory/docker/prod/docker-compose.yml up"
else
    dockercommand="docker compose -f $current_directory/docker/prod/docker-compose.yml up"
fi

while [ $# -gt 0 ]; do
    case "$1" in
    "-b")
            echo "build"
            dockercommand+=" --build"
            ;;
    *)
        echo "Error: '$1' is not a valid argument."
        exit 1
        ;;
    esac
    shift  # Remove the processed argument
done

dockercommand+=" -d"

$dockercommand

# Wait for prod database to respond
while ! docker exec -it starterproddb bash -c 'mariadb -h "$MYSQL_DATABASE_HOST"  -u "$MYSQL_ROOT_USER" --password="$MYSQL_ROOT_PASSWORD" --execute="SELECT \"DEV DATABASE UP\";"'; do
    echo "prod database is unavailable - sleeping"
    sleep 2
done

# Push database changes to prod
docker exec -it starterprodapi sh -c 'npx typeorm-ts-node-commonjs migration:run --dataSource ./ormconnection.js'