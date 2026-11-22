import { redirect } from 'next/navigation';

export default function GisAtlasRedirect() {
  redirect('/resources/environmental-pil?tab=gis-atlas');
}
