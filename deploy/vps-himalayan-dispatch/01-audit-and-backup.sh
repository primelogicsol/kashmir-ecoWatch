#!/usr/bin/env bash
# =============================================================================
# 01-audit-and-backup.sh
# Forensic Read-Only VPS Diagnostic Audit + Pre-Change Backup Vault
# Target VPS: 74.208.248.57 (Ubuntu / Nginx 1.24.0 / Certbot / PM2 / Next.js)
#
# SAFE TO RUN AT ANY TIME: Does NOT modify Nginx, SSL, DNS, or restart services.
# Never assumes port 3002 — dynamically extracts the live KEW upstream from Nginx.
# =============================================================================
set -euo pipefail

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_ROOT="${BACKUP_ROOT:-/root/backups/kew-dispatch-${TIMESTAMP}}"
APP_DIR="${APP_DIR:-$(pwd)}"

echo "=================================================================="
echo " HIMALAYAN DISPATCH — VPS FORENSIC AUDIT & BACKUP"
echo " Timestamp (UTC): ${TIMESTAMP}"
echo " Backup Vault:    ${BACKUP_ROOT}"
echo "=================================================================="

mkdir -p "${BACKUP_ROOT}/nginx" "${BACKUP_ROOT}/letsencrypt-meta" "${BACKUP_ROOT}/pm2" "${BACKUP_ROOT}/app-data"
chmod 700 "${BACKUP_ROOT}"

echo "[1/8] Auditing Nginx syntax, enabled vhosts & error logs..."
{
  echo "=== NGINX SYNTAX TEST (nginx -t) ==="
  nginx -t 2>&1 || true
  echo ""
  echo "=== ENABLED NGINX SITES (/etc/nginx/sites-enabled) ==="
  ls -la /etc/nginx/sites-enabled/ /etc/nginx/sites-available/ /etc/nginx/conf.d/ 2>&1 || true
  echo ""
  echo "=== DEFAULT PORT 443 SSL VHOST ORDER (EXPLAINS 502 + CERT MISMATCH) ==="
  grep -rn "listen.*443" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null || true
  echo ""
  echo "=== RECENT NGINX ERROR LOGS (LAST 100 LINES) ==="
  tail -n 100 /var/log/nginx/error.log 2>/dev/null || true
} | tee "${BACKUP_ROOT}/01-nginx-forensic-audit.txt"

echo "[2/8] Backing up complete /etc/nginx configuration & compiled dump..."
cp -a /etc/nginx "${BACKUP_ROOT}/nginx/etc-nginx-full"
nginx -T > "${BACKUP_ROOT}/nginx/nginx-compiled-dump.txt" 2>&1 || true

echo "[3/8] Extracting actual live kashmir-ecowatch.com upstream proxy_pass..."
DETECTED_UPSTREAM="$(
  awk '
    /server[[:space:]]*\{/ { in_srv=1; block="" }
    in_srv { block = block $0 "\n" }
    /\}/ && in_srv {
      if (block ~ /server_name[^;]*kashmir-ecowatch\.com/ && block !~ /dispatch\.kashmir-ecowatch\.com/ && block ~ /proxy_pass/) {
        print block
      }
      in_srv=0
    }
  ' "${BACKUP_ROOT}/nginx/nginx-compiled-dump.txt" \
  | sed -nE 's/^[[:space:]]*proxy_pass[[:space:]]+(https?:\/\/[^;[:space:]]+).*/\1/p' \
  | head -n 1
)"
echo "Detected KEW Production Upstream: ${DETECTED_UPSTREAM:-NOT_FOUND_IN_SERVER_BLOCK}" | tee "${BACKUP_ROOT}/02-detected-kew-upstream.txt"
grep -rn "proxy_pass" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | tee "${BACKUP_ROOT}/03-all-nginx-upstreams.txt" || true

