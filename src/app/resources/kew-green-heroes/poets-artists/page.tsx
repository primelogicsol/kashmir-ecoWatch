import { redirect } from 'next/navigation';

export default function poetsartistsRedirect() {
  redirect('/resources/kew-green-heroes?tab=poets-artists');
}
