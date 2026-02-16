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

Prefer a prebuilt image on public Binder
--------------------------------------

The public mybinder.org build hosts have strict inotify/open-file limits that you cannot change. The most reliable way to avoid the "too many open files" error on mybinder.org is to have Binder pull a prebuilt image instead of performing a fresh repo2docker build on the public builders.

Options:
- Use the image we publish to GitHub Container Registry: `ghcr.io/maximilianhertenstein/sql_book:latest`. This avoids building on mybinder.org and the service will just pull and run the image.
- Note: mybinder.org's public service does not accept arbitrary prebuilt images directly for security reasons. If you want mybinder.org to use a prebuilt image, you must use one of their supported mechanisms (prebuilds) or run a Binder instance that you control. See the Binder docs for details.

How to use our GHCR image locally or in a private BinderHub:

```bash
# pull and run locally
docker pull ghcr.io/maximilianhertenstein/sql_book:latest
docker run --rm -p 8888:8888 ghcr.io/maximilianhertenstein/sql_book:latest
```

If you do not control the BinderHub (for example using mybinder.org) and cannot rely on prebuilt images, the `.dockerignore` file in this repo reduces the build context so the remote builder has fewer files to watch. This often helps but does not guarantee a successful build on overloaded public builders.

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
