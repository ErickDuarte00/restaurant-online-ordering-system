#!/bin/sh
set -e

# Collect static files for WhiteNoise
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Seed menu items if table is empty
echo "Checking and seeding initial menu data..."
python manage.py seed_menu || true

# Ensure default admin user exists
echo "Ensuring default admin user exists..."
python manage.py create_default_admin || true

# Execute container command (e.g. gunicorn or runserver)
exec "$@"
