#!/bin/bash
docker exec -it startertestdb bash -c 'mariadb -u "$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASSWORD" -D "$MYSQL_DATABASE" < /container-scripts/reset-test-db.sql'