Binder build troubleshooting and MySQL setup
===========================================

This project uses `xeus-sql` and a local MariaDB server for executable SQL blocks when running on Binder.

Problem: "failed to create fsnotify watcher: too many open files" during a repo2docker/Binder build
- This usually indicates the system reached the inotify watcher limit or the process open-files limit.

Quick checks (run on the machine doing the build):

```bash
cat /proc/sys/fs/inotify/max_user_watches
cat /proc/sys/fs/inotify/max_user_instances
ulimit -n
```

Temporary fixes (until next reboot) — requires `sudo`:

```bash
sudo sysctl -w fs.inotify.max_user_watches=524288
sudo sysctl -w fs.inotify.max_user_instances=1024
ulimit -n 65536
```

Make persistent (system-wide):

```bash
echo "fs.inotify.max_user_watches=524288" | sudo tee /etc/sysctl.d/99-inotify.conf
echo "fs.inotify.max_user_instances=1024" | sudo tee -a /etc/sysctl.d/99-inotify.conf
sudo sysctl --system
# and update /etc/security/limits.conf for the user that runs repo2docker (requires logout/login)
```

Notes about Binder and hosted services:
- If you are building locally with `repo2docker`, you can change these settings on your machine.
- If you are using a remote Binder service (mybinder.org) you cannot change host limits — try rebuilding later or use a different host.

Start the local MySQL server inside Binder session (after image build completes):

```bash
# from a terminal in Binder or a notebook cell
bash start_mysql.sh
```

Start-from-notebook (run before SQL cells):

```python
%%bash
bash start_mysql.sh
```

If you want an automated check of your current limits, run the `tools/check_limits.sh` script included in this repo.

Example notebook:

- See `notebooks/mysql_example.ipynb` for a ready-to-run example. Open it in Binder, run the first cell to start MariaDB, then switch the kernel to the `xeus-sql` SQL kernel and run the SQL cell.
