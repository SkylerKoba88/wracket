import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { getInventoryItem, getInventoryItems } from "@/lib/supabase/products";
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {params: Promise<{ id: string }>}) {

    return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductLoader paramsPromise={params} />
    </Suspense>
  );
}

async function ProductLoader({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const item = await getInventoryItem(numericId);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}