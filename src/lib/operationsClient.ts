import { PublicSourcePage, SubmissionPriority, OperationRecord } from './operations';

export interface ClientSubmitPayload {
  sourcePage: PublicSourcePage;
  title: string;
  category?: string;
  ownerName: string;
  ownerEmail: string;
  organization?: string;
  district?: string;
  details: string;
  priority?: SubmissionPriority;
}

export async function submitToOperations(
  payload: ClientSubmitPayload
): Promise<{ success: boolean; trackingId: string; record?: OperationRecord; error?: string }> {
  try {
    const res = await fetch('/api/operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!json.success) {
      return { success: false, trackingId: '', error: json.error || 'Submission failed' };
    }

    const { trackingId, record } = json;

    // Cache locally in localStorage for user dashboard
    if (typeof window !== 'undefined' && record) {
      try {
        const existingRaw = localStorage.getItem('kew_user_operations');
        const list: OperationRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
        // Prepend and avoid duplicates
        const updated = [record, ...list.filter((r) => r.trackingId !== record.trackingId)];
        localStorage.setItem('kew_user_operations', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('kew_operation_added', { detail: record }));
      } catch (storageErr) {
        console.warn('Could not cache to localStorage', storageErr);
      }
    }

    return { success: true, trackingId, record };
  } catch (err: any) {
    return { success: false, trackingId: '', error: err.message };
  }
}

export function getLocalUserOperations(): OperationRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('kew_user_operations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
