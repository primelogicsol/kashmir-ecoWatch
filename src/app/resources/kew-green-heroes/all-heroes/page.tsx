import { redirect } from 'next/navigation';

export default function allheroesRedirect() {
  redirect('/resources/kew-green-heroes?tab=all-heroes');
}
