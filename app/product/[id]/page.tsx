import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { getInventoryItem } from "@/lib/supabase/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getInventoryItem(id);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}