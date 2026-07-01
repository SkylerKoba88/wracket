import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { getInventoryItem, getInventoryItems } from "@/lib/supabase/products";

export async function generateStaticParams() {
  const items = await getInventoryItems();
  return items.map((item) => ({
    id: String(item.id),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const numericId = Number(id)

  if (isNaN(numericId)) {
    notFound();
  }

  const item = await getInventoryItem(numericId);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}