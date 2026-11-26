// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH NEWSROOM (HDN) — 18-ROLE RBAC, SEPARATION OF DUTIES &
// SERVER-SIDE SESSION AUTHORIZATION ENGINE
// Never relies on frontend visibility; enforces every permission, bureau scope,
// department scope, confidential source boundary, and review gate on the server.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import { NextRequest } from 'next/server';
import type { BureauSlugId, EditorialDepartmentId } from '@/types/himalayan-dispatch';
import type {
  HdnAccountRecord,
  HdnArticleManuscript,
  HdnPermissionKey,
  HdnRoleDefinition,
  HdnRoleId,
  HdnWorkflowStatus,
} from '@/types/hdn-newsroom';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  JOURNALIST_SESSION_COOKIE,
  verifyJournalistSessionToken,
} from '@/lib/himalayan-dispatch-store';
import { auth } from '@/auth';

export const HDN_SESSION_COOKIE = 'hdn_newsroom_session';

const ALL_PERMISSIONS: HdnPermissionKey[] = [
  'workspace:journalist',
  'workspace:editorial',
  'workspace:review',
  'workspace:bureau',
  'workspace:department',
  'workspace:admin',
  'pitch:create',
  'pitch:evaluate',
  'assignment:create',
  'assignment:manage_all',
  'assignment:manage_bureau',
  'assignment:manage_department',
  'manuscript:create_own',
  'manuscript:edit_own',
  'manuscript:edit_assigned_desk',
  'manuscript:edit_any',
  'manuscript:delete_trash',
  'manuscript:restore_trash',
  'workflow:fact_check',
  'workflow:scientific_review',
  'workflow:legal_review',
  'workflow:copy_edit',
  'workflow:visual_production',
  'workflow:final_approve',
  'publication:publish',
  'publication:schedule',
  'publication:unpublish',
  'publication:corrections',
  'edition:manage',
  'edition:approve_release',
  'sources:manage_own',
  'sources:view_confidential_vault',
  'media:upload',
  'media:approve',
  'anie:operate',
  'anie:bulk_publish',
  'users:manage_roles',
  'users:approve_applications',
  'audit:view_logs',
];

