import { redirect } from 'next/navigation';

export default function GreenMartyrsRedirect() {
  redirect('/resources/kew-green-heroes?tab=green-martyrs');
}
