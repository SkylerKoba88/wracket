import { Storefront } from "@/components/storefront";
import { getInventoryItems } from "@/lib/supabase/products";
import {Suspense} from "react";

export default async function ShopPage() {
  console.log("Shoppage env", {
    NEXT_PUBLIC_STORAGE_SUPABASE_URL: !!process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL,
    NEXT_PUBLIC_STORAGE_SUPABASE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STORAGE_SUPABASE_PUBLISHABLE_KEY,
  });

  return (
    <Suspense fallback="Loading...">
      <StorefrontLoader />
    </Suspense>
  );

  async function StorefrontLoader() {
    const items = await getInventoryItems();
    return <Storefront items={items} />;
  }
}