export const HDN_ROLE_DEFINITIONS: Record<HdnRoleId, HdnRoleDefinition> = {
  founding_eic: {
    id: 'founding_eic',
    title: 'Founding Editor-in-Chief',
    tier: 'leadership',
    authoritySummary: 'Complete editorial oversight, masthead governance, and final publication authority across all streams and editions.',
    defaultLandingRoute: '/newsroom/admin',
    permissions: ALL_PERMISSIONS,
  },
  executive_editor: {
    id: 'executive_editor',
    title: 'Executive Editor',
    tier: 'leadership',
    authoritySummary: 'Day-to-day newsroom operations, workflow oversight, Daily Dispatch publication, and monthly edition approval.',
    defaultLandingRoute: '/newsroom/editorial',
    permissions: ALL_PERMISSIONS.filter((p) => p !== 'users:manage_roles'),
  },
  managing_editor: {
    id: 'managing_editor',
    title: 'Managing Editor',
    tier: 'leadership',
    authoritySummary: 'Assignments, commissioning, cross-bureau coordination, editorial workflow board, and copy/production sign-off.',
    defaultLandingRoute: '/newsroom/editorial',
    permissions: [
      'workspace:journalist',
      'workspace:editorial',
      'workspace:bureau',
      'workspace:department',
      'pitch:create',
      'pitch:evaluate',
      'assignment:create',
      'assignment:manage_all',
      'assignment:manage_bureau',
      'assignment:manage_department',
      'manuscript:create_own',
      'manuscript:edit_own',
      'manuscript:edit_assigned_desk',
      'manuscript:edit_any',
      'manuscript:delete_trash',
      'manuscript:restore_trash',
      'workflow:fact_check',
      'workflow:copy_edit',
      'workflow:visual_production',
      'workflow:final_approve',
      'publication:publish',
      'publication:schedule',
      'publication:corrections',
      'edition:manage',
      'sources:manage_own',
      'sources:view_confidential_vault',
      'media:upload',
      'media:approve',
      'users:approve_applications',
    ],
  },
  commissioning_editor: {
    id: 'commissioning_editor',
    title: 'Commissioning Editor',
    tier: 'editorial_desk',
    authoritySummary: 'Evaluates story pitches, drafts editorial briefs, issues commissions, and guides early manuscript development.',
    defaultLandingRoute: '/newsroom/editorial/commissioning',
    permissions: [
      'workspace:journalist',
      'workspace:editorial',
      'pitch:create',
      'pitch:evaluate',
      'assignment:create',
      'assignment:manage_department',
      'manuscript:create_own',
      'manuscript:edit_own',
      'manuscript:edit_assigned_desk',
      'sources:manage_own',
      'media:upload',
    ],
  },
  bureau_chief: {
    id: 'bureau_chief',
    title: 'Bureau Chief',
    tier: 'editorial_desk',
    authoritySummary: 'Regional reporting desk leadership, correspondent coordination, regional assignments, and bureau submission review.',
    defaultLandingRoute: '/newsroom/editorial/bureaus',
    permissions: [
      'workspace:journalist',
      'workspace:editorial',
      'workspace:bureau',
      'pitch:create',
      'pitch:evaluate',
      'assignment:create',
      'assignment:manage_bureau',
      'manuscript:create_own',
      'manuscript:edit_own',
      'manuscript:edit_assigned_desk',
      'sources:manage_own',
      'media:upload',
    ],
  },
  department_editor: {
    id: 'department_editor',
    title: 'Department Editor',
    tier: 'editorial_desk',
    authoritySummary: 'Department-specific editorial curation, assignments, manuscript assessment, and monthly edition recommendations.',
    defaultLandingRoute: '/newsroom/editorial/departments',
    permissions: [
      'workspace:journalist',
      'workspace:editorial',
      'workspace:department',
      'pitch:create',
      'pitch:evaluate',
      'assignment:create',
      'assignment:manage_department',
      'manuscript:create_own',
      'manuscript:edit_own',
      'manuscript:edit_assigned_desk',
      'workflow:copy_edit',
      'sources:manage_own',
      'media:upload',
    ],
  },
  senior_correspondent: {
    id: 'senior_correspondent',
    title: 'Senior Correspondent',
    tier: 'reporting',
    authoritySummary: 'Longform & investigative reporting, authorized commissions, source registry management, and field dispatches.',
    defaultLandingRoute: '/newsroom',
    permissions: [
      'workspace:journalist',
      'pitch:create',
      'manuscript:create_own',
      'manuscript:edit_own',
      'sources:manage_own',
      'media:upload',
    ],
  },
  journalist: {
    id: 'journalist',
    title: 'Journalist',
    tier: 'reporting',
    authoritySummary: 'Creates, edits, and submits own manuscripts, pitches, research dossiers, and verified interview records.',
    defaultLandingRoute: '/newsroom',
    permissions: [
      'workspace:journalist',
      'pitch:create',
      'manuscript:create_own',
      'manuscript:edit_own',
      'sources:manage_own',
      'media:upload',
    ],
  },
  freelance_contributor: {
    id: 'freelance_contributor',
    title: 'Freelance Contributor',
    tier: 'reporting',
    authoritySummary: 'Accesses commissioned assignments, pitches ideas, and files own commissioned manuscripts.',
    defaultLandingRoute: '/newsroom',
    permissions: [
      'workspace:journalist',
      'pitch:create',
      'manuscript:create_own',
      'manuscript:edit_own',
      'sources:manage_own',
      'media:upload',
    ],
  },
  photojournalist: {
    id: 'photojournalist',
    title: 'Photojournalist',
    tier: 'reporting',
    authoritySummary: 'Submits documentary photography sequences, captions, elevation/exposure provenance, and visual essays.',
    defaultLandingRoute: '/newsroom/media',
    permissions: [
      'workspace:journalist',
      'pitch:create',
      'manuscript:create_own',
      'manuscript:edit_own',
      'media:upload',
    ],
  },
  scientific_reviewer: {
    id: 'scientific_reviewer',
    title: 'Scientific Reviewer',
    tier: 'specialist_review',
    authoritySummary: 'Reviews assigned scientific claims, methodology, statistics, and geospatial assertions without confidential source exposure.',
    defaultLandingRoute: '/newsroom/review',
    permissions: ['workspace:review', 'workflow:scientific_review'],
  },
  fact_checker: {
    id: 'fact_checker',
    title: 'Fact-Checker',
    tier: 'specialist_review',
    authoritySummary: 'Verifies material factual assertions, dates, elevations, citations, and primary documentary evidence.',
    defaultLandingRoute: '/newsroom/editorial/verification',
    permissions: [
      'workspace:editorial',
      'workflow:fact_check',
      'sources:manage_own',
    ],
  },
  copy_editor: {
    id: 'copy_editor',
    title: 'Copy Editor',
    tier: 'specialist_review',
    authoritySummary: 'Refines literary prose, house style, clarity, headlines, standfirsts, and citation formatting.',
    defaultLandingRoute: '/newsroom/editorial/copy-editing',
    permissions: [
      'workspace:editorial',
      'manuscript:edit_assigned_desk',
      'workflow:copy_edit',
    ],
  },
  visual_editor: {
    id: 'visual_editor',
    title: 'Visual Editor',
    tier: 'specialist_review',
    authoritySummary: 'Directs documentary plates, scientific maps, editorial data graphics, licensing, and visual provenance.',
    defaultLandingRoute: '/newsroom/editorial/visual-production',
    permissions: [
      'workspace:editorial',
      'manuscript:edit_assigned_desk',
      'workflow:visual_production',
      'media:upload',
      'media:approve',
    ],
  },
  legal_reviewer: {
    id: 'legal_reviewer',
    title: 'Legal Reviewer',
    tier: 'specialist_review',
    authoritySummary: 'Audits high-risk investigative assertions, right-of-reply outreach, defamation risk, and source-protection compliance.',
    defaultLandingRoute: '/newsroom/editorial/workflow',
    permissions: ['workspace:editorial', 'workflow:legal_review'],
  },
  public_editor: {
    id: 'public_editor',
    title: 'Public Editor',
    tier: 'governance_system',
    authoritySummary: 'Reviews reader complaints, ombudsperson petitions, post-publication clarifications, and ethical accountability.',
    defaultLandingRoute: '/newsroom/editorial/corrections',
    permissions: [
      'workspace:editorial',
      'publication:corrections',
      'audit:view_logs',
    ],
  },
  system_administrator: {
    id: 'system_administrator',
    title: 'System Administrator',
    tier: 'governance_system',
    authoritySummary: 'Complete newsroom infrastructure, accounts, RBAC permissions, autonomous AI engine, budgets, security, and audit trails.',
    defaultLandingRoute: '/newsroom/admin',
    permissions: ALL_PERMISSIONS,
  },
  autonomous_ai_engine: {
    id: 'autonomous_ai_engine',
    title: 'Autonomous AI Engine (HD-ANIE)',
    tier: 'governance_system',
    authoritySummary: 'Discovers signals, verifies external/KEW sources, compiles dossiers, and drafts unpublished manuscripts; zero independent publication authority.',
    defaultLandingRoute: '/newsroom/admin/autonomous-engine',
    permissions: ['manuscript:create_own'], // Strictly NO publication:publish or workflow:final_approve!
  },
};

