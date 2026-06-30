import Link from "next/link";
import type { InventoryItem } from "@/lib/supabase/products";

export function ProductDetailView({ item }: { item: InventoryItem }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_transparent_55%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Link href="/shop" className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">
          ← Back to shop
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-xl shadow-slate-900/10 backdrop-blur">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <img src={item.img} alt={item.name} className="h-[420px] w-full rounded-[1.5rem] object-cover" />
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-600">
                    {item.category}
                  </p>
                  <h1 className="text-4xl font-semibold">{item.name}</h1>
                  <p className="text-lg text-slate-700">{item.longDescription}</p>
                </div>

                <div className="rounded-[1.25rem] bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Description</p>
                  <p className="mt-2 text-slate-700">{item.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-500">Price</p>
                    <p className="mt-1 text-2xl font-semibold">${item.price}</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-500">Availability</p>
                    <p className="mt-1 text-lg font-semibold">{item.quantity > 0 ? `${item.quantity} in stock` : "Sold out"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Materials</p>
                  <ul className="flex flex-wrap gap-2">
                    {item.materials.map((material) => (
                      <li key={material} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sizes</p>
                  <ul className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <li key={size} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700">
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Add to cart
                </button>
                <button className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
