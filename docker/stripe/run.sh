#!/bin/sh
set -e

if [ -z "$STRIPE_SECRET_KEY" ] || [ "$STRIPE_SECRET_KEY" = "sk_test_..." ]; then
  echo "STRIPE_SECRET_KEY is not configured or using default placeholder. Stripe listener waiting..."
  # Keep alive so compose doesn't restart repeatedly in error
  tail -f /dev/null
else
  # 1. Login non-interactively
  stripe login --api-key "$STRIPE_SECRET_KEY"

  # 2. Start listener
  stripe listen --forward-to http://backend-dev:8000/payments/webhook/
fi