export function computeEffectivePermissions(roles: HdnRoleId[]): Set<HdnPermissionKey> {
  const perms = new Set<HdnPermissionKey>();
  for (const r of roles) {
    const def = HDN_ROLE_DEFINITIONS[r];
    if (def) {
      for (const p of def.permissions) perms.add(p);
    }
  }
  return perms;
}

export function hasPermission(
  account: Pick<HdnAccountRecord, 'roles' | 'status'> | null | undefined,
  permission: HdnPermissionKey
): boolean {
  if (!account || account.status !== 'active') return false;
  return computeEffectivePermissions(account.roles).has(permission);
}

export function isExecutiveOrAdmin(account: Pick<HdnAccountRecord, 'roles' | 'status'> | null | undefined): boolean {
  if (!account || account.status !== 'active') return false;
  return account.roles.some((r) =>
    ['founding_eic', 'executive_editor', 'system_administrator'].includes(r)
  );
}

/**
 * Checks whether an account can view a specific manuscript (enforcing confidential
 * investigation boundaries, bureau/department scopes, and reporter isolation).
 */
export function canAccessManuscript(
  account: HdnAccountRecord,
  manuscript: HdnArticleManuscript
): boolean {
  if (account.status !== 'active') return false;
  if (isExecutiveOrAdmin(account)) return true;

  // Author or co-author always sees own manuscript
  if (
    manuscript.primaryAuthorSlug === account.slug ||
    manuscript.coAuthorSlugs.includes(account.slug)
  ) {
    return true;
  }

  // Confidential investigations are restricted to assigned authors, Managing Editor, Legal Reviewer (when in legal review), EIC & System Admin
  if (manuscript.isConfidential) {
    if (account.roles.includes('managing_editor')) return true;
    if (account.roles.includes('legal_reviewer') && manuscript.workflowStatus === 'legal_review') {
      return true;
    }
    return false;
  }

  // Bureau Chief sees manuscripts in their assigned bureau(s)
  if (
    account.roles.includes('bureau_chief') &&
    account.assignedBureaus.includes(manuscript.bureauId)
  ) {
    return true;
  }

  // Department Editor / Commissioning Editor sees manuscripts in their assigned department(s)
  if (
    (account.roles.includes('department_editor') ||
      account.roles.includes('commissioning_editor')) &&
    (account.assignedDepartments.length === 0 ||
      account.assignedDepartments.includes(manuscript.departmentId))
  ) {
    return true;
  }

  // Managing Editor, Fact-Checker, Copy Editor, Visual Editor see submitted/editorial manuscripts
  if (
    account.roles.some((r) =>
      ['managing_editor', 'fact_checker', 'copy_editor', 'visual_editor', 'public_editor'].includes(r)
    )
  ) {
    return true;
  }

  // Scientific Reviewer sees manuscripts requiring or undergoing scientific review
  if (
    account.roles.includes('scientific_reviewer') &&
    (manuscript.scientificReviewRequired || manuscript.workflowStatus === 'scientific_review')
  ) {
    return true;
  }

  // Legal Reviewer sees manuscripts requiring legal review
  if (
    account.roles.includes('legal_reviewer') &&
    (manuscript.legalReviewRequired || manuscript.workflowStatus === 'legal_review')
  ) {
    return true;
  }

  return false;
}

