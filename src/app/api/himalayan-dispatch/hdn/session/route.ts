import { NextRequest, NextResponse } from 'next/server';
import {
  computeEffectivePermissions,
  getCookieDomainConfig,
  HDN_ROLE_DEFINITIONS,
  HDN_SESSION_COOKIE,
  resolveHdnRequestAccount,
  signHdnSessionToken,
} from '@/lib/hdn/rbac';
import { authenticateHdnCredentials, readHdnStore } from '@/lib/hdn/store';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account, authMethod } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json({
      authenticated: false,
      account: null,
      permissions: [],
      roleDefinitions: HDN_ROLE_DEFINITIONS,
    });
  }

  const perms = Array.from(computeEffectivePermissions(account.roles));
  const myNotifications = store.notifications.filter(
    (n) =>
      n.recipientSlug === account.slug ||
      n.recipientSlug === 'all_newsroom' ||
      (n.recipientSlug === 'all_editors' && perms.includes('workspace:editorial'))
  );

  const primaryRoleDef = HDN_ROLE_DEFINITIONS[account.roles[0]] || HDN_ROLE_DEFINITIONS.journalist;

  return NextResponse.json({
    authenticated: true,
    authMethod,
    defaultLandingRoute: primaryRoleDef.defaultLandingRoute,
    account: {
      ...account,
      accessCodeHash: undefined,
    },
    permissions: perms,
    notifications: myNotifications.slice(0, 25),
    unreadNotificationsCount: myNotifications.filter(
      (n) => !n.readBySlugs.includes(account.slug)
    ).length,
    roleDefinitions: HDN_ROLE_DEFINITIONS,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim();
    const passcodeOrAccessCode = String(
      body?.passcodeOrAccessCode || body?.accessCode || body?.passcode || ''
    ).trim();

    const res = authenticateHdnCredentials({ email, passcodeOrAccessCode });
    if (res.ok === false) {
      return NextResponse.json(
        { authenticated: false, error: res.error },
        { status: res.status }
      );
    }

    const token = signHdnSessionToken({
      accountId: res.account.id,
      slug: res.account.slug,
      email: res.account.email,
    });

    const perms = Array.from(computeEffectivePermissions(res.account.roles));
    const primaryRoleDef =
      HDN_ROLE_DEFINITIONS[res.account.roles[0]] || HDN_ROLE_DEFINITIONS.journalist;

    const response = NextResponse.json({
      authenticated: true,
      defaultLandingRoute: primaryRoleDef.defaultLandingRoute,
      account: {
        ...res.account,
        accessCodeHash: undefined,
      },
      permissions: perms,
    });

    response.cookies.set({
      name: HDN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 12 * 60 * 60,
      ...getCookieDomainConfig(),
    });

    return response;
  } catch {
    return NextResponse.json(
      { authenticated: false, error: 'Unable to authenticate newsroom credentials.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set({
    name: HDN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
    ...getCookieDomainConfig(),
  });
  return response;
}
