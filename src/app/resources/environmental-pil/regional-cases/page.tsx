import { redirect } from 'next/navigation';

export default function RegionalCasesRedirect() {
  redirect('/resources/environmental-pil?tab=districts');
}
