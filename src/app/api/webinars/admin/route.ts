import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  signAdminSessionToken,
  verifyAdminRequest,
} from '@/lib/seo/admin-session';
import {
  appendHallAudit,
  CAPACITY_PROFILES,
  getActiveGlobalCounts,
  getInstitutionUsedStorageBytes,
  getOrInitRoomAllocation,
  loadHallStore,
  mintHallAccessToken,
  ONE_GIB_BYTES,
  PersistentHallStoreData,
  ROLE_PERMISSIONS,
  saveHallStore,
} from '@/lib/virtual-hall-store';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';
import {
  CapacityPhaseId,
  EnvironmentMode,
  EventModeId,
  HallRole,
  INSTITUTION_TYPE_OPTIONS,
  InstitutionalHostingRecord,
  InstitutionalLifecycleStage,
  InstitutionalVerificationStatus,
} from '@/types/virtual-hall';

export const dynamic = 'force-dynamic';

const GENERIC_WEBMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.in',
  'yahoo.co.uk',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'proton.me',
  'protonmail.com',
  'rediffmail.com',
  'aol.com',
  'zoho.com',
  'mail.com',
]);

function normalizeInstitutionKey(raw: string): string {
  return String(raw || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function extractCleanHostname(urlOrDomain: string): string {
  const trimmed = String(urlOrDomain || '').trim().toLowerCase();
  if (!trimmed) return '';
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(withProto);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return trimmed
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .trim();
  }
}

function normalizeWebsiteUrl(rawWebsite: string): string {
  const trimmed = String(rawWebsite || '').trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed.slice(0, 200) : `https://${trimmed.slice(0, 192)}`;
}

function isInstitutionalDomain(domain: string): boolean {
  if (!domain || !domain.includes('.')) return false;
  if (domain === 'verified-partner.org') return false;
  return !GENERIC_WEBMAIL_DOMAINS.has(domain.toLowerCase());
}

function deriveInstitutionDomain(website: string, email: string, explicitDomain?: string): string {
  const fromExplicit = extractCleanHostname(explicitDomain || '');
  if (fromExplicit && fromExplicit.includes('.')) return fromExplicit;

  const fromWebsite = extractCleanHostname(website);
  if (fromWebsite && fromWebsite.includes('.')) return fromWebsite;

  const emailDomain = String(email || '')
    .trim()
    .toLowerCase()
    .split('@')[1];
  if (emailDomain && isInstitutionalDomain(emailDomain)) {
    return emailDomain;
  }
  return 'Pending Domain Verification';
}

function resolveInstitutionType(
  rawSelection: string,
  rawCustomType?: string
): { selection: string; customType?: string; resolvedCategory: string; error?: string } {
  const trimmedSelection = String(rawSelection || '').trim() || 'University';
  if (trimmedSelection === 'Other') {
    const custom = String(rawCustomType || '').trim().slice(0, 80);
    if (!custom) {
      return {
        selection: 'Other',
        resolvedCategory: 'Other',
        error: 'Please specify the Custom Institution Type when "Other" is selected.',
      };
    }
    return {
      selection: 'Other',
      customType: custom,
      resolvedCategory: custom,
    };
  }
  const validOption = INSTITUTION_TYPE_OPTIONS.find(
    (opt) => opt.toLowerCase() === trimmedSelection.toLowerCase()
  );
  const category = validOption || trimmedSelection.slice(0, 80);
  return {
    selection: category,
    resolvedCategory: category,
  };
}

interface UnifiedInstitutionSummary {
  institutionId: string;
  name: string;
  shortName?: string;
  category: string;
  institutionTypeSelection?: string;
  customInstitutionType?: string;
  isCustomInstitution: boolean;
  country: string;
  cityRegion: string;
  domain: string;
  website: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  verificationStatus: InstitutionalVerificationStatus;
  verifiedAt?: string;
  verificationNotes?: string;
  bio: string;
  applicationsCount: number;
  latestConferenceTitle?: string;
  latestRecordId?: string;
  allocatedDelegates: number;
  allocatedSpeakers: number;
  allocatedTracks: number;
}

function buildUnifiedInstitutions(store: PersistentHallStoreData): UnifiedInstitutionSummary[] {
  const profile = CAPACITY_PROFILES[store.activePhase];
  const overrides = store.institutionStatusOverrides || {};
  const map = new Map<string, UnifiedInstitutionSummary>();

  // 1. Seed partner institutions (3 baseline institutions)
  for (const seed of VERIFIED_INSTITUTIONS) {
    const ov = overrides[seed.id];
    const seedStatus: InstitutionalVerificationStatus =
      ov?.verificationStatus ||
      (seed.status === 'verified'
        ? 'verified'
        : seed.status === 'rejected'
        ? 'rejected'
        : seed.status === 'pending'
        ? 'pending'
        : 'under_review');

    map.set(seed.id, {
      institutionId: seed.id,
      name: seed.name,
      shortName: seed.shortName,
      category: seed.category,
      isCustomInstitution: false,
      country: seed.country,
      cityRegion: seed.city,
      domain: seed.domain,
      website: seed.website,
      contactName: seed.authorizedRep.name,
      contactTitle: seed.authorizedRep.title,
      contactEmail: seed.authorizedRep.email,
      verificationStatus: seedStatus,
      verifiedAt: ov?.verifiedAt || seed.verifiedAt,
      verificationNotes: ov?.verificationNotes,
      bio: seed.bio,
      applicationsCount: 0,
      allocatedDelegates: profile.maxConcurrentDelegates,
      allocatedSpeakers: profile.maxInteractiveSpeakers,
      allocatedTracks: profile.maxScientificTracks,
    });
  }

  // 2. Merge live hosting & registration records without creating duplicate institutional entries
  // Process oldest-to-newest so latest status/metadata wins while counting all linked proposals
  const chronological = [...store.hostingRecords].reverse();
  for (const rec of chronological) {
    const ov = overrides[rec.institutionId];
    const existing = map.get(rec.institutionId);
    const isPlaceholderOnly = rec.conferenceTitle.startsWith('Institutional Accreditation Dossier');

    if (existing) {
      existing.verificationStatus = ov?.verificationStatus || rec.verificationStatus;
      if (ov?.verifiedAt || rec.verifiedAt) {
        existing.verifiedAt = ov?.verifiedAt || rec.verifiedAt;
      }
      if (ov?.verificationNotes || rec.verificationNotes) {
        existing.verificationNotes = ov?.verificationNotes || rec.verificationNotes;
      }
      if (!isPlaceholderOnly) {
        existing.applicationsCount += 1;
        existing.latestConferenceTitle = rec.conferenceTitle;
      }
      existing.latestRecordId = rec.id;
      existing.allocatedDelegates = rec.allocatedDelegates;
      existing.allocatedSpeakers = rec.allocatedSpeakers;
      existing.allocatedTracks = rec.allocatedTracks;
    } else {
      map.set(rec.institutionId, {
        institutionId: rec.institutionId,
        name: rec.institutionName,
        category: rec.institutionCategory,
        institutionTypeSelection: rec.institutionTypeSelection,
        customInstitutionType: rec.customInstitutionType,
        isCustomInstitution: Boolean(rec.isCustomInstitution ?? true),
        country: rec.country || 'Unspecified',
        cityRegion: rec.cityRegion || 'Unspecified',
        domain: rec.domain,
        website: rec.website,
        contactName: rec.contactName,
        contactTitle: rec.contactTitle,
        contactEmail: rec.contactEmail,
        verificationStatus: ov?.verificationStatus || rec.verificationStatus,
        verifiedAt: ov?.verifiedAt || rec.verifiedAt,
        verificationNotes: ov?.verificationNotes || rec.verificationNotes,
        bio: rec.scientificScope,
        applicationsCount: isPlaceholderOnly ? 0 : 1,
        latestConferenceTitle: isPlaceholderOnly ? undefined : rec.conferenceTitle,
        latestRecordId: rec.id,
        allocatedDelegates: rec.allocatedDelegates,
        allocatedSpeakers: rec.allocatedSpeakers,
        allocatedTracks: rec.allocatedTracks,
      });
    }
  }

  // Return newest/custom institutions first or preserve natural order (custom recent first, then seeds)
  const list = Array.from(map.values());
  const customOnes = list.filter((i) => i.isCustomInstitution).reverse();
  const seedOnes = list.filter((i) => !i.isCustomInstitution);
  return [...customOnes, ...seedOnes];
}

function findMatchingInstitution(
  institutions: UnifiedInstitutionSummary[],
  name: string,
  domain: string,
  website: string
): UnifiedInstitutionSummary | undefined {
  const normName = normalizeInstitutionKey(name);
  const cleanDom = isInstitutionalDomain(domain) ? domain.toLowerCase() : '';
  const cleanWebHost = extractCleanHostname(website);

  return institutions.find((inst) => {
    if (normName && normalizeInstitutionKey(inst.name) === normName) {
      return true;
    }
    if (inst.shortName && normName && normalizeInstitutionKey(inst.shortName) === normName) {
      return true;
    }
    const instDom = isInstitutionalDomain(inst.domain) ? inst.domain.toLowerCase() : '';
    const instWebHost = extractCleanHostname(inst.website);
    if (cleanDom && (cleanDom === instDom || cleanDom === instWebHost)) {
      return true;
    }
    if (cleanWebHost && isInstitutionalDomain(cleanWebHost) && (cleanWebHost === instDom || cleanWebHost === instWebHost)) {
      return true;
    }
    return false;
  });
}

export async function GET(request: NextRequest) {
  const store = loadHallStore();
  const scope = request.nextUrl.searchParams.get('scope') || 'public';
  const profile = CAPACITY_PROFILES[store.activePhase];
  const globalCounts = getActiveGlobalCounts(store);
  const institutions = buildUnifiedInstitutions(store);

  // Dropdown options: the 3 baseline partner institutions + any custom institutions explicitly verified by Admin
  const selectablePartnerInstitutions = institutions.filter(
    (inst) => !inst.isCustomInstitution || inst.verificationStatus === 'verified'
  );

  if (scope === 'public') {
    return NextResponse.json(
      {
        ok: true,
        activePhase: store.activePhase,
        capacityProfile: profile,
        hostingChargeUsd: 0,
        institutions: institutions.map((inst) => ({
          institutionId: inst.institutionId,
          name: inst.name,
          shortName: inst.shortName,
          category: inst.category,
          isCustomInstitution: inst.isCustomInstitution,
          country: inst.country,
          cityRegion: inst.cityRegion,
          domain: inst.domain,
          website: inst.website,
          contactName: inst.contactName,
          verificationStatus: inst.verificationStatus,
          verifiedAt: inst.verifiedAt,
          verificationNotes: inst.verificationNotes,
          bio: inst.bio,
          applicationsCount: inst.applicationsCount,
          latestConferenceTitle: inst.latestConferenceTitle,
          allocatedDelegates: inst.allocatedDelegates,
          allocatedSpeakers: inst.allocatedSpeakers,
          allocatedTracks: inst.allocatedTracks,
        })),
        selectablePartnerInstitutions: selectablePartnerInstitutions.map((inst) => ({
          id: inst.institutionId,
          name: inst.name,
          category: inst.category,
          domain: inst.domain,
          website: inst.website,
          country: inst.country,
          cityRegion: inst.cityRegion,
          contactName: inst.contactName,
          contactTitle: inst.contactTitle,
          contactEmail: inst.contactEmail,
          verificationStatus: inst.verificationStatus,
        })),
        hostingRecords: store.hostingRecords.map((r) => ({
          id: r.id,
          institutionId: r.institutionId,
          institutionName: r.institutionName,
          institutionCategory: r.institutionCategory,
          isCustomInstitution: Boolean(r.isCustomInstitution),
          country: r.country,
          cityRegion: r.cityRegion,
          domain: r.domain,
          website: r.website,
          contactName: r.contactName,
          verificationStatus: r.verificationStatus,
          verifiedAt: r.verifiedAt,
          verificationNotes: r.verificationNotes,
          conferenceTitle: r.conferenceTitle,
          eventMode: r.eventMode,
          proposedStart: r.proposedStart,
          proposedEnd: r.proposedEnd,
          allocatedDelegates: r.allocatedDelegates,
          allocatedSpeakers: r.allocatedSpeakers,
          allocatedTracks: r.allocatedTracks,
          allocatedStorageBytes: r.allocatedStorageBytes,
          hostingChargeUsd: 0,
          lifecycleStage: r.lifecycleStage,
          applicationStatus: r.applicationStatus,
        })),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const adminCheck = await verifyAdminRequest(request);
  if (!adminCheck.authorized) {
    return NextResponse.json(
      { ok: false, code: 'ADMIN_AUTH_REQUIRED', error: 'Administrator authentication required.' },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      adminActor: adminCheck.actor,
      activePhase: store.activePhase,
      capacityProfiles: CAPACITY_PROFILES,
      globalCounts,
      roomAllocations: store.roomAllocations,
      institutions,
      hostingRecords: store.hostingRecords.map((r) => ({
        ...r,
        usedStorageBytes: getInstitutionUsedStorageBytes(store, r.institutionId),
      })),
      recordings: store.recordings.filter((r) => r.status !== 'deleted'),
      verifiedAttendanceCountByRoom: store.verifiedAttendanceCountByRoom,
      auditLog: store.auditLog.slice(0, 50),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || '');
  const store = loadHallStore();
  const profile = CAPACITY_PROFILES[store.activePhase];
  const existingInstitutions = buildUnifiedInstitutions(store);

  // 0. Server-Verified Admin Passcode Exchange -> Sets HttpOnly HMAC Cookie
  if (action === 'unlock_admin_passcode') {
    const { checkAuthRateLimit, verifyWebinarAdminPasscode } = await import('@/lib/seo/admin-session');
    const rate = checkAuthRateLimit(request, 'webinar-admin-login', 10, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many authentication attempts. Please retry later.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }
    const passcode = String(body.passcode || '').trim();
    const check = verifyWebinarAdminPasscode(passcode);
    if (!check.configured) {
      return NextResponse.json(
        { ok: false, error: 'Webinar Administrator Passcode (WEBINAR_ADMIN_PASSCODE / ADMIN_PASSCODE) is not configured on the server.' },
        { status: 503 }
      );
    }
    if (!check.valid) {
      return NextResponse.json(
        { ok: false, error: 'Invalid Administrator Passcode. Access denied.' },
        { status: 401 }
      );
    }
    const sessionToken = signAdminSessionToken('KEW Scientific Secretariat Admin');
    const res = NextResponse.json({
      ok: true,
      actor: 'KEW Scientific Secretariat Admin',
    });
    res.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 12 * 60 * 60,
    });
    return res;
  }

  if (action === 'lock_admin_session') {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(ADMIN_SESSION_COOKIE);
    return res;
  }

  // 1. Public Free Institutional Registration (Lifecycle Step 1 — $0 Hosting Charge)
  if (action === 'register_institution') {
    const institutionName = String(body.institutionName || '').trim().slice(0, 140);
    const country = String(body.country || '').trim().slice(0, 80);
    const cityRegion = String(body.cityRegion || body.city || '').trim().slice(0, 100);
    const website = normalizeWebsiteUrl(body.website || '');
    const contactName = String(body.contactName || '').trim().slice(0, 100);
    const contactEmail = String(body.contactEmail || '').trim().toLowerCase().slice(0, 120);

    const typeResult = resolveInstitutionType(body.category || 'University', body.customInstitutionType);
    if (typeResult.error) {
      return NextResponse.json({ ok: false, error: typeResult.error }, { status: 400 });
    }

    if (!institutionName || !country || !cityRegion || !contactName || !contactEmail || !contactEmail.includes('@')) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Full institution name, institution type, country, city/region, authorized representative, and valid institutional email are required.',
        },
        { status: 400 }
      );
    }

    const domain = deriveInstitutionDomain(website, contactEmail, body.domain);
    const duplicate = findMatchingInstitution(existingInstitutions, institutionName, domain, website);
    if (duplicate) {
      return NextResponse.json(
        {
          ok: false,
          code: 'DUPLICATE_INSTITUTION',
          error: `An institutional record for "${duplicate.name}" already exists in the KEW Verification Registry (status: ${duplicate.verificationStatus.replace(/_/g, ' ')}). Duplicate institutional records are not permitted.`,
        },
        { status: 409 }
      );
    }

    const instId = `inst-${Date.now().toString(36)}`;
    const record: InstitutionalHostingRecord = {
      id: `host-${Date.now().toString(36)}`,
      institutionId: instId,
      institutionName,
      institutionCategory: typeResult.resolvedCategory,
      institutionTypeSelection: typeResult.selection,
      customInstitutionType: typeResult.customType,
      isCustomInstitution: true,
      country,
      cityRegion,
      domain,
      website,
      contactName,
      contactTitle: String(body.contactTitle || 'Authorized Representative').slice(0, 100),
      contactEmail,
      verificationStatus: 'pending',
      conferenceTitle: 'Institutional Accreditation Dossier (Pending Event Proposal)',
      eventMode: 'institutional_event',
      proposedStart: new Date(Date.now() + 30 * 86400000).toISOString(),
      proposedEnd: new Date(Date.now() + 31 * 86400000).toISOString(),
      requestedDelegates: profile.maxConcurrentDelegates,
      requestedSpeakers: profile.maxInteractiveSpeakers,
      requestedTracks: profile.maxScientificTracks,
      allocatedDelegates: profile.maxConcurrentDelegates,
      allocatedSpeakers: profile.maxInteractiveSpeakers,
      allocatedTracks: profile.maxScientificTracks,
      allocatedStorageBytes: profile.institutionStorageQuotaBytes || ONE_GIB_BYTES,
      usedStorageBytes: 0,
      hostingChargeUsd: 0,
      scientificScope: String(
        body.bio || `${typeResult.resolvedCategory} based in ${cityRegion}, ${country}.`
      ).slice(0, 1200),
      fundingDisclosure: '100% Free KEW Collaborative Scientific Hosting ($0 platform fee).',
      lifecycleStage: '1_institution_registered',
      applicationStatus: 'pending_review',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.hostingRecords.unshift(record);
    appendHallAudit(store, {
      actor: contactName,
      actorRole: 'institutional_admin',
      roomId: 'institutional-registry',
      environmentMode: 'live',
      action: 'INSTITUTION_REGISTERED',
      details: `Registered ${institutionName} (${typeResult.resolvedCategory}, ${cityRegion}, ${country}) with Pending Verification status ($0 fee).`,
    });
    saveHallStore(store);

    return NextResponse.json({ ok: true, record });
  }

  // 2. Public Free Conference Hosting Proposal Submission (Supports Registered Partners + Custom Entry)
  if (action === 'submit_hosting_application') {
    const conferenceTitle = String(body.conferenceTitle || '').trim().slice(0, 180);
    const requestedDelegates = Math.max(1, Number(body.requestedDelegates || 10));
    const requestedSpeakers = Math.max(1, Number(body.requestedSpeakers || 2));
    const requestedTracks = Math.max(1, Number(body.requestedTracks || 1));

    if (!conferenceTitle) {
      return NextResponse.json({ ok: false, error: 'Proposed event title is required.' }, { status: 400 });
    }

    const isCustom =
      body.isCustomInstitution === true || String(body.institutionId || '') === '__other_custom__';

    const exceedsPhaseI =
      requestedDelegates > profile.maxConcurrentDelegates ||
      requestedSpeakers > profile.maxInteractiveSpeakers ||
      requestedTracks > profile.maxScientificTracks;

    if (isCustom) {
      const institutionName = String(body.institutionName || '').trim().slice(0, 140);
      const country = String(body.country || '').trim().slice(0, 80);
      const cityRegion = String(body.cityRegion || '').trim().slice(0, 100);
      const website = normalizeWebsiteUrl(body.website || '');
      const contactName = String(body.contactName || '').trim().slice(0, 100);
      const contactTitle = String(body.contactTitle || 'Authorized Representative').trim().slice(0, 100);
      const contactEmail = String(body.contactEmail || '').trim().toLowerCase().slice(0, 120);

      const typeResult = resolveInstitutionType(
        body.institutionTypeSelection || body.institutionCategory || '',
        body.customInstitutionType
      );
      if (typeResult.error) {
        return NextResponse.json({ ok: false, error: typeResult.error }, { status: 400 });
      }

      if (!institutionName) {
        return NextResponse.json({ ok: false, error: 'Full Institution Name is required.' }, { status: 400 });
      }
      if (!country) {
        return NextResponse.json({ ok: false, error: 'Country is required for new institutions.' }, { status: 400 });
      }
      if (!cityRegion) {
        return NextResponse.json({ ok: false, error: 'City / Region is required for new institutions.' }, { status: 400 });
      }
      if (!contactName) {
        return NextResponse.json(
          { ok: false, error: 'Authorized Representative is required for new institutions.' },
          { status: 400 }
        );
      }
      if (!contactEmail || !contactEmail.includes('@')) {
        return NextResponse.json(
          { ok: false, error: 'A valid Institutional Contact Email is required.' },
          { status: 400 }
        );
      }

      const domain = deriveInstitutionDomain(website, contactEmail, body.domain);
      const matchedInst = findMatchingInstitution(existingInstitutions, institutionName, domain, website);

      if (matchedInst) {
        // Block duplicate creation when institution is already in the partner dropdown
        if (!matchedInst.isCustomInstitution || matchedInst.verificationStatus === 'verified') {
          return NextResponse.json(
            {
              ok: false,
              code: 'DUPLICATE_PARTNER_INSTITUTION',
              error: `"${matchedInst.name}" is already registered in the Applying Partner Institution dropdown. Please select it directly from the dropdown to avoid duplicate institutional records.`,
            },
            { status: 409 }
          );
        }

        // If an earlier Stage-1 standalone accreditation placeholder exists for this custom institution,
        // attach this hosting proposal directly to that record so zero duplicate records are created.
        const placeholderIdx = store.hostingRecords.findIndex(
          (r) =>
            r.institutionId === matchedInst.institutionId &&
            r.conferenceTitle.startsWith('Institutional Accreditation Dossier')
        );

        if (placeholderIdx !== -1) {
          const target = store.hostingRecords[placeholderIdx];
          target.conferenceTitle = conferenceTitle;
          target.eventMode = (body.eventMode as EventModeId) || 'scientific_conference';
          target.proposedStart = String(body.proposedStart || '2027-06-15');
          target.proposedEnd = String(body.proposedEnd || '2027-06-16');
          target.requestedDelegates = requestedDelegates;
          target.requestedSpeakers = requestedSpeakers;
          target.requestedTracks = requestedTracks;
          target.allocatedDelegates = Math.min(requestedDelegates, profile.maxConcurrentDelegates);
          target.allocatedSpeakers = Math.min(requestedSpeakers, profile.maxInteractiveSpeakers);
          target.allocatedTracks = Math.min(requestedTracks, profile.maxScientificTracks);
          target.scientificScope = String(body.scientificScope || '').slice(0, 1500);
          target.fundingDisclosure = String(
            body.fundingDisclosure || 'Non-commercial academic hosting ($0 KEW fee).'
          ).slice(0, 500);
          target.lifecycleStage = '3_hosting_application_submitted';
          target.applicationStatus = 'pending_review';
          target.reviewNotes = exceedsPhaseI
            ? `New institution Pending Verification. Requested capacity (${requestedDelegates} delegates / ${requestedSpeakers} speakers) capped to ${profile.label} ceiling (${profile.maxConcurrentDelegates} delegates / ${profile.maxInteractiveSpeakers} speakers / ${profile.maxScientificTracks} track).`
            : `New institution Pending Verification. Within ${profile.label} operational ceiling ($0 platform hosting charge).`;
          target.updatedAt = new Date().toISOString();

          appendHallAudit(store, {
            actor: contactName,
            actorRole: 'institutional_admin',
            roomId: target.id,
            environmentMode: 'live',
            action: 'HOSTING_PROPOSAL_LINKED_TO_PENDING_INSTITUTION',
            details: `Linked hosting application "${conferenceTitle}" to existing pending institution ${target.institutionName} (${target.institutionId}).`,
          });
          saveHallStore(store);

          return NextResponse.json({
            ok: true,
            record: target,
            cappedToPhaseCeiling: exceedsPhaseI,
            activePhaseProfile: profile,
          });
        }

        // Otherwise prevent creating a duplicate unverified institutional entry
        return NextResponse.json(
          {
            ok: false,
            code: 'DUPLICATE_PENDING_INSTITUTION',
            error: `An institutional verification record for "${matchedInst.name}" already exists with status "${matchedInst.verificationStatus.replace(/_/g, ' ')}" (Ref: ${matchedInst.latestRecordId || matchedInst.institutionId}). Duplicate institutional records are prevented while verification is pending.`,
          },
          { status: 409 }
        );
      }

      const customInstId = `inst-custom-${Date.now().toString(36)}`;
      const record: InstitutionalHostingRecord = {
        id: `KEW-APP-${Date.now().toString(36).toUpperCase()}`,
        institutionId: customInstId,
        institutionName,
        institutionCategory: typeResult.resolvedCategory,
        institutionTypeSelection: typeResult.selection,
        customInstitutionType: typeResult.customType,
        isCustomInstitution: true,
        country,
        cityRegion,
        domain,
        website,
        contactName,
        contactTitle,
        contactEmail,
        verificationStatus: 'pending',
        conferenceTitle,
        eventMode: (body.eventMode as EventModeId) || 'scientific_conference',
        proposedStart: String(body.proposedStart || '2027-06-15'),
        proposedEnd: String(body.proposedEnd || '2027-06-16'),
        requestedDelegates,
        requestedSpeakers,
        requestedTracks,
        allocatedDelegates: Math.min(requestedDelegates, profile.maxConcurrentDelegates),
        allocatedSpeakers: Math.min(requestedSpeakers, profile.maxInteractiveSpeakers),
        allocatedTracks: Math.min(requestedTracks, profile.maxScientificTracks),
        allocatedStorageBytes: profile.institutionStorageQuotaBytes || ONE_GIB_BYTES,
        usedStorageBytes: 0,
        hostingChargeUsd: 0,
        scientificScope: String(body.scientificScope || '').slice(0, 1500),
        fundingDisclosure: String(
          body.fundingDisclosure || 'Non-commercial academic hosting ($0 KEW fee).'
        ).slice(0, 500),
        lifecycleStage: '3_hosting_application_submitted',
        applicationStatus: 'pending_review',
        reviewNotes: exceedsPhaseI
          ? `New institution Pending Verification — verification required before hosting authorization. Requested capacity (${requestedDelegates} delegates / ${requestedSpeakers} speakers / ${requestedTracks} tracks) auto-capped to active ${profile.label} ceiling (${profile.maxConcurrentDelegates} delegates / ${profile.maxInteractiveSpeakers} speakers / ${profile.maxScientificTracks} track).`
          : `New institution Pending Verification — institutional verification required before free event hosting can be authorized ($0 platform hosting charge).`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      store.hostingRecords.unshift(record);
      appendHallAudit(store, {
        actor: `${contactName} (${institutionName})`,
        actorRole: 'institutional_admin',
        roomId: record.id,
        environmentMode: 'live',
        action: 'CUSTOM_INSTITUTION_HOSTING_SUBMITTED',
        details: `Submitted custom institution "${institutionName}" (${typeResult.resolvedCategory}, ${cityRegion}, ${country}) with status=pending alongside event "${conferenceTitle}" ($0 fee).`,
      });
      saveHallStore(store);

      return NextResponse.json({
        ok: true,
        record,
        cappedToPhaseCeiling: exceedsPhaseI,
        activePhaseProfile: profile,
      });
    }

    // Existing partner institution selected from dropdown
    const institutionId = String(body.institutionId || 'inst-ku');
    const selectedPartner = existingInstitutions.find((i) => i.institutionId === institutionId);
    const institutionName =
      selectedPartner?.name || String(body.institutionName || 'Applying Institution').trim().slice(0, 140);

    // Prevent exact duplicate active event proposal for the same partner institution
    const duplicateEvent = store.hostingRecords.find(
      (r) =>
        r.institutionId === institutionId &&
        r.applicationStatus !== 'rejected' &&
        normalizeInstitutionKey(r.conferenceTitle) === normalizeInstitutionKey(conferenceTitle)
    );
    if (duplicateEvent) {
      return NextResponse.json(
        {
          ok: false,
          code: 'DUPLICATE_APPLICATION',
          error: `An active hosting proposal titled "${conferenceTitle}" already exists for ${institutionName} (${duplicateEvent.id}).`,
        },
        { status: 409 }
      );
    }

    const partnerStatus: InstitutionalVerificationStatus =
      selectedPartner?.verificationStatus || 'under_review';

    const record: InstitutionalHostingRecord = {
      id: `KEW-APP-${Date.now().toString(36).toUpperCase()}`,
      institutionId,
      institutionName,
      institutionCategory: selectedPartner?.category || String(body.institutionCategory || 'University'),
      isCustomInstitution: Boolean(selectedPartner?.isCustomInstitution),
      country: selectedPartner?.country || String(body.country || 'India'),
      cityRegion: selectedPartner?.cityRegion || String(body.cityRegion || 'Srinagar'),
      domain: selectedPartner?.domain || String(body.domain || 'verified-partner.org'),
      website: selectedPartner?.website || String(body.website || ''),
      contactName: selectedPartner?.contactName || String(body.contactName || 'Institutional Liaison'),
      contactTitle: selectedPartner?.contactTitle || String(body.contactTitle || 'Program Chair'),
      contactEmail: selectedPartner?.contactEmail || String(body.contactEmail || 'liaison@institution.org'),
      verificationStatus: partnerStatus,
      verifiedAt: selectedPartner?.verifiedAt,
      conferenceTitle,
      eventMode: (body.eventMode as EventModeId) || 'scientific_conference',
      proposedStart: String(body.proposedStart || '2027-06-15'),
      proposedEnd: String(body.proposedEnd || '2027-06-16'),
      requestedDelegates,
      requestedSpeakers,
      requestedTracks,
      allocatedDelegates: Math.min(requestedDelegates, profile.maxConcurrentDelegates),
      allocatedSpeakers: Math.min(requestedSpeakers, profile.maxInteractiveSpeakers),
      allocatedTracks: Math.min(requestedTracks, profile.maxScientificTracks),
      allocatedStorageBytes: profile.institutionStorageQuotaBytes || ONE_GIB_BYTES,
      usedStorageBytes: 0,
      hostingChargeUsd: 0,
      scientificScope: String(body.scientificScope || '').slice(0, 1500),
      fundingDisclosure: String(
        body.fundingDisclosure || 'Non-commercial academic hosting ($0 KEW fee).'
      ).slice(0, 500),
      lifecycleStage: '3_hosting_application_submitted',
      applicationStatus: 'pending_review',
      reviewNotes: exceedsPhaseI
        ? `Requested capacity (${requestedDelegates} delegates / ${requestedSpeakers} speakers / ${requestedTracks} tracks) auto-capped to active ${profile.label} ceiling (${profile.maxConcurrentDelegates} delegates / ${profile.maxInteractiveSpeakers} speakers / ${profile.maxScientificTracks} track) pending Admin review.`
        : `Within ${profile.label} operational ceiling ($0 platform hosting charge).`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.hostingRecords.unshift(record);
    appendHallAudit(store, {
      actor: institutionName,
      actorRole: 'institutional_admin',
      roomId: record.id,
      environmentMode: 'live',
      action: 'HOSTING_PROPOSAL_SUBMITTED',
      details: `${institutionName} submitted "${conferenceTitle}" ($0 hosting fee; allocated ${record.allocatedDelegates} delegates, ${record.allocatedSpeakers} speakers).`,
    });
    saveHallStore(store);

    return NextResponse.json({
      ok: true,
      record,
      cappedToPhaseCeiling: exceedsPhaseI,
      activePhaseProfile: profile,
    });
  }

  // All remaining actions strictly require Platform Administrator authorization
  const adminCheck = await verifyAdminRequest(request);
  if (!adminCheck.authorized) {
    return NextResponse.json(
      { ok: false, code: 'FORBIDDEN', error: 'Platform Administrator authorization required.' },
      { status: 403 }
    );
  }

  // 3. Mint Real HMAC-SHA256 Room Token
  if (action === 'mint_room_token') {
    const roomId = String(body.roomId || 'kew-conf-2027-cryo');
    const role = (ROLE_PERMISSIONS[body.role as HallRole] ? body.role : 'speaker') as HallRole;
    const displayName = String(body.displayName || `Authorized ${ROLE_PERMISSIONS[role].label}`).slice(0, 64);
    const affiliation = String(body.affiliation || 'KEW Accredited Faculty').slice(0, 80);
    const environmentMode: EnvironmentMode = body.environmentMode === 'live' ? 'live' : 'demo';
    const ttlSeconds = Math.max(300, Math.min(86400, Number(body.ttlSeconds || 3600)));

    const peerId = `auth_${role}_${Date.now().toString(36)}`;
    const token = mintHallAccessToken(
      {
        roomId,
        peerId,
        displayName,
        affiliation,
        role,
        institutionId: String(body.institutionId || 'inst-ku'),
        environmentMode,
      },
      ttlSeconds
    );

    appendHallAudit(store, {
      actor: adminCheck.actor,
      actorRole: 'platform_admin',
      roomId,
      environmentMode,
      action: 'HMAC_ROOM_TOKEN_MINTED',
      details: `Minted ${ttlSeconds}s signed ${role} token for "${displayName}" in ${roomId} (${environmentMode}).`,
    });
    saveHallStore(store);

    return NextResponse.json({
      ok: true,
      token,
      roomId,
      role,
      environmentMode,
      ttlSeconds,
    });
  }

  // 4A. Update Institutional Verification Status (Review / Verify / Request Documentation / Reject)
  if (action === 'update_institution_status') {
    const institutionId = String(body.institutionId || '');
    const nextVerification = String(body.verificationStatus || '') as InstitutionalVerificationStatus;
    const notes = typeof body.verificationNotes === 'string' ? body.verificationNotes.trim().slice(0, 600) : undefined;

    const validStatuses: InstitutionalVerificationStatus[] = [
      'pending',
      'under_review',
      'documentation_requested',
      'verified',
      'rejected',
      'suspended',
    ];
    if (!institutionId || !validStatuses.includes(nextVerification)) {
      return NextResponse.json({ ok: false, error: 'Valid institutionId and verificationStatus are required.' }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);
    if (!store.institutionStatusOverrides) {
      store.institutionStatusOverrides = {};
    }
    store.institutionStatusOverrides[institutionId] = {
      verificationStatus: nextVerification,
      verifiedAt: nextVerification === 'verified' ? today : undefined,
      verificationNotes: notes,
    };

    let matchedName = institutionId;
    const seedMatch = VERIFIED_INSTITUTIONS.find((s) => s.id === institutionId);
    if (seedMatch) matchedName = seedMatch.name;

    for (const rec of store.hostingRecords) {
      if (rec.institutionId === institutionId) {
        matchedName = rec.institutionName;
        rec.verificationStatus = nextVerification;
        if (nextVerification === 'verified') {
          rec.verifiedAt = today;
          if (rec.lifecycleStage === '1_institution_registered') {
            rec.lifecycleStage = '2_institution_verified';
          }
        } else if (nextVerification === 'documentation_requested') {
          if (rec.applicationStatus === 'pending_review' || rec.applicationStatus === 'under_evaluation') {
            rec.applicationStatus = 'revisions_requested';
          }
        } else if (nextVerification === 'rejected') {
          rec.applicationStatus = 'rejected';
        }
        if (notes !== undefined) {
          rec.verificationNotes = notes;
          rec.reviewNotes = notes;
        }
        rec.updatedAt = new Date().toISOString();
      }
    }

    appendHallAudit(store, {
      actor: adminCheck.actor,
      actorRole: 'platform_admin',
      roomId: institutionId,
      environmentMode: 'live',
      action: 'INSTITUTION_VERIFICATION_UPDATED',
      details: `Set ${matchedName} (${institutionId}) verificationStatus=${nextVerification}${notes ? ` — Note: ${notes}` : ''}.`,
    });
    saveHallStore(store);

    return NextResponse.json({
      ok: true,
      institutions: buildUnifiedInstitutions(store),
    });
  }

  // 4B. Update Institutional Hosting Record / Verify / Allocate Resources / Advance Lifecycle
  if (action === 'update_hosting_record') {
    const recordId = String(body.recordId || '');
    const record = store.hostingRecords.find((r) => r.id === recordId);
    if (!record) return NextResponse.json({ ok: false, error: 'Hosting record not found.' }, { status: 404 });

    const effectiveVerification: InstitutionalVerificationStatus =
      (body.verificationStatus as InstitutionalVerificationStatus) || record.verificationStatus;

    // Enforce verification before authorizing free event hosting
    if (body.applicationStatus === 'approved' && effectiveVerification !== 'verified') {
      return NextResponse.json(
        {
          ok: false,
          code: 'INSTITUTION_VERIFICATION_REQUIRED',
          error: `Cannot authorize event hosting while "${record.institutionName}" has status "${record.verificationStatus.replace(/_/g, ' ')}". Verify the institution first (or select Verify & Approve).`,
        },
        { status: 400 }
      );
    }

    if (body.verificationStatus) {
      const today = new Date().toISOString().slice(0, 10);
      record.verificationStatus = body.verificationStatus;
      if (body.verificationStatus === 'verified') {
        record.verifiedAt = today;
      }
      if (!store.institutionStatusOverrides) {
        store.institutionStatusOverrides = {};
      }
      store.institutionStatusOverrides[record.institutionId] = {
        verificationStatus: record.verificationStatus,
        verifiedAt: record.verifiedAt,
        verificationNotes: typeof body.verificationNotes === 'string' ? body.verificationNotes.slice(0, 600) : record.verificationNotes,
      };
      // Sync institutional verification across any sibling proposals for the same institution
      for (const other of store.hostingRecords) {
        if (other.institutionId === record.institutionId) {
          other.verificationStatus = record.verificationStatus;
          if (record.verifiedAt) other.verifiedAt = record.verifiedAt;
        }
      }
    }

    if (body.applicationStatus) {
      record.applicationStatus = body.applicationStatus;
    }
    if (body.lifecycleStage) {
      record.lifecycleStage = body.lifecycleStage as InstitutionalLifecycleStage;
    }

    // Enforce active phase ceiling to prevent accidental overbooking
    if (typeof body.allocatedDelegates === 'number') {
      record.allocatedDelegates = Math.max(1, Math.min(profile.maxConcurrentDelegates, body.allocatedDelegates));
    }
    if (typeof body.allocatedSpeakers === 'number') {
      record.allocatedSpeakers = Math.max(1, Math.min(profile.maxInteractiveSpeakers, body.allocatedSpeakers));
    }
    if (typeof body.allocatedTracks === 'number') {
      record.allocatedTracks = Math.max(1, Math.min(profile.maxScientificTracks, body.allocatedTracks));
    }
    if (typeof body.reviewNotes === 'string') {
      record.reviewNotes = body.reviewNotes.slice(0, 600);
    }
    if (typeof body.verificationNotes === 'string') {
      record.verificationNotes = body.verificationNotes.slice(0, 600);
    }

    // Detect concurrent event date overlap when approving
    if (record.applicationStatus === 'approved') {
      const overlappingApproved = store.hostingRecords.filter(
        (other) =>
          other.id !== record.id &&
          other.applicationStatus === 'approved' &&
          other.proposedStart <= record.proposedEnd &&
          other.proposedEnd >= record.proposedStart
      );
      if (overlappingApproved.length >= profile.maxConcurrentEvents) {
        return NextResponse.json(
          {
            ok: false,
            code: 'OVERBOOKING_CONFLICT',
            error: `Overbooking blocked: ${profile.label} allows max ${profile.maxConcurrentEvents} concurrent event(s), and "${overlappingApproved[0].conferenceTitle}" overlaps these dates.`,
          },
          { status: 409 }
        );
      }
      if (!record.roomId) {
        record.roomId = `inst-hall-${record.id.toLowerCase()}`;
      }
      const roomAlloc = getOrInitRoomAllocation(store, record.roomId);
      roomAlloc.institutionId = record.institutionId;
      roomAlloc.maxConcurrentDelegates = record.allocatedDelegates;
      roomAlloc.maxInteractiveSpeakers = record.allocatedSpeakers;
      roomAlloc.maxScientificTracks = record.allocatedTracks;
      roomAlloc.eventMode = record.eventMode;
    }

    record.updatedAt = new Date().toISOString();
    appendHallAudit(store, {
      actor: adminCheck.actor,
      actorRole: 'platform_admin',
      roomId: record.roomId || record.id,
      environmentMode: 'live',
      action: 'HOSTING_RECORD_UPDATED',
      details: `Updated ${record.institutionName} ("${record.conferenceTitle}") -> verification=${record.verificationStatus}, status=${record.applicationStatus}, stage=${record.lifecycleStage}.`,
    });
    saveHallStore(store);

    return NextResponse.json({ ok: true, record });
  }

  // 5. Per-Room Allocation & Emergency Suspension Controls
  if (action === 'update_room_allocation') {
    const roomId = String(body.roomId || 'kew-conf-2027-cryo');
    const alloc = getOrInitRoomAllocation(store, roomId);

    if (typeof body.maxConcurrentDelegates === 'number') {
      alloc.maxConcurrentDelegates = Math.max(1, Math.min(profile.maxConcurrentDelegates, body.maxConcurrentDelegates));
    }
    if (typeof body.maxInteractiveSpeakers === 'number') {
      alloc.maxInteractiveSpeakers = Math.max(1, Math.min(profile.maxInteractiveSpeakers, body.maxInteractiveSpeakers));
    }
    if (typeof body.recordingAllowed === 'boolean') {
      alloc.recordingAllowed = body.recordingAllowed;
    }
    if (typeof body.waitingRoomEnabled === 'boolean') {
      alloc.waitingRoomEnabled = body.waitingRoomEnabled;
    }
    if (typeof body.isSuspendedByAdmin === 'boolean') {
      alloc.isSuspendedByAdmin = body.isSuspendedByAdmin;
    }
    if (body.environmentMode === 'demo' || body.environmentMode === 'live') {
      alloc.environmentMode = body.environmentMode;
    }

    appendHallAudit(store, {
      actor: adminCheck.actor,
      actorRole: 'platform_admin',
      roomId,
      environmentMode: alloc.environmentMode,
      action: alloc.isSuspendedByAdmin ? 'EMERGENCY_ROOM_SUSPENSION' : 'ROOM_ALLOCATION_UPDATED',
      details: `Room ${roomId}: delegates=${alloc.maxConcurrentDelegates}, speakers=${alloc.maxInteractiveSpeakers}, suspended=${alloc.isSuspendedByAdmin}, env=${alloc.environmentMode}.`,
    });
    saveHallStore(store);

    return NextResponse.json({ ok: true, allocation: alloc });
  }

  // 6. Controlled Capacity Phase Selection (Phase I verified by default; Phase II–IV gated by benchmark confirmation)
  if (action === 'set_capacity_phase') {
    const nextPhase = String(body.phase || 'PHASE_I') as CapacityPhaseId;
    if (!CAPACITY_PROFILES[nextPhase]) {
      return NextResponse.json({ ok: false, error: 'Invalid capacity phase.' }, { status: 400 });
    }
    if (nextPhase !== 'PHASE_I' && body.benchmarkVerifiedConfirmation !== true) {
      return NextResponse.json(
        {
          ok: false,
          code: 'BENCHMARK_CONFIRMATION_REQUIRED',
          error: `${CAPACITY_PROFILES[nextPhase].label} requires explicit SFU/load-test verification confirmation before activation.`,
        },
        { status: 400 }
      );
    }

    store.activePhase = nextPhase;
    const nextProfile = CAPACITY_PROFILES[nextPhase];
    for (const alloc of Object.values(store.roomAllocations)) {
      alloc.maxConcurrentDelegates = Math.min(alloc.maxConcurrentDelegates, nextProfile.maxConcurrentDelegates);
      alloc.maxInteractiveSpeakers = Math.min(alloc.maxInteractiveSpeakers, nextProfile.maxInteractiveSpeakers);
      alloc.maxScientificTracks = Math.min(alloc.maxScientificTracks, nextProfile.maxScientificTracks);
    }

    appendHallAudit(store, {
      actor: adminCheck.actor,
      actorRole: 'platform_admin',
      roomId: 'global-capacity',
      environmentMode: 'live',
      action: 'CAPACITY_PHASE_UPDATED',
      details: `Active capacity phase set to ${nextPhase} (${nextProfile.maxConcurrentDelegates} delegates, ${nextProfile.maxInteractiveSpeakers} speakers).`,
    });
    saveHallStore(store);

    return NextResponse.json({ ok: true, activePhase: store.activePhase, capacityProfile: nextProfile });
  }

  return NextResponse.json({ ok: false, error: `Unsupported admin action: ${action}` }, { status: 400 });
}
