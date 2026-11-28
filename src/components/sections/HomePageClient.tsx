'use client';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { CinematicIntroduction } from '@/components/sections/CinematicIntroduction';
import { HeroTelemetryBanner } from '@/components/sections/HeroTelemetryBanner';
import { AsymmetricModuleSurface } from '@/components/sections/AsymmetricModuleSurface';
import { InteractiveAtlasPreview } from '@/components/sections/InteractiveAtlasPreview';
import { LiveIntelligencePanels } from '@/components/sections/LiveIntelligencePanels';
import { NextGenDashboardPreview } from '@/components/sections/NextGenDashboardPreview';
import { FeaturedEntityStrip } from '@/components/sections/FeaturedEntityStrip';
import { AlertResponseSystem } from '@/components/sections/AlertResponseSystem';
import { PublicParticipationIntelligence } from '@/components/sections/PublicParticipationIntelligence';
import { DistrictIntelligenceStrip } from '@/components/sections/DistrictIntelligenceStrip';
import { OnboardingStrip } from '@/components/sections/OnboardingStrip';
import { EarthHumanImpactSection } from '@/components/sections/EarthHumanImpactSection';
import { SectoralEiaSection } from '@/components/sections/SectoralEiaSection';
import { EnvironmentalInvestigationsSection } from '@/components/sections/EnvironmentalInvestigationsSection';
import { EducationStewardshipActionSection } from '@/components/sections/EducationStewardshipActionSection';
import {
  FALLBACK_BASELINE_TELEMETRY,
  type BaselineTelemetryData,
} from '@/lib/telemetry/getBaselineTelemetry';

export interface HomePageClientProps {
  initialData?: BaselineTelemetryData;
}

export function HomePageClient({
  initialData = FALLBACK_BASELINE_TELEMETRY,
}: HomePageClientProps = {}) {
  return (
    <main id="main-content" className="min-h-screen bg-slate-950">
      {/* Additive Cinematic Institutional Introduction */}
      <ErrorBoundary sectionName="Cinematic Introduction">
        <CinematicIntroduction />
      </ErrorBoundary>

      {/* Band 1: Hero Command Surface (Pre-rendered SSR Telemetry) */}
      <ErrorBoundary sectionName="Hero">
        <HeroTelemetryBanner initialData={initialData} />
      </ErrorBoundary>

      {/* Band 2: Core Intelligence Modules */}
      <ErrorBoundary sectionName="Intelligence Modules">
        <AsymmetricModuleSurface />
      </ErrorBoundary>

      {/* Band 2.1: Earth & Human Impact Intelligence (EHII) */}
      <ErrorBoundary sectionName="Earth & Human Impact">
        <EarthHumanImpactSection />
      </ErrorBoundary>

      {/* Band 2.2: Sectoral EIA Engine (SEIAE) */}
      <ErrorBoundary sectionName="Sectoral EIA">
        <SectoralEiaSection />
      </ErrorBoundary>

      {/* Band 2.3: Environmental Investigations & Accountability (KEW-EIAI) */}
      <ErrorBoundary sectionName="Environmental Investigations">
        <EnvironmentalInvestigationsSection />
      </ErrorBoundary>

      {/* Band 3: Interactive GIS Atlas Preview + Live Intelligence Panels */}
      <ErrorBoundary sectionName="Map Intelligence">
        <InteractiveAtlasPreview initialData={initialData} />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Live Panels">
        <LiveIntelligencePanels initialData={initialData} />
      </ErrorBoundary>

      {/* Band 4: District Intelligence & Featured Entities */}
      <ErrorBoundary sectionName="Onboarding">
        <OnboardingStrip />
      </ErrorBoundary>
      <ErrorBoundary sectionName="District Intelligence">
        <DistrictIntelligenceStrip />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Featured Entities">
        <FeaturedEntityStrip />
      </ErrorBoundary>

      {/* Band 5: Participation, Dashboards & Alerts */}
      <ErrorBoundary sectionName="Public Participation">
        <PublicParticipationIntelligence />
      </ErrorBoundary>

      {/* Band 5.1: Education, Creative Stewardship & Institutional Action Hub */}
      <ErrorBoundary sectionName="Education & Action">
        <EducationStewardshipActionSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Dashboard Preview">
        <NextGenDashboardPreview initialData={initialData} />
      </ErrorBoundary>
      <ErrorBoundary sectionName="Alert System">
        <AlertResponseSystem initialData={initialData} />
      </ErrorBoundary>
    </main>
  );
}
