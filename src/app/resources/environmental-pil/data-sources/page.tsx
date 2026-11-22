import { redirect } from 'next/navigation';

export default function DataSourcesRedirect() {
  redirect('/resources/environmental-pil?tab=overview');
}
