# SQL Book

This repository contains notebooks and materials using `xeus-sql` with a local MariaDB server on Binder.

Key files:

- `postBuild` — installs `mariadb-server` and creates the `dbname` database during the build image step.
- `start_mysql.sh` — helper to start the MariaDB server in your Binder session.
- `notebooks/mysql_example.ipynb` — example notebook that starts the server and loads `dbname` for `xeus-sql`.
- `BINDER_INSTRUCTIONS.md` — troubleshooting and Binder-specific notes.

To run on Binder:

1. Build the Binder image (Binder runs `postBuild`). If the remote builder fails with a "too many open files" error, see `BINDER_INSTRUCTIONS.md` for troubleshooting.
2. Open `notebooks/mysql_example.ipynb`.
3. Run the first cell to start MariaDB in the session.
4. Switch the kernel to the `xeus-sql` SQL kernel and run the SQL cell.
