#!/bin/bash
set -euo pipefail

echo "Starting MySQL server for this session..."
# If already running, exit
if pgrep -x mysqld >/dev/null 2>&1; then
  echo "mysqld already running"
  exit 0
fi

# Prefer conda-provided mysqld (if available) and use a writable datadir under /tmp
DATADIR=/tmp/mysql-data
SOCKET=/tmp/mysql.sock
LOG=/tmp/mysqld.log
mkdir -p "$DATADIR"
chmod 0777 "$DATADIR"

if command -v mysqld >/dev/null 2>&1; then
  echo "Using mysqld from PATH: $(command -v mysqld)"
  # initialize if needed
  if [ ! -f "$DATADIR/ibdata1" ]; then
    echo "Initializing datadir $DATADIR"
    mysqld --initialize-insecure --datadir="$DATADIR" >/dev/null 2>&1 || true
  fi

  # start mysqld pointing at our datadir, socket and bind to localhost:3306 (TCP + socket)
  nohup mysqld --datadir="$DATADIR" --socket="$SOCKET" --bind-address=127.0.0.1 --port=3306 --pid-file=/tmp/mysqld.pid >"$LOG" 2>&1 &
else
  echo "mysqld not found in PATH — trying mysqld_safe (system)"
  nohup mysqld_safe --socket="$SOCKET" --datadir="$DATADIR" --bind-address=127.0.0.1 --port=3306 >"$LOG" 2>&1 &
fi

echo "Waiting for MySQL socket to become available... (log: $LOG)"
for i in {1..60}; do
  if mysqladmin ping --socket="$SOCKET" --silent >/dev/null 2>&1; then
    echo "MySQL started"
    exit 0
  fi
  sleep 1
done

echo "Failed to start MySQL within timeout; see $LOG" >&2
tail -n +1 "$LOG" || true
exit 1
