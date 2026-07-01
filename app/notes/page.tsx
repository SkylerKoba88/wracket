import { getInventoryItems } from '@/lib/supabase/products';

export default async function Notes() {
  const notes = await getInventoryItems();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}