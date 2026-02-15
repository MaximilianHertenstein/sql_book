#!/bin/bash
set -euo pipefail

DATADIR=/tmp/mysql-data
SOCKET=/tmp/mysql.sock
LOG=/tmp/mysqld.log

echo "Preparing datadir $DATADIR"
mkdir -p "$DATADIR"
chmod 0777 "$DATADIR"

if ! command -v mysqld >/dev/null 2>&1; then
  echo "No mysqld found in PATH. Ensure MySQL/MariaDB is installed in the environment." >&2
  exit 1
fi

echo "Initializing datadir if needed"
if [ ! -f "$DATADIR/ibdata1" ]; then
  mysqld --initialize-insecure --datadir="$DATADIR" >/dev/null 2>&1 || true
fi

echo "Starting mysqld (datadir=$DATADIR, socket=$SOCKET)"
nohup mysqld --datadir="$DATADIR" --socket="$SOCKET" --bind-address=127.0.0.1 --port=3306 >"$LOG" 2>&1 &

echo "Waiting for server to become available (log: $LOG)"
for i in {1..60}; do
  if mysqladmin ping --socket="$SOCKET" --silent >/dev/null 2>&1; then
    echo "MySQL socket available"
    break
  fi
  if mysqladmin ping -h 127.0.0.1 -P 3306 --silent >/dev/null 2>&1; then
    echo "MySQL TCP available"
    break
  fi
  sleep 1
done

if ! mysqladmin ping --socket="$SOCKET" --silent >/dev/null 2>&1 && ! mysqladmin ping -h 127.0.0.1 -P 3306 --silent >/dev/null 2>&1; then
  echo "MySQL did not start within timeout; see $LOG" >&2
  tail -n 200 "$LOG" || true
  exit 1
fi

echo "Writing client config to $HOME/.my.cnf (user_simple/password123)"
cat > "$HOME/.my.cnf" <<'EOF'
[client]
socket=/tmp/mysql.sock
user=user_simple
password=password123
EOF

chmod 600 "$HOME/.my.cnf" || true

echo "MySQL started and client config written. Test with: mysql -e 'SHOW DATABASES;'"
