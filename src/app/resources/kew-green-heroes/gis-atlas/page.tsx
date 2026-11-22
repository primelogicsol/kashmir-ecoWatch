import { redirect } from 'next/navigation';

export default function gisatlasRedirect() {
  redirect('/resources/kew-green-heroes?tab=gis-atlas');
}
