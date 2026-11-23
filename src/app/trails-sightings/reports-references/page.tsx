'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Book, FileText, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

const reports = [
  { id: 'rr-1', title: 'Trails of Kashmir: A Comprehensive Guide', type: 'Field Guide', year: 2023, author: 'Dr. Kumar Foundation', pages: 248, downloads: 1247 },
  { id: 'rr-2', title: 'Wildlife Sightings Annual Report 2023', type: 'Annual Report', year: 2024, author: 'Wildlife Dept', pages: 156, downloads: 892 },
  { id: 'rr-3', title: 'Bird Migration Patterns in Kashmir Wetlands', type: 'Research Paper', year: 2023, author: 'Ornithology Society', pages: 42, downloads: 534 },
  { id: 'rr-4', title: 'Trail Maintenance Best Practices', type: 'Technical Manual', year: 2022, author: 'Tourism Dept', pages: 78, downloads: 421 },
];

export default function ReportsReferencesPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>
            <KewBrandIdentity />
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Reports & References</span>
          </>}
        subtitle="Scientific reports, field guides, research papers, and reference materials for trails and wildlife"
        icon={<Book className="w-6 h-6 text-emerald-400" />}
        label="Documentation & Research"
        actions={
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, i) => (
              <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="h-full">
                <Card className="kew-card-shell h-full p-5">
                  <div className="kew-card-top-row">
                    <div className="kew-card-icon-box bg-slate-900">
                      <FileText className="w-5 h-5 text-emerald-400" />
                    </div>
                    <Badge variant="outline" size="sm">{report.type}</Badge>
                  </div>
                  <h3 className="kew-card-title mb-1.5">{report.title}</h3>
                  <div className="kew-card-kpi text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-white">{report.pages}</span>
                    <span className="kew-card-kpi-unit">pages</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-semibold text-emerald-400">{report.downloads}</span>
                    <span className="kew-card-kpi-unit">downloads</span>
                  </div>
                  <p className="kew-card-desc text-sm mb-4">{report.author} • {report.year}</p>
                  <div className="mt-auto pt-3 border-t border-white/10">
                    <Button size="sm" variant="outline" className="border-white/20 text-white h-9" icon={<Download className="w-4 h-4" />}>Download PDF</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
