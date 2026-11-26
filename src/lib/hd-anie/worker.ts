// ─────────────────────────────────────────────────────────────────────────────
// HD-ANIE PERSISTENT SERVER-SIDE WORKER & AUTONOMOUS PIPELINE ORCHESTRATOR
// Executes due source discovery, deduplication, clustering, KEW RAG dossier
// compilation, autonomous manuscript drafting, scheduled release checks,
// monthly edition assembly, daily digest generation, retries & DLQ isolation.
// Operates server-side without an open browser or active founder session.
// ─────────────────────────────────────────────────────────────────────────────

import { AnieRawSignal, AnieSourceRecord, AnieWorkerJobRecord } from '@/types/hd-anie';
import { fetchFromAuthorizedSource } from './discovery';
import {
  analyzeAndNormalizeSignal,
  buildEvidenceDossier,
  clusterSignalsAndScore,
} from './intelligence';
import { generateAutonomousEditorialDraft } from './writer-verifier';
import {
  assembleOrUpdateMonthlyEditionPlan,
  canPublishDraft,
  compileConsolidatedDailyDigest,
  readAnieStore,
  recordAnieAudit,
  writeAnieStore,
} from './store';

const globalWorkerState = globalThis as unknown as {
  __hdAnieIntervalHandle?: ReturnType<typeof setInterval>;
  __hdAnieCycleLock?: boolean;
  __hdAnieWorkerInstanceId?: string;
};

function isSourceDueForPoll(source: AnieSourceRecord, forceAll: boolean): boolean {
  if (!source.active) return false;
  if (forceAll || !source.lastCheckedAt) return true;

  // Apply exponential backoff if source had consecutive failures (up to 6 hours max)
  const baseMs = Math.max(5, source.pollFrequencyMinutes) * 60_000;
  const backoffFactor =
    source.consecutiveFailures > 0 ? Math.min(12, 2 ** source.consecutiveFailures) : 1;
  const effectiveWaitMs = baseMs * backoffFactor;
  return Date.now() - new Date(source.lastCheckedAt).getTime() >= effectiveWaitMs;
}

/**
 * Executes one idempotent HD-ANIE server-side pipeline cycle.
 * Safe against concurrent invocations and restarts.
 */
