'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { resolveCanonicalStoryUrl } from '@/lib/himalayan-dispatch-routes';
import {
  EditorialDepartment,
  EditorialDepartmentId,
  MagazineStory,
} from '@/types/himalayan-dispatch';

export function DepartmentsExplorerClient({
  departments,
  stories,
}: {
  departments: EditorialDepartment[];
  stories: MagazineStory[];
}) {
  const [selectedDept, setSelectedDept] = useState<EditorialDepartmentId | 'interviews-editorials' | 'all'>('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('dept');
    if (q === 'interviews-editorials') {
      setSelectedDept('interviews-editorials');
    } else if (q && departments.some((d) => d.id === q)) {
      setSelectedDept(q as EditorialDepartmentId);
    } else {
      setSelectedDept('all');
    }
  }, [departments]);

  const visibleDepartments =
    selectedDept === 'all'
      ? departments
      : selectedDept === 'interviews-editorials'
      ? departments.filter((d) => d.id === 'interviews' || d.id === 'editorials')
      : departments.filter((d) => d.id === selectedDept);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto space-y-14">
        {/* Header */}
        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">EIGHT EDITORIAL ROOMS</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Editorial Departments &amp; Literary Forms
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            From multi-chapter cover inquiries and field notebooks to monochrome darkroom portfolios,
            investigative dossiers, and bespoke print-inspired data essays.
          </p>
        </header>

        {/* Minimal Typographic Rubric Filter Bar */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 border-t border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
          role="tablist"
          aria-label="Filter by editorial department"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedDept === 'all'}
            onClick={() => setSelectedDept('all')}
            className="hd-font-sans text-[11px] font-semibold tracking-[0.2em] uppercase cursor-pointer py-1"
            style={{
              color: selectedDept === 'all' ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
              borderBottom: selectedDept === 'all' ? '2px solid var(--hd-copper)' : 'none',
            }}
          >
            All Departments ({stories.length})
          </button>

          {departments.map((dept) => {
            const active = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedDept(dept.id)}
                className="hd-font-sans text-[11px] font-medium tracking-[0.18em] uppercase cursor-pointer py-1 transition-colors"
                style={{
                  color: active ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                  borderBottom: active ? '2px solid var(--hd-copper)' : 'none',
                }}
              >
                {dept.name}
              </button>
            );
          })}
        </div>

        {/* Departmental Spreads */}
        <div className="space-y-20">
          {visibleDepartments.map((dept) => {
            const deptStories = stories.filter((s) => s.departmentId === dept.id);
            return (
              <section
                key={dept.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                {/* Left 4 Cols: Department Charter */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="hd-kicker">DEPARTMENT {dept.folioNumber}</span>
                  <h2
                    className="hd-font-display text-3xl sm:text-4xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {dept.name}
                  </h2>
                  <p
                    className="hd-font-display text-lg italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {dept.tagline}
                  </p>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  >
                    {dept.editorialMandate}
                  </p>
                </div>

                {/* Right 8 Cols: Published Stories in Department */}
                <div
                  className="lg:col-span-8 lg:border-l lg:pl-12 divide-y"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  {deptStories.map((st) => (
                    <article
                      key={st.id}
                      className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <Link
                        href={resolveCanonicalStoryUrl(st)}
                        className="sm:col-span-4 hd-plate-group block"
                      >
                        <div className="hd-plate-frame aspect-[16/10] w-full">
                          <img
                            src={st.heroImage}
                            alt={st.heroCaption}
                            className={`w-full h-full object-cover ${
                              st.heroMonochrome ? 'grayscale contrast-125' : ''
                            }`}
                          />
                        </div>
                      </Link>

                      <div className="sm:col-span-8 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="hd-folio-meta">{st.editionLabel}</span>
                          <span className="hd-folio-meta">{st.readingTimeMinutes} MIN</span>
                        </div>
                        <Link
                          href={resolveCanonicalStoryUrl(st)}
                          className="block group"
                        >
                          <h3
                            className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug group-hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {st.title}
                          </h3>
                        </Link>
                        <p
                          className="hd-font-body text-sm leading-relaxed"
                          style={{ color: 'var(--hd-fg-secondary)' }}
                        >
                          {st.excerpt}
                        </p>
                        <div className="pt-1 flex items-center justify-between">
                          <span className="hd-folio-meta">BY {st.bylineDisplay}</span>
                          <Link
                            href={resolveCanonicalStoryUrl(st)}
                            className="hd-kicker inline-flex items-center gap-1"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