/**
 * Checks whether an account can edit a manuscript's content blocks & metadata.
 */
export function canEditManuscript(
  account: HdnAccountRecord,
  manuscript: HdnArticleManuscript
): boolean {
  if (!canAccessManuscript(account, manuscript)) return false;
  if (hasPermission(account, 'manuscript:edit_any')) return true;

  const isAuthor =
    manuscript.primaryAuthorSlug === account.slug ||
    manuscript.coAuthorSlugs.includes(account.slug);

  if (isAuthor && hasPermission(account, 'manuscript:edit_own')) {
    // Reporters cannot directly alter an already-published article without editorial unpublish/revision!
    if (
      manuscript.workflowStatus === 'published' &&
      !hasPermission(account, 'publication:publish')
    ) {
      return false;
    }
    return true;
  }

  if (hasPermission(account, 'manuscript:edit_assigned_desk')) {
    if (
      account.roles.includes('bureau_chief') &&
      account.assignedBureaus.includes(manuscript.bureauId)
    ) {
      return true;
    }
    if (
      account.roles.includes('department_editor') &&
      account.assignedDepartments.includes(manuscript.departmentId)
    ) {
      return true;
    }
    if (
      account.roles.some((r) => ['copy_editor', 'visual_editor', 'commissioning_editor'].includes(r))
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Server-side Workflow Transition & Review Gate Validator.
 * Enforces both Role Permissions AND Adaptive Story Review Requirements!
 */
export function validateWorkflowTransition(
  account: HdnAccountRecord,
  manuscript: HdnArticleManuscript,
  targetStatus: HdnWorkflowStatus
): { allowed: boolean; error?: string } {
  if (!canAccessManuscript(account, manuscript)) {
    return { allowed: false, error: 'Access denied to this manuscript.' };
  }

  // Autonomous AI Engine can NEVER transition to approved, scheduled, or published
  if (
    account.roles.length === 1 &&
    account.roles[0] === 'autonomous_ai_engine' &&
    ['ready_for_approval', 'approved', 'scheduled', 'published'].includes(targetStatus)
  ) {
    return {
      allowed: false,
      error: 'Governance Lock: Autonomous AI Engine has zero independent approval or publication authority.',
    };
  }

  const isAuthor =
    manuscript.primaryAuthorSlug === account.slug ||
    manuscript.coAuthorSlugs.includes(account.slug);

  // Author transitions: researching -> drafting -> submitted, or withdrawn
  if (['researching', 'drafting', 'submitted', 'withdrawn'].includes(targetStatus)) {
    if (isAuthor || hasPermission(account, 'manuscript:edit_assigned_desk') || hasPermission(account, 'manuscript:edit_any')) {
      return { allowed: true };
    }
    return { allowed: false, error: 'Only the assigned journalist or authorized desk editor may update drafting/submission status.' };
  }

  // Editorial queue & specialist review routing
  if (
    [
      'assigned',
      'editorial_review',
      'fact_checking',
      'scientific_review',
      'legal_review',
      'revision_requested',
      'copy_editing',
      'visual_production',
      'rejected',
    ].includes(targetStatus)
  ) {
    if (
      hasPermission(account, 'manuscript:edit_assigned_desk') ||
      hasPermission(account, 'manuscript:edit_any') ||
      hasPermission(account, 'workflow:fact_check') ||
      hasPermission(account, 'workflow:scientific_review') ||
      hasPermission(account, 'workflow:legal_review')
    ) {
      return { allowed: true };
    }
    return {
      allowed: false,
      error: 'Editorial desk or specialist review authority is required for this workflow transition.',
    };
  }

  // Final Approval, Scheduling & Public Publication Gates
  if (['ready_for_approval', 'approved', 'scheduled', 'published'].includes(targetStatus)) {
    if (targetStatus === 'published' && !hasPermission(account, 'publication:publish')) {
      return {
        allowed: false,
        error: 'Unauthorized: Public publication requires Founding Editor-in-Chief, Executive/Managing Editor, or Administrator authority.',
      };
    }
    if (targetStatus === 'scheduled' && !hasPermission(account, 'publication:schedule')) {
      return {
        allowed: false,
        error: 'Unauthorized: Scheduling publication requires authorized editorial leadership.',
      };
    }
    if (
      (targetStatus === 'approved' || targetStatus === 'ready_for_approval') &&
      !hasPermission(account, 'workflow:final_approve')
    ) {
      return {
        allowed: false,
        error: 'Unauthorized: Final editorial approval requires authorized editor credentials.',
      };
    }

    // Enforce mandatory review gates before Approved / Scheduled / Published!
    if (['approved', 'scheduled', 'published'].includes(targetStatus)) {
      if (manuscript.factCheckRequired && !manuscript.factCheckCompleted) {
        return {
          allowed: false,
          error: 'Mandatory Gate: Stage 07 Fact-Checking must be completed and signed off before final approval or publication.',
        };
      }
      if (manuscript.scientificReviewRequired && !manuscript.scientificReviewCompleted) {
        return {
          allowed: false,
          error: 'Mandatory Gate: Stage 08 Scientific Review is required for substantive technical/scientific claims before publication.',
        };
      }
      if (manuscript.legalReviewRequired && !manuscript.legalReviewCompleted) {
        return {
          allowed: false,
          error: 'Mandatory Gate: Stage 09 Legal & Ethical Review (including Right-of-Reply verification) is required for RED/sensitive stories.',
        };
      }
    }

    return { allowed: true };
  }

  if (targetStatus === 'trashed') {
    if (!hasPermission(account, 'manuscript:delete_trash') && !isAuthor) {
      return { allowed: false, error: 'Not authorized to move this manuscript to Trash.' };
    }
    if (manuscript.workflowStatus === 'published') {
      return {
        allowed: false,
        error: 'Published articles must be unpublished before moving to Trash so audit history is preserved.',
      };
    }
    return { allowed: true };
  }

  if (targetStatus === 'archived') {
    if (hasPermission(account, 'publication:publish') || hasPermission(account, 'edition:manage')) {
      return { allowed: true };
    }
    return { allowed: false, error: 'Archiving requires editorial publication authority.' };
  }

  return { allowed: false, error: `Unsupported workflow transition: ${targetStatus}` };
}

// ─── HMAC-SIGNED CROSS-DOMAIN NEWSROOM SESSION TOKENS ───────────────────────

function getHdnSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.CRON_SECRET ||
    'kew-admin-hmac-signing-fallback'
  );
}

export interface HdnSessionTokenPayload {
  accountId: string;
  slug: string;
  email: string;
  iat: number;
  exp: number;
}

export function signHdnSessionToken(
  claims: Omit<HdnSessionTokenPayload, 'iat' | 'exp'>,
  ttlSeconds = 12 * 60 * 60
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: HdnSessionTokenPayload = {
    ...claims,
    iat: now,
    exp: now + ttlSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getHdnSecret())
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifyHdnSessionToken(token?: string | null): HdnSessionTokenPayload | null {
  if (!token || !token.includes('.')) return null;
  const [encoded, providedSig] = token.split('.', 2);
  if (!encoded || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', getHdnSecret())
    .update(encoded)
    .digest('base64url');

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as HdnSessionTokenPayload;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    if (!parsed.slug) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Resolves the authenticated Newsroom Account from ANY active KEW / Dispatch auth channel:
 * 1) Dedicated `hdn_newsroom_session` cookie (supports all 18 roles!)
 * 2) Existing `kew_admin_session` cookie or Bearer secret -> Founding Editor-in-Chief & System Admin
 * 3) Existing `hd_journalist_session` cookie -> Matching journalist/editor account
 * 4) Verified NextAuth session -> Matching newsroom account by email
 */
