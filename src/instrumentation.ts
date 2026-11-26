export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureInProcessAnieWorkerStarted } = await import('@/lib/hd-anie/worker');
    ensureInProcessAnieWorkerStarted();
  }
}
