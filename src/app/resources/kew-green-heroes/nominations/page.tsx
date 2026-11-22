import { redirect } from 'next/navigation';

export default function nominationsRedirect() {
  redirect('/resources/kew-green-heroes?tab=nominations');
}