export async function resolveHdnRequestAccount(
  request: NextRequest,
  accountsLookup: () => HdnAccountRecord[]
): Promise<{
  authenticated: boolean;
  account: HdnAccountRecord | null;
  authMethod: string;
}> {
  const accounts = accountsLookup();

  // 1. Check dedicated HDN cookie (with live status revocation check)
  const hdnToken = request.cookies.get(HDN_SESSION_COOKIE)?.value;
  const hdnClaims = verifyHdnSessionToken(hdnToken);
  if (hdnClaims) {
    const acc = accounts.find(
      (a) => (a.id === hdnClaims.accountId || a.slug === hdnClaims.slug) && a.status === 'active'
    );
    if (acc) {
      return { authenticated: true, account: acc, authMethod: 'hdn_session_cookie' };
    }
  }

  // 2. Check existing KEW Admin Session cookie / Server Bearer token
  const adminRes = await verifyAdminRequest(request);
  if (adminRes.authorized) {
    const founder =
      accounts.find((a) => a.slug === 'dr-fayaz-ahmad-khan') ||
      accounts.find((a) => a.roles.includes('founding_eic')) ||
      accounts[0] ||
      null;
    if (founder) {
      return { authenticated: true, account: founder, authMethod: adminRes.method };
    }
  }

  // 3. Check existing Journalist Workspace cookie (`hd_journalist_session`)
  const jCookie = request.cookies.get(JOURNALIST_SESSION_COOKIE)?.value;
  const jClaims = verifyJournalistSessionToken(jCookie);
  if (jClaims) {
    const acc = accounts.find(
      (a) =>
        (a.slug === jClaims.journalistSlug ||
          a.email.toLowerCase() === jClaims.email.toLowerCase()) &&
        a.status === 'active'
    );
    if (acc) {
      return { authenticated: true, account: acc, authMethod: 'legacy_journalist_cookie' };
    }
  }

  // 4. Check NextAuth session email against active HDN accounts
  try {
    const session = await auth();
    const email = session?.user?.email?.toLowerCase();
    if (email) {
      const acc = accounts.find(
        (a) => a.email.toLowerCase() === email && a.status === 'active'
      );
      if (acc) {
        return { authenticated: true, account: acc, authMethod: 'nextauth_session' };
      }
    }
  } catch {
    // NextAuth not present on request
  }

  return { authenticated: false, account: null, authMethod: 'none' };
}

export function getCookieDomainConfig(): { domain?: string } {
  // Supports shared cross-subdomain authentication across kashmir-ecowatch.com and dispatch.kashmir-ecowatch.com in production
  const sharedDomain = process.env.HDN_COOKIE_DOMAIN?.trim();
  if (process.env.NODE_ENV === 'production' && sharedDomain) {
    return { domain: sharedDomain };
  }
  return {};
}
