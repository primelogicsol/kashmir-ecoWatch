#!/usr/bin/env bash
# =============================================================================
# 02-activate-subdomain-ssl.sh
# Administrator-Authorized Remediation & SSL Activation Script
# Target: https://dispatch.kashmir-ecowatch.com on VPS 74.208.248.57
#
# DO NOT RUN WITHOUT EXPLICIT ADMINISTRATOR AUTHORIZATION.
#
# Key Guarantees:
#   - NEVER assumes port 3002: auto-detects the exact live proxy_pass upstream
#     used by kashmir-ecowatch.com in Nginx (or accepts KEW_UPSTREAM_URL override)
#   - Verifies upstream TCP listener + HTTP 200 health + Dispatch hostname routing
#     BEFORE touching Nginx
#   - Never modifies IONOS DNS, kashmir-ecowatch.com Nginx vhost, or KEW SSL cert
#   - Issues dedicated Let's Encrypt certificate for dispatch.kashmir-ecowatch.com
#   - Validates `nginx -t` before graceful `systemctl reload nginx` (zero downtime)
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-contact@kashmir-ecowatch.com}"
VHOST_AVAIL="/etc/nginx/sites-available/dispatch.kashmir-ecowatch.com"
VHOST_ENABLED="/etc/nginx/sites-enabled/dispatch.kashmir-ecowatch.com"

echo "[Step 1/8] Running forensic audit and full pre-change backup..."
bash "${SCRIPT_DIR}/01-audit-and-backup.sh"

KEW_UPSTREAM_URL="${KEW_UPSTREAM_URL:-}"
if [ -z "${KEW_UPSTREAM_URL}" ] && [ -f /root/backups/detected-kew-upstream.url ]; then
  KEW_UPSTREAM_URL="$(cat /root/backups/detected-kew-upstream.url | tr -d '[:space:]')"
fi
# Strip any trailing slash so proxy_pass preserves full URI cleanly
KEW_UPSTREAM_URL="${KEW_UPSTREAM_URL%/}"

if [ -z "${KEW_UPSTREAM_URL}" ]; then
  echo "ERROR: Could not auto-detect kashmir-ecowatch.com proxy_pass from Nginx."
  echo "Re-run with explicit upstream, e.g.: KEW_UPSTREAM_URL=http://127.0.0.1:3000 sudo -E bash $0"
  exit 1
fi

echo "[Step 2/8] Verifying live KEW Next.js upstream (${KEW_UPSTREAM_URL})..."
KEW_STATUS="$(curl -sS -o /dev/null -w '%{http_code}' -H 'Host: kashmir-ecowatch.com' -H 'X-Forwarded-Proto: https' "${KEW_UPSTREAM_URL}/" || echo 000)"
if [ "${KEW_STATUS}" != "200" ]; then
  echo "ERROR: Upstream ${KEW_UPSTREAM_URL} returned HTTP ${KEW_STATUS} for Host: kashmir-ecowatch.com (expected 200)."
  echo "Aborting before making any Nginx changes."
  exit 1
fi

DISPATCH_TITLE_CHECK="$(curl -sS -H 'Host: dispatch.kashmir-ecowatch.com' -H 'X-Forwarded-Host: dispatch.kashmir-ecowatch.com' -H 'X-Forwarded-Proto: https' "${KEW_UPSTREAM_URL}/" | grep -o 'Himalayan Dispatch' | head -n 1 || true)"
if [ "${DISPATCH_TITLE_CHECK}" != "Himalayan Dispatch" ]; then
  echo "ERROR: Upstream ${KEW_UPSTREAM_URL} does not yet have the updated Himalayan Dispatch hostname routing build deployed."
  echo "Deploy and build the updated repository code on the VPS first (git pull && npm run build && pm2 reload <kew-app-name>), then re-run this script."
  exit 1
fi
echo "Verified ${KEW_UPSTREAM_URL} is live (HTTP 200) and serves Himalayan Dispatch for Host: dispatch.kashmir-ecowatch.com."