echo "[4/8] Auditing listening TCP ports, Node/Next.js processes, PM2, systemd & Docker..."
{
  echo "=== LISTENING TCP SOCKETS (ss -ltnp) ==="
  ss -ltnp || true
  echo ""
  echo "=== RUNNING NODE / NEXT PROCESSES ==="
  ps aux | grep -E 'node|next|pm2' | grep -v grep || true
  echo ""
  echo "=== PM2 PROCESS LIST ==="
  if command -v pm2 >/dev/null 2>&1; then
    pm2 list || true
  else
    echo "pm2 not in PATH for current user"
  fi
  echo ""
  echo "=== SYSTEMD NODE / NEXT / PM2 SERVICES ==="
  systemctl list-units --type=service --state=running | grep -Ei 'pm2|node|next|kew|nginx' || true
  echo ""
  echo "=== DOCKER CONTAINERS (IF APPLICABLE) ==="
  if command -v docker >/dev/null 2>&1; then
    docker ps -a || true
  else
    echo "Docker not installed / not used"
  fi
} | tee "${BACKUP_ROOT}/04-processes-and-ports.txt"

if command -v pm2 >/dev/null 2>&1; then
  pm2 save >/dev/null 2>&1 || true
  if [ -f "${HOME}/.pm2/dump.pm2" ]; then
    cp -a "${HOME}/.pm2/dump.pm2" "${BACKUP_ROOT}/pm2/dump.pm2"
  fi
fi

echo "[5/8] Auditing server resource availability (Disk, RAM, Load, UFW)..."
{
  uptime || true
  echo ""
  free -h || true
  echo ""
  df -h || true
  echo ""
  ufw status verbose 2>/dev/null || true
} | tee "${BACKUP_ROOT}/05-resources-and-firewall.txt"

echo "[6/8] Auditing Let's Encrypt certificates & renewal timers..."
{
  certbot certificates 2>&1 || true
  echo ""
  echo "=== CERTBOT RENEWAL TIMERS / CRON ==="
  systemctl list-timers --all | grep -Ei 'certbot|letsencrypt' || true
  ls -la /etc/cron.d/ 2>/dev/null || true
} | tee "${BACKUP_ROOT}/letsencrypt-meta/certbot-certificates.txt"
if [ -d /etc/letsencrypt/renewal ]; then
  cp -a /etc/letsencrypt/renewal "${BACKUP_ROOT}/letsencrypt-meta/"
fi

echo "[7/8] Probing live upstream application health & Dispatch hostname routing readiness..."
if [ -n "${DETECTED_UPSTREAM}" ]; then
  {
    echo "=== UPSTREAM HEALTH: Host: kashmir-ecowatch.com -> ${DETECTED_UPSTREAM}/ ==="
    curl -sSI -H "Host: kashmir-ecowatch.com" -H "X-Forwarded-Proto: https" "${DETECTED_UPSTREAM}/" | head -n 12 || true
    echo ""
    echo "=== UPSTREAM DISPATCH ROUTING CHECK: Host: dispatch.kashmir-ecowatch.com -> ${DETECTED_UPSTREAM}/ ==="
    curl -sSI -H "Host: dispatch.kashmir-ecowatch.com" -H "X-Forwarded-Host: dispatch.kashmir-ecowatch.com" -H "X-Forwarded-Proto: https" "${DETECTED_UPSTREAM}/" | head -n 12 || true
  } | tee "${BACKUP_ROOT}/06-upstream-health-probe.txt"
fi

echo "[8/8] Backing up application data stores & Git revision..."
if [ -d "${APP_DIR}" ]; then
  (cd "${APP_DIR}" && git rev-parse HEAD > "${BACKUP_ROOT}/app-data/git-commit.txt" 2>/dev/null || true)
  if [ -d "${APP_DIR}/data" ]; then
    cp -a "${APP_DIR}/data" "${BACKUP_ROOT}/app-data/"
  fi
  if [ -f "${APP_DIR}/.env" ]; then
    cp -a "${APP_DIR}/.env" "${BACKUP_ROOT}/app-data/dotenv.backup"
    chmod 600 "${BACKUP_ROOT}/app-data/dotenv.backup"
  fi
fi

mkdir -p /root/backups
echo "${BACKUP_ROOT}" > /root/backups/latest-kew-dispatch-backup.path
if [ -n "${DETECTED_UPSTREAM}" ]; then
  echo "${DETECTED_UPSTREAM}" > /root/backups/detected-kew-upstream.url
fi

echo ""
echo "Forensic audit and backup completed (zero production services modified or restarted)."
echo "Backup vault:      ${BACKUP_ROOT}"
echo "Detected upstream: ${DETECTED_UPSTREAM:-inspect ${BACKUP_ROOT}/03-all-nginx-upstreams.txt}"
