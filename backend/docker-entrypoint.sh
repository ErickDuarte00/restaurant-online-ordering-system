#!/bin/sh
set -e

# Run database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Execute container command (e.g. gunicorn or runserver)
exec "$@"
