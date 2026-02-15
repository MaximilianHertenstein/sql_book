#!/bin/bash
set -euo pipefail

# Simplified start script: only ensure /etc/mysql/my.cnf contains the /tmp socket
CFG=/etc/mysql/my.cnf
echo "Ensuring MySQL socket config in $CFG"
if [ ! -f "$CFG" ]; then
  touch "$CFG"
fi

if ! grep -q "socket=/tmp/mysql.sock" "$CFG" 2>/dev/null; then
  cat >> "$CFG" <<'EOF'

[server]
socket=/tmp/mysql.sock

[client]
socket=/tmp/mysql.sock
EOF
  echo "Appended socket config to $CFG"
else
  echo "Socket config already present in $CFG"
fi

cat <<'INFO'
Note: this script no longer starts mysqld. Start the server in the session with your preferred command, for example:
  mysqld --datadir=/tmp/mysql-data --socket=/tmp/mysql.sock &
or
  mysqld_safe --datadir=/tmp/mysql-data --socket=/tmp/mysql.sock &
If you prefer, create a separate server-start script that initialises /tmp/mysql-data and starts mysqld.
INFO
