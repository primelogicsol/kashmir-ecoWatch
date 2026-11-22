import { redirect } from 'next/navigation';

export default function FilingChecklistRedirect() {
  redirect('/resources/environmental-pil?tab=filing-checklist');
}
