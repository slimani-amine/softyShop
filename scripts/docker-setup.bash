#!/bin/bash
current_directory=$(pwd)

dockercommand=""

if command -v docker-compose &> /dev/null; then
    dockercommand="docker compose -f $current_directory/docker/dev/docker-compose.yml up"
else
    dockercommand="docker compose -f $current_directory/docker/dev/docker-compose.yml up"
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

# Wait for test database to respond
while ! docker exec -it startertestdb bash -c 'mariadb -h "$MYSQL_DATABASE_HOST"  -u "$MYSQL_ROOT_USER" --password="$MYSQL_ROOT_PASSWORD" --execute="SELECT \"TEST DATABASE UP\";"'; do
    echo "Test database is unavailable - sleeping"
    sleep 2
done

# Init a reset function in test database
docker exec -it startertestdb bash -c 'mariadb -u "$MYSQL_ROOT_USER" --password="$MYSQL_ROOT_PASSWORD" -D "$MYSQL_DATABASE" < /container-scripts/init-test-db-proced.sql'

# Push database changes to test database
docker exec -it starterdevapi sh -c "npx typeorm-ts-node-commonjs migration:run --dataSource ./testormconnection.js"

# Wait for dev database to respond
# Add ` > /dev/null ` BEFORE THE CLOSING OF THE SIGNLE QUOTE IF YOU DON'T WANT ANY OUTPUT
while ! docker exec -it starterdevdb bash -c 'mariadb -h "$MYSQL_DATABASE_HOST"  -u "$MYSQL_ROOT_USER" --password="$MYSQL_ROOT_PASSWORD" --execute="SELECT \"DEV DATABASE UP\";"'; do
    echo "Dev database is unavailable - sleeping"
    sleep 2
done

# Push database changes to dev database
docker exec -it starterdevapi sh -c 'npx typeorm-ts-node-commonjs migration:run --dataSource ./ormconnection.js'