#!/bin/bash
set -euo pipefail

echo "Current values:"
echo -n "fs.inotify.max_user_watches = "
cat /proc/sys/fs/inotify/max_user_watches 2>/dev/null || echo "(unavailable)"
echo -n "fs.inotify.max_user_instances = "
cat /proc/sys/fs/inotify/max_user_instances 2>/dev/null || echo "(unavailable)"
echo -n "ulimit -n = "
ulimit -n 2>/dev/null || echo "(unavailable)"

echo
echo "Recommended temporary commands (requires sudo):"
echo "  sudo sysctl -w fs.inotify.max_user_watches=524288"
echo "  sudo sysctl -w fs.inotify.max_user_instances=1024"
echo "  ulimit -n 65536  # for current shell"

if [ "$(id -u)" -eq 0 ]; then
  echo
  echo "You are root — applying temporary settings now..."
  sysctl -w fs.inotify.max_user_watches=524288 || true
  sysctl -w fs.inotify.max_user_instances=1024 || true
  echo "Applied. New values:"
  echo -n "fs.inotify.max_user_watches = "
  cat /proc/sys/fs/inotify/max_user_watches || true
  echo -n "fs.inotify.max_user_instances = "
  cat /proc/sys/fs/inotify/max_user_instances || true
fi

echo
echo "To make persistent, add the following to /etc/sysctl.d/99-inotify.conf:"
echo "fs.inotify.max_user_watches=524288"
echo "fs.inotify.max_user_instances=1024"
echo
echo "To increase per-user open-files limits, add lines like the following to /etc/security/limits.conf (replace YOUR_USER):"
echo "YOUR_USER soft nofile 65536"
echo "YOUR_USER hard nofile 65536"

echo
echo "Run this script as a non-root user to see current values and suggested commands. Run as root (sudo) to apply temporary sysctl changes."
