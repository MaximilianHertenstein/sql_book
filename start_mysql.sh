#!/bin/bash
set -e

echo "Starting MySQL server for this session..."
# If already running, exit
if pgrep -x mysqld >/dev/null 2>&1; then
  echo "mysqld already running"
  exit 0
fi

# Start mysqld_safe in background using /tmp socket
nohup mysqld_safe --socket=/tmp/mysql.sock > /tmp/mysqld.log 2>&1 &

echo "Waiting for MySQL socket to become available..."
for i in {1..30}; do
  if mysqladmin ping --socket=/tmp/mysql.sock --silent >/dev/null 2>&1; then
    echo "MySQL started"
    exit 0
  fi
  sleep 1
done

echo "Failed to start MySQL within timeout; see /tmp/mysqld.log" >&2
exit 1
