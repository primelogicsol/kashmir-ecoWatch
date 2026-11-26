'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

const privacyPrinciples = [
  { icon: Lock, title: 'Data Protection', description: 'Personal information is encrypted and stored securely with access controls' },
  { icon: Eye, title: 'Transparency', description: 'Clear communication about what data is collected and how it is used' },
  { icon: Shield, title: 'Minimal Collection', description: 'Only essential data is collected, with clear purpose and consent' },
  { icon: Database, title: 'Limited Retention', description: 'Data is retained only as long as necessary for stated purposes' },
];

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950"><section className="kew-module-hero-surface kew-module-hero-atmospheric relative overflow-hidden bg-[#080E1C]">
        
        <div className="kew-module-hero-inner container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Data Privacy</Badge>
            </div>

            <div className="mb-2.5 sm:mb-3"><KewBrandIdentity variant="eyebrow" /></div>
            <h1 className="max-w-xl text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Sensitivity & <span className="text-emerald-400">Privacy</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Commitment to protecting personal information and ensuring ethical
              handling of all data submitted to Kashmir EcoWatch
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacyPrinciples.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="h-full">
                <Card className="kew-card-shell p-6 h-full">
                  <div className="kew-card-icon-box bg-slate-900 mb-3">
                    <p.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="kew-card-title text-base mb-2">{p.title}</h3>
                  <p className="kew-card-desc text-sm">{p.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
