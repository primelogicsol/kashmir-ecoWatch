// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH NEWSROOM (HDN) — CENTRALIZED CANONICAL ROUTE REGISTRY
// Every major newsroom function has its own independent authenticated page.
// Hostname-aware:
//   - On localhost (`localhost:3002`): preserves `/himalayan-dispatch/newsroom/**`
//   - On production subdomain (`dispatch.kashmir-ecowatch.com`): serves `/newsroom/**`
// ─────────────────────────────────────────────────────────────────────────────

import type { HdnPermissionKey } from '@/types/hdn-newsroom';
import { hdRoute } from '@/lib/himalayan-dispatch-routes';

export const HDN_BASE = '/newsroom' as const;

export const HDN_ROUTES = {
  // 1. Reporter / Journalist Workspace
  get dashboard() {
    return hdRoute('/newsroom');
  },
  get assignments() {
    return hdRoute('/newsroom/assignments');
  },
  assignmentDetail: (id: string) => hdRoute(`/newsroom/assignments/${encodeURIComponent(id)}`),
  get stories() {
    return hdRoute('/newsroom/stories');
  },
  get newStory() {
    return hdRoute('/newsroom/stories/new');
  },
  editStory: (id: string) => hdRoute(`/newsroom/stories/${encodeURIComponent(id)}/edit`),
  previewStory: (id: string) => hdRoute(`/newsroom/stories/${encodeURIComponent(id)}/preview`),
  get pitches() {
    return hdRoute('/newsroom/pitches');
  },
  get research() {
    return hdRoute('/newsroom/research');
  },
  get sources() {
    return hdRoute('/newsroom/sources');
  },
  get media() {
    return hdRoute('/newsroom/media');
  },
  get calendar() {
    return hdRoute('/newsroom/calendar');
  },
  get messages() {
    return hdRoute('/newsroom/messages');
  },
  get portfolio() {
    return hdRoute('/newsroom/portfolio');
  },
  get settings() {
    return hdRoute('/newsroom/settings');
  },

  // 2. Editorial Workspace (Editors, Bureau Chiefs, Department Editors, Fact-Checkers, Copy & Visual Editors)
  get editorial() {
    return hdRoute('/newsroom/editorial');
  },
  get editorialCommissioning() {
    return hdRoute('/newsroom/editorial/commissioning');
  },
  get editorialAssignments() {
    return hdRoute('/newsroom/editorial/assignments');
  },
  get editorialQueue() {
    return hdRoute('/newsroom/editorial/queue');
  },
  get editorialWorkflow() {
    return hdRoute('/newsroom/editorial/workflow');
  },
  get editorialVerification() {
    return hdRoute('/newsroom/editorial/verification');
  },
  get editorialCopyEditing() {
    return hdRoute('/newsroom/editorial/copy-editing');
  },
  get editorialVisualProduction() {
    return hdRoute('/newsroom/editorial/visual-production');
  },
  get editorialDailyDispatch() {
    return hdRoute('/newsroom/editorial/daily-dispatch');
  },
  get editorialEditions() {
    return hdRoute('/newsroom/editorial/editions');
  },
  get editorialSchedule() {
    return hdRoute('/newsroom/editorial/schedule');
  },
  get editorialCorrections() {
    return hdRoute('/newsroom/editorial/corrections');
  },
  get editorialBureaus() {
    return hdRoute('/newsroom/editorial/bureaus');
  },
  editorialBureauDesk: (slug: string) => hdRoute(`/newsroom/editorial/bureaus/${slug}`),
  get editorialDepartments() {
    return hdRoute('/newsroom/editorial/departments');
  },
  editorialDepartmentDesk: (slug: string) => hdRoute(`/newsroom/editorial/departments/${slug}`),

  // 3. Scientific Review Workspace
  get review() {
    return hdRoute('/newsroom/review');
  },
  get reviewAssignments() {
    return hdRoute('/newsroom/review/assignments');
  },
  reviewDetail: (id: string) => hdRoute(`/newsroom/review/${encodeURIComponent(id)}`),
  get reviewHistory() {
    return hdRoute('/newsroom/review/history');
  },
  get reviewReferences() {
    return hdRoute('/newsroom/review/references');
  },

  // 4. Administrator Command Center
  get admin() {
    return hdRoute('/newsroom/admin');
  },
  get adminAutonomousEngine() {
    return hdRoute('/newsroom/admin/autonomous-engine');
  },
  get adminJournalists() {
    return hdRoute('/newsroom/admin/journalists');
  },
  get adminApplications() {
    return hdRoute('/newsroom/admin/applications');
  },
  get adminAppointments() {
    return hdRoute('/newsroom/admin/appointments');
  },
  get adminBureaus() {
    return hdRoute('/newsroom/admin/bureaus');
  },
  get adminDepartments() {
    return hdRoute('/newsroom/admin/departments');
  },
  get adminPermissions() {
    return hdRoute('/newsroom/admin/permissions');
  },
  get adminSources() {
    return hdRoute('/newsroom/admin/sources');
  },
  get adminPublications() {
    return hdRoute('/newsroom/admin/publications');
  },
  get adminSyndication() {
    return hdRoute('/newsroom/admin/syndication');
  },
  get adminAnalytics() {
    return hdRoute('/newsroom/admin/analytics');
  },
  get adminResources() {
    return hdRoute('/newsroom/admin/resources');
  },
  get adminAudit() {
    return hdRoute('/newsroom/admin/audit');
  },
  get adminTrash() {
    return hdRoute('/newsroom/admin/trash');
  },
};

