# Kashmir EcoWatch — Non-Destructive Database Backup & Rollback Procedure

## 1. Schema Safety Guarantee
All Global Discovery & Authority Engine persistence uses strictly **additive, non-destructive** DDL (`CREATE TABLE IF NOT EXISTS`):
- `kew_discovery_events`
- `kew_brand_monitors`
- `kew_distribution_workflows`
- `kew_indexnow_logs`
- `kew_indexnow_url_ledger`
- `kew_discovery_audit_logs`

Zero existing spatial, biodiversity, hydrological, search (`kew_search_documents`), user, or operations tables are altered, truncated, or dropped.

## 2. Pre-Deployment Snapshot Backup
Run before any production deployment or schema initialization:

```bash
# Option A: Node JSON table snapshot (works without local pg_dump binary)
KEW_BACKUP_DIR="./data/backups" node scripts/backup-discovery-db.js

# Option B: Full PostgreSQL custom-format dump (when pg_dump is installed)
pg_dump --format=custom --no-owner --no-acl "$DATABASE_URL" -f kew_predeploy_$(date +%Y%m%d_%H%M%S).dump
```

> **Security Requirement:** Ensure `./data/backups/` and `*.dump` files remain excluded from Git commits via `.gitignore`.

## 3. Rollback Procedure
If a deployment must be rolled back:
1. Revert the application deployment (`git revert <commit>` or redeploy the previous release tag).
2. Because all six `kew_*` discovery tables are additive and isolated from core scientific/GIS queries, existing application releases continue operating without schema conflicts.
3. To restore discovery table state from a pre-deployment snapshot if needed, re-import rows from the timestamped `kew-predeploy-snapshot-*.json` archive or run `pg_restore --data-only --table=kew_brand_monitors --table=kew_distribution_workflows <dumpfile>`.
