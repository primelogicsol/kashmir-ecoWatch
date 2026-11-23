'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Collection, EvidenceItem, getEvidenceByCollection } from '@/data/evidence-intelligence';
import { EvidenceCard } from './EvidenceCard';
import { Waves, Map as MapIcon, TriangleAlert, Droplets, Trees, CloudRain, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const collectionIcons: Record<string, React.ElementType> = {
  wetlands: Waves,
  'district-plans': MapIcon,
  'red-data': TriangleAlert,
  springs: Droplets,
  forests: Trees,
  climate: CloudRain,
};

const collectionColorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-500 to-teal-600',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500 to-cyan-600',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    gradient: 'from-amber-500 to-orange-600',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500 to-pink-600',
  },
  red: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    gradient: 'from-red-500 to-rose-600',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    gradient: 'from-cyan-500 to-blue-600',
  },
};

interface CollectionsSectionProps {
  collections: Collection[];
  onViewCollection?: (collectionId: string) => void;
  onViewEvidence?: (evidenceId: string) => void;
  compact?: boolean;
}

export function CollectionCard({ 
  collection, 
  onViewCollection,
  compact = false 
}: { 
  collection: Collection; 
  onViewCollection?: (collectionId: string) => void;
  compact?: boolean;
}) {
  const Icon = collectionIcons[collection.id] || BookOpen;
  const colors = collectionColorClasses[collection.color] || collectionColorClasses.emerald;

  if (compact) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onViewCollection?.(collection.id)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onViewCollection?.(collection.id)}
        className="kew-card-shell kew-card-shell--interactive group p-4 gap-2.5 h-full"
      >
        <div className="kew-card-top-row">
          <div className={cn("kew-card-icon-box", colors.bg, colors.border)}>
            <Icon className={cn("w-5 h-5", colors.text)} />
          </div>
          <Badge variant="outline" size="sm" className={cn("border-white/20", colors.text)}>
            {collection.evidenceCount} items
          </Badge>
        </div>
        <h3 className="kew-card-title text-sm sm:text-base">{collection.name}</h3>
        <div className="kew-card-cta text-xs pt-2">
          <span>Open Collection</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewCollection?.(collection.id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onViewCollection?.(collection.id)}
      className="kew-card-shell kew-card-shell--interactive group h-full"
    >
      <div className="kew-card-top-row">
        <div className={cn("kew-card-icon-box", colors.bg, colors.border)}>
          <Icon className={cn("w-5 h-5", colors.text)} />
        </div>
        <Badge variant="outline" size="sm" className={cn("border-white/20", colors.text)}>
          {collection.evidenceCount} items
        </Badge>
      </div>

      <h3 className="kew-card-title">{collection.name}</h3>
      <p className="kew-card-desc">{collection.description}</p>

      {collection.featuredEvidenceIds.length > 0 && (
        <div>
          <div className="text-xs text-slate-400 mb-1.5">Featured Evidence</div>
          <div className="flex flex-wrap gap-1.5">
            {collection.featuredEvidenceIds.slice(0, 2).map(evidenceId => (
              <Badge key={evidenceId} variant="secondary" size="sm" className="text-xs">
                {evidenceId.replace('ev-', '')}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="kew-card-cta">
        <span>Explore Collection</span>
        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

export function CollectionsGrid({ collections, onViewCollection, compact = false }: CollectionsSectionProps) {
  return (
    <div className={cn("grid gap-4", compact ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
      {collections.map((collection, i) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <CollectionCard 
            collection={collection} 
            onViewCollection={onViewCollection}
            compact={compact}
          />
        </motion.div>
      ))}
    </div>
  );
}

interface CollectionDetailProps {
  collection: Collection;
  evidence: EvidenceItem[];
  onViewEvidence?: (evidenceId: string) => void;
  onBack?: () => void;
}

export function CollectionDetail({ collection, evidence, onViewEvidence, onBack }: CollectionDetailProps) {
  const Icon = collectionIcons[collection.id] || BookOpen;
  const colors = collectionColorClasses[collection.color] || collectionColorClasses.emerald;

  return (
    <div className="space-y-8">
      {/* Collection Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl", colors.gradient)}>
            <Icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">{collection.name}</h2>
            <p className="text-slate-400">{collection.evidenceCount} evidence items • {collection.description}</p>
          </div>
        </div>
        {onBack && (
          <Button variant="outline" size="sm" className="border-white/20 text-white" onClick={onBack}>
            Back to Collections
          </Button>
        )}
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidence.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <EvidenceCard 
              evidence={item} 
              variant="default"
              onClick={() => onViewEvidence?.(item.id)}
            />
          </motion.div>
        ))}
      </div>

      {evidence.length === 0 && (
        <Card className="glass-intense border-white/10 p-12 text-center">
          <Icon className={cn("w-16 h-16 mx-auto mb-4", colors.text)} />
          <h3 className="text-xl font-bold text-white mb-2">No Evidence Yet</h3>
          <p className="text-slate-400">This collection is being populated with relevant evidence.</p>
        </Card>
      )}
    </div>
  );
}

export function CollectionsSection({ collections, onViewCollection, onViewEvidence, compact = false }: CollectionsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Evidence Collections</h2>
          <p className="text-slate-400">Curated evidence grouped by thematic areas</p>
        </div>
        {!compact && (
          <Button variant="ghost" size="sm" className="text-indigo-400">
            View All Collections
          </Button>
        )}
      </div>
      <CollectionsGrid collections={collections} onViewCollection={onViewCollection} compact={compact} />
    </section>
  );
}