export interface HdnNavGroup {
  id: 'journalist' | 'editorial' | 'review' | 'admin';
  label: string;
  requiredPermission: HdnPermissionKey;
  items: Array<{
    label: string;
    readonly href: string;
    exact?: boolean;
    requiredPermission?: HdnPermissionKey;
  }>;
}

export const HDN_NAVIGATION_GROUPS: HdnNavGroup[] = [
  {
    id: 'journalist',
    label: 'Journalist Workspace',
    requiredPermission: 'workspace:journalist',
    items: [
      { label: 'My Newsroom', get href() { return HDN_ROUTES.dashboard; }, exact: true },
      { label: 'My Assignments', get href() { return HDN_ROUTES.assignments; } },
      { label: 'My Stories', get href() { return HDN_ROUTES.stories; } },
      { label: 'New Story', get href() { return HDN_ROUTES.newStory; }, exact: true },
      { label: 'Story Pitches', get href() { return HDN_ROUTES.pitches; } },
      { label: 'Research & Baseline Lab', get href() { return HDN_ROUTES.research; } },
      { label: 'Sources & Interviews', get href() { return HDN_ROUTES.sources; } },
      { label: 'Media Library', get href() { return HDN_ROUTES.media; } },
      { label: 'Calendar & Deadlines', get href() { return HDN_ROUTES.calendar; } },
      { label: 'Editorial Messages', get href() { return HDN_ROUTES.messages; } },
      { label: 'My Portfolio', get href() { return HDN_ROUTES.portfolio; } },
      { label: 'Settings & Charter', get href() { return HDN_ROUTES.settings; } },
    ],
  },
  {
    id: 'editorial',
    label: 'Editorial CMS & Desks',
    requiredPermission: 'workspace:editorial',
    items: [
      { label: 'Editorial Overview', get href() { return HDN_ROUTES.editorial; }, exact: true },
      { label: 'Commissioning Desk', get href() { return HDN_ROUTES.editorialCommissioning; } },
      { label: 'Assignment Manager', get href() { return HDN_ROUTES.editorialAssignments; } },
      { label: 'Editorial Queue', get href() { return HDN_ROUTES.editorialQueue; } },
      { label: 'Workflow Board', get href() { return HDN_ROUTES.editorialWorkflow; } },
      { label: 'Regional Bureaus (6)', get href() { return HDN_ROUTES.editorialBureaus; } },
      { label: 'Departments (7)', get href() { return HDN_ROUTES.editorialDepartments; } },
      { label: 'Fact-Checking', get href() { return HDN_ROUTES.editorialVerification; } },
      { label: 'Copy Editing', get href() { return HDN_ROUTES.editorialCopyEditing; } },
      { label: 'Visual Production', get href() { return HDN_ROUTES.editorialVisualProduction; } },
      { label: 'Daily Dispatch Desk', get href() { return HDN_ROUTES.editorialDailyDispatch; } },
      { label: 'Monthly Editions', get href() { return HDN_ROUTES.editorialEditions; } },
      { label: 'Publication Schedule', get href() { return HDN_ROUTES.editorialSchedule; } },
      { label: 'Corrections & Ethics', get href() { return HDN_ROUTES.editorialCorrections; } },
    ],
  },
  {
    id: 'review',
    label: 'Scientific Review',
    requiredPermission: 'workspace:review',
    items: [
      { label: 'Review Dashboard', get href() { return HDN_ROUTES.review; }, exact: true },
      { label: 'Assigned Manuscripts', get href() { return HDN_ROUTES.reviewAssignments; } },
      { label: 'Review History', get href() { return HDN_ROUTES.reviewHistory; } },
      { label: 'KEW References', get href() { return HDN_ROUTES.reviewReferences; } },
    ],
  },
  {
    id: 'admin',
    label: 'Admin Command Center',
    requiredPermission: 'workspace:admin',
    items: [
      { label: 'Command Center', get href() { return HDN_ROUTES.admin; }, exact: true },
      { label: 'Autonomous AI Engine', get href() { return HDN_ROUTES.adminAutonomousEngine; } },
      { label: 'Journalist Registry', get href() { return HDN_ROUTES.adminJournalists; } },
      { label: 'Applications Queue', get href() { return HDN_ROUTES.adminApplications; } },
      { label: 'Masthead Appointments', get href() { return HDN_ROUTES.adminAppointments; } },
      { label: 'Bureau Governance', get href() { return HDN_ROUTES.adminBureaus; } },
      { label: 'Department Governance', get href() { return HDN_ROUTES.adminDepartments; } },
      { label: 'Roles & Permissions', get href() { return HDN_ROUTES.adminPermissions; } },
      { label: 'Global Source Vault', get href() { return HDN_ROUTES.adminSources; } },
      { label: 'Publication Control', get href() { return HDN_ROUTES.adminPublications; } },
      { label: 'RSS & Syndication', get href() { return HDN_ROUTES.adminSyndication; } },
      { label: 'Measured Analytics', get href() { return HDN_ROUTES.adminAnalytics; } },
      { label: 'AI Costs & Resources', get href() { return HDN_ROUTES.adminResources; } },
      { label: 'Security & Audit Logs', get href() { return HDN_ROUTES.adminAudit; } },
      { label: 'Recoverable Trash', get href() { return HDN_ROUTES.adminTrash; } },
    ],
  },
];
