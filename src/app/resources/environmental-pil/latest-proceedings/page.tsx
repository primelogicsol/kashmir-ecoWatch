import { redirect } from 'next/navigation';

export default function ProceedingsRedirect() {
  redirect('/resources/environmental-pil?tab=proceedings');
}
