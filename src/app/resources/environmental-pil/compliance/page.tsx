import { redirect } from 'next/navigation';

export default function ComplianceRedirect() {
  redirect('/resources/environmental-pil?tab=compliance');
}
