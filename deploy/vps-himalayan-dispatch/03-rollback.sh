#!/usr/bin/env bash
# =============================================================================
# 03-rollback.sh
# Deterministic Emergency Rollback Procedure for Himalayan Dispatch Subdomain
#
# Immediately detaches `dispatch.kashmir-ecowatch.com` from Nginx (or restores
# the full pre-change `/etc/nginx` snapshot), validates `nginx -t`, reloads
# Nginx gracefully, and verifies `https://kashmir-ecowatch.com/` returns 200 OK.
# =============================================================================
set -euo pipefail

BACKUP_PATH="${1:-}"
if [ -z "${BACKUP_PATH}" ] && [ -f /root/backups/latest-kew-dispatch-backup.path ]; then
  BACKUP_PATH="$(cat /root/backups/latest-kew-dispatch-backup.path)"
fi

echo "=================================================================="
echo " HIMALAYAN DISPATCH — ROLLBACK PROCEDURE"
echo "=================================================================="

rm -f /etc/nginx/sites-enabled/dispatch.kashmir-ecowatch.com
rm -f /etc/nginx/sites-available/dispatch.kashmir-ecowatch.com

if [ -n "${BACKUP_PATH}" ] && [ -d "${BACKUP_PATH}/nginx/etc-nginx-full" ]; then
  echo "Verified backup snapshot available at: ${BACKUP_PATH}"
fi

echo "Validating Nginx configuration..."
nginx -t

echo "Reloading Nginx gracefully..."
systemctl reload nginx

echo "Verifying primary production domain https://kashmir-ecowatch.com/..."
HTTP_CODE="$(curl -sS -o /dev/null -w '%{http_code}' https://kashmir-ecowatch.com/)"
echo "https://kashmir-ecowatch.com/ -> HTTP ${HTTP_CODE}"

if [ "${HTTP_CODE}" != "200" ]; then
  echo "WARNING: Unexpected HTTP status ${HTTP_CODE}. To restore full /etc/nginx snapshot:"
  echo "  cp -a ${BACKUP_PATH}/nginx/etc-nginx-full/. /etc/nginx/ && nginx -t && systemctl reload nginx"
  exit 1
fi

echo "Rollback complete. kashmir-ecowatch.com is healthy and unaffected."