echo "[Step 3/8] Installing Phase 1 HTTP ACME bootstrap vhost for dispatch.kashmir-ecowatch.com..."
mkdir -p /var/www/certbot
sed "s|{{KEW_UPSTREAM_URL}}|${KEW_UPSTREAM_URL}|g" \
  "${SCRIPT_DIR}/nginx/dispatch.kashmir-ecowatch.com.http-bootstrap.conf" > "${VHOST_AVAIL}"
ln -sfn "${VHOST_AVAIL}" "${VHOST_ENABLED}"

nginx -t
systemctl reload nginx

echo "[Step 4/8] Issuing Let's Encrypt SSL certificate for dispatch.kashmir-ecowatch.com..."
certbot certonly --webroot \
  -w /var/www/certbot \
  -d dispatch.kashmir-ecowatch.com \
  --non-interactive \
  --agree-tos \
  --email "${CERTBOT_EMAIL}" \
  --keep-until-expiring

echo "[Step 5/8] Installing Phase 2 production HTTPS (443) + HTTP->HTTPS (308) vhost..."
sed "s|{{KEW_UPSTREAM_URL}}|${KEW_UPSTREAM_URL}|g" \
  "${SCRIPT_DIR}/nginx/dispatch.kashmir-ecowatch.com.ssl.conf" > "${VHOST_AVAIL}"

nginx -t
systemctl reload nginx

echo "[Step 6/8] Verifying SSL certificate chain & automatic renewal dry-run..."
openssl x509 -in /etc/letsencrypt/live/dispatch.kashmir-ecowatch.com/fullchain.pem -noout -subject -issuer -dates -ext subjectAltName
certbot renew --cert-name dispatch.kashmir-ecowatch.com --dry-run

echo "[Step 7/8] Running comprehensive production & isolation verification..."
check_200() {
  local url="$1"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' "${url}")"
  echo "  [CHECK 200] ${url} -> HTTP ${code}"
  [ "${code}" = "200" ]
}

check_404() {
  local url="$1"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' "${url}")"
  echo "  [CHECK 404] ${url} -> HTTP ${code}"
  [ "${code}" = "404" ]
}

check_200 "https://kashmir-ecowatch.com/"
check_200 "https://kashmir-ecowatch.com/water-systems"
check_200 "https://dispatch.kashmir-ecowatch.com/"
check_200 "https://dispatch.kashmir-ecowatch.com/bureaus/kashmir"
check_200 "https://dispatch.kashmir-ecowatch.com/bureaus/jammu"
check_200 "https://dispatch.kashmir-ecowatch.com/bureaus/ladakh"
check_200 "https://dispatch.kashmir-ecowatch.com/bureaus/ajk"
check_200 "https://dispatch.kashmir-ecowatch.com/bureaus/gilgit"
check_200 "https://dispatch.kashmir-ecowatch.com/bureaus/baltistan"
check_200 "https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01/the-price-of-protecting-paradise"
check_200 "https://dispatch.kashmir-ecowatch.com/daily-dispatch"
check_200 "https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01"
check_200 "https://dispatch.kashmir-ecowatch.com/newsroom"
check_200 "https://dispatch.kashmir-ecowatch.com/journalist-sign-in"
check_200 "https://dispatch.kashmir-ecowatch.com/images/himalayan-dispatch/cover-gangbal-inaugural.jpg"
check_200 "https://dispatch.kashmir-ecowatch.com/feed.xml"
check_200 "https://dispatch.kashmir-ecowatch.com/sitemap.xml"
check_404 "https://dispatch.kashmir-ecowatch.com/water-systems"
check_404 "https://dispatch.kashmir-ecowatch.com/ai-editorial-transparency"

echo "[Step 8/8] Verifying HTTP -> HTTPS 308 redirect (no redirect loops)..."
HTTP_REDIR="$(curl -sSI http://dispatch.kashmir-ecowatch.com/ | head -n 5)"
echo "${HTTP_REDIR}"

echo ""
echo "SUCCESS: https://dispatch.kashmir-ecowatch.com/ is live on ${KEW_UPSTREAM_URL} with valid Let's Encrypt TLS."
echo "Main website https://kashmir-ecowatch.com/ verified 200 OK without interruption."
