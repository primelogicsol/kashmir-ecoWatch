import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialInquiryFormClient } from '@/components/himalayan-dispatch/EditorialInquiryFormClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact the Editorial Desk — Himalayan Dispatch',
  description:
    'Correspondence directory for the Himalayan Dispatch Editorial Headquarters in Fairfax, Virginia, commissioning desks, regional bureaus, and reader relations.',
  canonicalPath: '/himalayan-dispatch/contact',
});

export default function HimalayanDispatchContactPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs items={[{ label: 'Contact the Editorial Desk' }]} />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">CORRESPONDENCE &amp; DESK ROUTING</p>
            <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
              Contact the Editorial Desk
            </h1>
            <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Direct general editorial letters, institutional inquiries, academic symposium
              invitations, and reader feedback to our Fairfax, Virginia publishing desk—or route
              specialized submissions through our dedicated desks below.
            </p>
          </div>

          <aside
            className="lg:col-span-5 p-6 sm:p-8 border space-y-2.5"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <p className="hd-kicker">EDITORIAL HEADQUARTERS &amp; PUBLISHING OFFICE</p>
            <p className="hd-font-display text-2xl font-semibold">
              Fairfax, Virginia · United States of America
            </p>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Greater Washington Metropolitan Area (Fairfax, VA 22031)
              <br />
              Institutional Platform Email: contact@kashmir-ecowatch.com
            </p>
          </aside>
        </header>

        {/* Specialized Desk Routing */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Story Pitches & Secure Tips', href: HD_ROUTES.pitch, desc: 'Commissioning & Pitch Desk' },
            { label: 'Correspondent Applications', href: HD_ROUTES.correspondentApplications, desc: 'Regional & District Reporting' },
            { label: 'Corrections & Factual Errors', href: HD_ROUTES.corrections, desc: 'Office of Editorial Standards' },
            { label: 'Rights & Permissions', href: HD_ROUTES.rightsPermissions, desc: 'Syndication & Translations' },
          ].map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="p-5 border block hover:opacity-85 space-y-1.5"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-kicker text-[10px] block">{d.desc}</span>
              <span className="hd-font-display text-2xl font-semibold block">{d.label} →</span>
            </Link>
          ))}
        </section>

        <EditorialInquiryFormClient
          category="general_editorial_contact"
          kicker="LETTERS & GENERAL CORRESPONDENCE"
          heading="Write to the Editors"
          description="Letters to the Editor selected for future publication are verified with the sender prior to printing."
          submitLabel="Send Correspondence"
        />
      </div>
    </div>
  );
}
