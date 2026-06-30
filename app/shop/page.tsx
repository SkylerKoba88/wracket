import { Storefront } from "@/components/storefront";
import { getInventoryItems } from "@/lib/supabase/products";

export default async function ShopPage() {
  const items = await getInventoryItems();

  return <Storefront items={items} />;
}