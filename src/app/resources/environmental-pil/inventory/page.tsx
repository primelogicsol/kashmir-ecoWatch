import { redirect } from 'next/navigation';

export default function InventoryRedirect() {
  redirect('/resources/environmental-pil?tab=inventory');
}