export async function runAniePipelineCycle(options?: {
  forceAllSources?: boolean;
  maxNewDraftsPerCycle?: number;
  triggeredBy?: string;
}): Promise<{
  skippedReason?: string;
  sourcesPolled: number;
  sourcesSucceeded: number;
  newSignalsAccepted: number;
  duplicatesOrIrrelevantFiltered: number;
  clustersUpdated: number;
  newDraftsGenerated: number;
  scheduledArticlesReleased: number;
  durationMs: number;
}> {
  const startedMs = Date.now();
  if (globalWorkerState.__hdAnieCycleLock) {
    return {
      skippedReason: 'Cycle lock active — another HD-ANIE worker pass is currently executing.',
      sourcesPolled: 0,
      sourcesSucceeded: 0,
      newSignalsAccepted: 0,
      duplicatesOrIrrelevantFiltered: 0,
      clustersUpdated: 0,
      newDraftsGenerated: 0,
      scheduledArticlesReleased: 0,
      durationMs: 0,
    };
  }

  const store = readAnieStore();
  if (store.engineMode !== 'running' && !options?.forceAllSources) {
    return {
      skippedReason: `Engine is currently in "${store.engineMode}" mode.`,
      sourcesPolled: 0,
      sourcesSucceeded: 0,
      newSignalsAccepted: 0,
      duplicatesOrIrrelevantFiltered: 0,
      clustersUpdated: 0,
      newDraftsGenerated: 0,
      scheduledArticlesReleased: 0,
      durationMs: 0,
    };
  }

  if (store.engineMode === 'emergency_stop') {
    return {
      skippedReason: 'EMERGENCY STOP is active — all autonomous operations halted until administrator clears stop.',
      sourcesPolled: 0,
      sourcesSucceeded: 0,
      newSignalsAccepted: 0,
      duplicatesOrIrrelevantFiltered: 0,
      clustersUpdated: 0,
      newDraftsGenerated: 0,
      scheduledArticlesReleased: 0,
      durationMs: 0,
    };
  }

  globalWorkerState.__hdAnieCycleLock = true;
  const nowIso = new Date().toISOString();
  const jobRecord: AnieWorkerJobRecord = {
    id: `job-${Date.now().toString(36)}`,
    jobType: 'regional_discovery',
    status: 'running',
    attempts: 1,
    maxAttempts: 3,
    scheduledAt: nowIso,
    startedAt: nowIso,
  };
  store.workerJobs.unshift(jobRecord);

  let sourcesPolled = 0;
  let sourcesSucceeded = 0;
  let newSignalsAccepted = 0;
  let duplicatesOrIrrelevantFiltered = 0;
  let newDraftsGenerated = 0;
  let scheduledArticlesReleased = 0;

  try {
    // 1. Poll due authorized sources in small concurrent batches (respecting subsystem flags)
    const dueSources = store.sources.filter((src) => {
      if (!isSourceDueForPoll(src, Boolean(options?.forceAllSources))) return false;
      if (src.category === 'regional_news' && !store.subsystems.regionalSourceMonitoring) {
        return false;
      }
      if (src.category === 'scientific_repository' && !store.subsystems.scientificResearchDiscovery) {
        return false;
      }
      if (
        (src.category === 'international_media' || src.category === 'global_discovery_index') &&
        !store.subsystems.globalNewsDiscovery
      ) {
        return false;
      }
      return true;
    });

    const newlyDiscoveredSignals: AnieRawSignal[] = [];
    const discoveredCandidateDomains = new Map<string, string>();

    const BATCH_SIZE = 4;
    for (let i = 0; i < dueSources.length; i += BATCH_SIZE) {
      const slice = dueSources.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        slice.map(async (src) => {
          const fetched = await fetchFromAuthorizedSource(src);
          return { src, fetched };
        })
      );

      for (const { src, fetched } of batchResults) {
        sourcesPolled++;
        store.modelAndBudget.measuredExternalDiscoveryCalls += 1;
        const checkedIso = new Date().toISOString();
        src.lastCheckedAt = checkedIso;
        src.lastHttpStatus = fetched.httpStatus;

        if (fetched.ok) {
          sourcesSucceeded++;
          src.lastSuccessfulRetrievalAt = checkedIso;
          src.consecutiveFailures = 0;
          src.robotsPolicyStatus = 'permitted';

          for (const cand of fetched.candidateNewDomains) {
            if (cand.domain && !discoveredCandidateDomains.has(cand.domain)) {
              discoveredCandidateDomains.set(cand.domain, cand.sampleUrl);
            }
          }

          for (const item of fetched.items) {
            const analyzed = analyzeAndNormalizeSignal(
              item,
              src,
              [...newlyDiscoveredSignals, ...store.signals]
            );
            newlyDiscoveredSignals.push(analyzed);
            if (analyzed.status === 'accepted') {
              newSignalsAccepted++;
              src.totalSignalsDiscovered += 1;
            } else {
              duplicatesOrIrrelevantFiltered++;
            }
          }
        } else {
          src.consecutiveFailures += 1;
          src.failureHistory.unshift({
            timestamp: checkedIso,
            httpStatus: fetched.httpStatus,
            reason: fetched.errorMessage || 'Endpoint unreachable',
          });
          src.failureHistory = src.failureHistory.slice(0, 8);

          // Isolate repeatedly failing source job into Dead-Letter Queue notice without crashing pipeline
          if (src.consecutiveFailures >= 3) {
            store.deadLetterQueue.unshift({
              id: `dlq-${src.id}-${Date.now().toString(36)}`,
              jobType:
                src.category === 'scientific_repository'
                  ? 'scientific_discovery'
                  : 'regional_discovery',
              status: 'dead_letter',
              attempts: src.consecutiveFailures,
              maxAttempts: 3,
              scheduledAt: checkedIso,
              completedAt: checkedIso,
              errorMessage: `${src.name} (${src.domain}) failed ${src.consecutiveFailures} consecutive times: ${fetched.errorMessage}`,
            });
          }
        }
      }
    }

    if (newlyDiscoveredSignals.length > 0) {
      store.signals = [...newlyDiscoveredSignals, ...store.signals];
    }

    // 2. Story Clustering & Multi-Dimensional Scoring
    const allAcceptedSignals = store.signals.filter((s) => s.status === 'accepted');
    store.clusters = clusterSignalsAndScore(allAcceptedSignals, store.clusters);

    // 3. Evidence Dossier Compilation & Autonomous Editorial Drafting (idempotent: never re-drafts an already-drafted cluster!)
    if (store.subsystems.autonomousEditorialWriting && store.subsystems.factAndSourceVerification) {
      const maxDrafts = options?.maxNewDraftsPerCycle ?? 8;
      const eligiblePool = store.clusters.filter(
        (cl) =>
          cl.status === 'queued_for_research' &&
          !cl.draftId &&
          !store.drafts.some((d) => d.clusterId === cl.id) &&
          cl.scorecard.compositePriorityScore >= 64
      );

      // Prioritize the 6 Western Himalayan regional bureaus + Hindu Kush/Western Himalaya ahead of generic international items,
      // and diversify across bureaus so one bureau never monopolizes a drafting batch!
      const regionalPool = eligiblePool.filter((c) => c.primaryBureau !== 'international');
      const intlPool = eligiblePool.filter((c) => c.primaryBureau === 'international');
      const prioritizedClusters: typeof eligiblePool = [];
      const seenBureauCount: Record<string, number> = {};

      for (const cl of [...regionalPool, ...intlPool]) {
        const bCount = seenBureauCount[cl.primaryBureau] || 0;
        if (bCount < 3 || prioritizedClusters.length < maxDrafts) {
          prioritizedClusters.push(cl);
          seenBureauCount[cl.primaryBureau] = bCount + 1;
        }
        if (prioritizedClusters.length >= maxDrafts) break;
      }

      for (const cl of prioritizedClusters) {
        const clSignals = store.signals.filter((s) => cl.signalIds.includes(s.id));
        if (clSignals.length === 0) continue;

        const dossier = buildEvidenceDossier(cl, clSignals);
        store.dossiers.unshift(dossier);

        if (!dossier.verificationPassed) {
          cl.status = 'held_insufficient_evidence';
          continue;
        }

        const generated = await generateAutonomousEditorialDraft(
          cl,
          dossier,
          store.modelAndBudget
        );

        store.modelAndBudget.measuredPromptTokens += generated.promptTokens;
        store.modelAndBudget.measuredCompletionTokens += generated.completionTokens;
        store.modelAndBudget.measuredSpentTodayUsd += generated.costUsd;
        store.modelAndBudget.measuredSpentMonthUsd += generated.costUsd;

        store.drafts.unshift(generated.draft);
        cl.status = 'drafted';
        cl.draftId = generated.draft.id;
        newDraftsGenerated++;
      }
    }

    // 4. Scheduled Publication Gateway (ONLY releases articles explicitly scheduled by an Administrator!)
    if (store.subsystems.scheduledReleaseGateway) {
      const nowTime = Date.now();
      for (const draft of store.drafts) {
        if (
          draft.editorialStatus === 'scheduled' &&
          draft.scheduledPublicationAt &&
          new Date(draft.scheduledPublicationAt).getTime() <= nowTime
        ) {
          const check = canPublishDraft(draft, false);
          if (check.allowed) {
            draft.editorialStatus = 'published';
            draft.publishedAt = new Date().toISOString();
            draft.updatedAt = draft.publishedAt;
            draft.revisionHistory.unshift({
              id: `rev-sched-${Date.now()}`,
              timestamp: draft.publishedAt,
              actor: 'HD-ANIE Scheduled Publication Worker',
              actorType: 'hd_anie_engine',
              summary: 'Released administrator-scheduled article at scheduled publication window.',
              previousStatus: 'scheduled',
              newStatus: 'published',
            });
            scheduledArticlesReleased++;
          }
        }
      }
    }

    // 5. Update Autonomous Monthly Edition Plan & Consolidated Daily Digest
    assembleOrUpdateMonthlyEditionPlan(store);
    if (store.subsystems.dailyDigestCompilation) {
      compileConsolidatedDailyDigest(store);
    }

    const finishedIso = new Date().toISOString();
    const durationMs = Date.now() - startedMs;

    store.workerHeartbeat.lastHeartbeatAt = finishedIso;
    store.workerHeartbeat.lastDiscoveryRunAt = finishedIso;
    store.workerHeartbeat.totalCyclesCompleted += 1;

    jobRecord.status = 'completed';
    jobRecord.completedAt = finishedIso;
    jobRecord.durationMs = durationMs;
    jobRecord.summary = `Polled ${sourcesPolled} source(s) (${sourcesSucceeded} OK), accepted ${newSignalsAccepted} environmental signal(s), generated ${newDraftsGenerated} draft(s) for administrator review.`;

    if (sourcesPolled > 0 || newDraftsGenerated > 0 || scheduledArticlesReleased > 0) {
      recordAnieAudit(store, {
        actor: options?.triggeredBy || 'HD-ANIE Background Worker',
        category: 'discovery',
        action: 'pipeline_cycle_completed',
        details: jobRecord.summary,
      });
    }

    writeAnieStore(store);

    return {
      sourcesPolled,
      sourcesSucceeded,
      newSignalsAccepted,
      duplicatesOrIrrelevantFiltered,
      clustersUpdated: store.clusters.length,
      newDraftsGenerated,
      scheduledArticlesReleased,
      durationMs,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unexpected worker error';
    jobRecord.status = 'failed';
    jobRecord.completedAt = new Date().toISOString();
    jobRecord.errorMessage = msg;
    store.deadLetterQueue.unshift({ ...jobRecord, status: 'dead_letter' });
    writeAnieStore(store);
    return {
      skippedReason: `Worker error isolated: ${msg}`,
      sourcesPolled,
      sourcesSucceeded,
      newSignalsAccepted,
      duplicatesOrIrrelevantFiltered,
      clustersUpdated: store.clusters.length,
      newDraftsGenerated,
      scheduledArticlesReleased,
      durationMs: Date.now() - startedMs,
    };
  } finally {
    globalWorkerState.__hdAnieCycleLock = false;
  }
}

