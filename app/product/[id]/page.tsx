import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { getInventoryItem, getInventoryItems } from "@/lib/supabase/products";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const items = await getInventoryItems();
  return items.map((item) => ({
    id: item.id,
  }));
}

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