import { AsyncLocalStorage } from 'node:async_hooks';
import { createRequire } from 'node:module';
import path from 'node:path';
import { isDispatchHostname } from '@/lib/himalayan-dispatch-routes';

interface DispatchRequestStore {
  isSubdomain: boolean;
}

interface NextWorkUnitStoreLike {
  type?: string;
  headers?: {
    get?: (name: string) => string | null;
  };
}

interface NextWorkUnitStorageModule {
  workUnitAsyncStorage?: {
    getStore?: () => NextWorkUnitStoreLike | undefined;
  };
}

const dispatchRequestAls = new AsyncLocalStorage<DispatchRequestStore>();
let cachedWorkUnitMod: NextWorkUnitStorageModule | null | undefined;

function getNextWorkUnitModule(): NextWorkUnitStorageModule | null {
  if (cachedWorkUnitMod !== undefined) return cachedWorkUnitMod;
  try {
    const req = createRequire(path.join(process.cwd(), 'package.json'));
    const modPath = ['next/dist/server/app-render', 'work-unit-async-storage.external'].join('/');
    cachedWorkUnitMod = req(modPath) as NextWorkUnitStorageModule;
  } catch {
    cachedWorkUnitMod = null;
  }
  return cachedWorkUnitMod;
}

function readNextWorkUnitRequestSubdomain(): boolean | undefined {
  const mod = getNextWorkUnitModule();
  const store = mod?.workUnitAsyncStorage?.getStore?.();
  if (store && typeof store.headers?.get === 'function') {
    if (store.headers.get('x-hd-subdomain') === '1') return true;
    const rawHost = store.headers.get('x-forwarded-host') || store.headers.get('host') || '';
    if (rawHost) return isDispatchHostname(rawHost);
  }
  return undefined;
}

(
  globalThis as unknown as {
    __hdGetRequestSubdomain?: () => boolean;
  }
).__hdGetRequestSubdomain = () => {
  const fromNextRequest = readNextWorkUnitRequestSubdomain();
  if (typeof fromNextRequest === 'boolean') return fromNextRequest;
  return Boolean(dispatchRequestAls.getStore()?.isSubdomain);
};

/**
 * Binds the active server render context so `HD_ROUTES`, `hdRoute()`, and `toKewPlatformUrl()`
 * resolve `/himalayan-dispatch/...` on `localhost:3002` and clean `/...` paths on
 * `dispatch.kashmir-ecowatch.com` with full per-request concurrency safety.
 */
export function enterDispatchRequestContext(isSubdomain: boolean): void {
  dispatchRequestAls.enterWith({ isSubdomain });
}