/**
 * Starts the persistent server-side background scheduler loop inside the Node.js
 * server process (idempotent across hot reloads; independent of browser sessions).
 */
export function ensureInProcessAnieWorkerStarted(): void {
  if (globalWorkerState.__hdAnieIntervalHandle) return;

  const instanceId = `hd-anie-worker-${process.pid}-${Date.now().toString(36)}`;
  globalWorkerState.__hdAnieWorkerInstanceId = instanceId;

  const store = readAnieStore();
  store.workerHeartbeat.workerInstanceId = instanceId;
  store.workerHeartbeat.inProcessSchedulerActive = true;
  store.workerHeartbeat.lastHeartbeatAt = new Date().toISOString();
  writeAnieStore(store);

  // Check every 60 seconds for due sources (15m regional / 30m international / 6h scientific) & scheduled releases
  globalWorkerState.__hdAnieIntervalHandle = setInterval(() => {
    void runAniePipelineCycle({
      forceAllSources: false,
      maxNewDraftsPerCycle: 5,
      triggeredBy: 'HD-ANIE Persistent Server Scheduler',
    });
  }, 60_000);

  if (typeof globalWorkerState.__hdAnieIntervalHandle.unref === 'function') {
    globalWorkerState.__hdAnieIntervalHandle.unref();
  }
}
