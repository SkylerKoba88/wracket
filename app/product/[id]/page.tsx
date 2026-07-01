import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { getInventoryItem, getInventoryItems } from "@/lib/supabase/products";
import { Suspense } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;

  const numericId = Number(id)

  if (isNaN(numericId)) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductLoader numericId={numericId} />
    </Suspense>
  );
}

async function ProductLoader({ numericId }: { numericId: number }) {
  const item = await getInventoryItem(numericId);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}