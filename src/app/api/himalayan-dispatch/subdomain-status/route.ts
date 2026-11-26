import https from 'node:https';
import tls from 'node:tls';
import { NextResponse } from 'next/server';
import {
  DISPATCH_HOSTNAME,
  DISPATCH_SUBDOMAIN_DIRECT_URL,
  HD_LEGACY_PREFIX,
} from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

interface SubdomainProbeResult {
  targetUrl: string;
  fallbackUrl: string;
  ready: boolean;
  tlsValid: boolean;
  statusCode: number | null;
  resolvedUrl: string;
  reason?: string;
  checkedAt: string;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedProbe: { expiresAt: number; payload: SubdomainProbeResult } | null = null;

function probeDispatchSubdomain(): Promise<SubdomainProbeResult> {
  const checkedAt = new Date().toISOString();
  return new Promise((resolve) => {
    const req = https.request(
      DISPATCH_SUBDOMAIN_DIRECT_URL,
      {
        method: 'GET',
        rejectUnauthorized: true,
        timeout: 4500,
        headers: {
          'User-Agent': 'KEW-Header-Subdomain-Verifier/1.0',
          Accept: 'text/html,application/xhtml+xml',
        },
      },
      (res) => {
        const socket = res.socket as tls.TLSSocket;
        const authorized = Boolean(socket?.authorized);
        const cert = typeof socket?.getPeerCertificate === 'function' ? socket.getPeerCertificate() : null;
        const identityErr =
          cert && Object.keys(cert).length > 0
            ? tls.checkServerIdentity(DISPATCH_HOSTNAME, cert)
            : new Error('Missing peer certificate');
        const tlsValid = authorized && !identityErr;
        const statusCode = res.statusCode ?? null;
        const ready = tlsValid && statusCode === 200;

        res.resume();
        resolve({
          targetUrl: DISPATCH_SUBDOMAIN_DIRECT_URL,
          fallbackUrl: HD_LEGACY_PREFIX,
          ready,
          tlsValid,
          statusCode,
          resolvedUrl: ready ? DISPATCH_SUBDOMAIN_DIRECT_URL : HD_LEGACY_PREFIX,
          reason: ready
            ? undefined
            : !tlsValid
            ? identityErr?.message || 'TLS certificate validation failed'
            : `Unexpected HTTP status ${statusCode}`,
          checkedAt,
        });
      }
    );

    req.on('timeout', () => {
      req.destroy(new Error('HTTPS probe timeout'));
    });

    req.on('error', (err: NodeJS.ErrnoException) => {
      resolve({
        targetUrl: DISPATCH_SUBDOMAIN_DIRECT_URL,
        fallbackUrl: HD_LEGACY_PREFIX,
        ready: false,
        tlsValid: false,
        statusCode: null,
        resolvedUrl: HD_LEGACY_PREFIX,
        reason: err.code ? `${err.code}: ${err.message}` : err.message,
        checkedAt,
      });
    });

    req.end();
  });
}

export async function GET() {
  const now = Date.now();
  if (cachedProbe && cachedProbe.expiresAt > now) {
    return NextResponse.json(cachedProbe.payload, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=240',
      },
    });
  }

  const payload = await probeDispatchSubdomain();
  cachedProbe = {
    expiresAt: now + CACHE_TTL_MS,
    payload,
  };

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=240',
    },
  });
}
