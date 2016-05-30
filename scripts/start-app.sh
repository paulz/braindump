#!/bin/bash

set -e

until bash -c "python manage.py db current"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up, starting braindump"
# Update Crontab
bash -c "for file in etc/cron/*; do crontab $file; done"
# Run Migrations and Start App
bash -c "python manage.py deploy && gunicorn manage:app -b 0.0.0.0"