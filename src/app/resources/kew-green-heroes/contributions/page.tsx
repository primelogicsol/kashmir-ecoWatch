import { redirect } from 'next/navigation';

export default function contributionsRedirect() {
  redirect('/resources/kew-green-heroes?tab=contributions');
}
