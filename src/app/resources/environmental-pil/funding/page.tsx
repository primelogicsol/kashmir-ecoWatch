import { redirect } from 'next/navigation';

export default function FundingRedirect() {
  redirect('/resources/environmental-pil?tab=funding');
}
