import { redirect } from 'next/navigation';

export default function LegalAidRedirect() {
  redirect('/resources/environmental-pil?tab=legal-aid');
}
