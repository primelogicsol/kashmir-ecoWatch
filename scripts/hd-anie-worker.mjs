#!/usr/bin/env node
/**
 * Standalone Server-Side CLI / PM2 / Systemd Worker for HD-ANIE
 * Usage:
 *   node scripts/hd-anie-worker.mjs --once
 *   node scripts/hd-anie-worker.mjs --daemon
 */

const baseUrl = process.env.KEW_INTERNAL_URL || 'http://localhost:3002';
const secret = process.env.CRON_SECRET || process.env.ADMIN_API_KEY || '';
const isOnce = process.argv.includes('--once');

async function triggerCycle() {
  const headers = { 'Content-Type': 'application/json' };
  if (secret) headers['Authorization'] = `Bearer ${secret}`;
  try {
    const res = await fetch(`${baseUrl}/api/himalayan-dispatch/anie/cron`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ forceAllSources: isOnce }),
    });
    const json = await res.json();
    console.log(`[HD-ANIE Worker ${new Date().toISOString()}]`, JSON.stringify(json));
  } catch (err) {
    console.error(`[HD-ANIE Worker ${new Date().toISOString()}] Error:`, err.message);
  }
}

(async () => {
  await triggerCycle();
  if (!isOnce) {
    console.log('[HD-ANIE Worker] Persistent daemon active (checking due sources every 5 minutes)...');
    setInterval(triggerCycle, 5 * 60 * 1000);
  }
})();
