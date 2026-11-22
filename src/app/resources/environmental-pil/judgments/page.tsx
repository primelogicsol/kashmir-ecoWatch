import { redirect } from 'next/navigation';

export default function JudgmentsRedirect() {
  redirect('/resources/environmental-pil?tab=judgments');
}
