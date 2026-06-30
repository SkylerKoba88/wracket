export type InventoryItem = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  type: string;
  quantity: number;
  img: string;
  materials: string[];
  sizes: string[];
};

const fallbackProducts: InventoryItem[] = [
  {
    id: "wracket-tee",
    name: "Wracket Tee",
    description: "Soft everyday print",
    longDescription:
      "A comfortable tee with a bold hand-drawn graphic, made for daily wear and layered styling.",
    price: 34,
    category: "apparel",
    type: "tees",
    quantity: 8,
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    materials: ["100% cotton", "Screen print"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "studio-print",
    name: "Studio Print",
    description: "Limited edition art print",
    longDescription:
      "A vibrant print inspired by the studio practice behind Wracket, ready to frame and display.",
    price: 24,
    category: "prints",
    type: "art",
    quantity: 12,
    img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=900&q=80",
    materials: ["Archival paper", "Ink"],
    sizes: ["8x10", "11x14"],
  },
  {
    id: "carry-bag",
    name: "Studio Carry Bag",
    description: "Compact everyday carry",
    longDescription:
      "A simple carry pouch designed to hold your essentials while keeping the look minimal and functional.",
    price: 28,
    category: "functional",
    type: "accessories",
    quantity: 5,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    materials: ["Canvas", "Recycled lining"],
    sizes: ["One size"],
  },
  {
    id: "archive-pin",
    name: "Archive Pin",
    description: "Small statement piece",
    longDescription:
      "A soft enamel pin that brings a little personality to jackets, bags, and layering moments.",
    price: 14,
    category: "misc",
    type: "pins",
    quantity: 0,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    materials: ["Enamel", "Metal back"],
    sizes: ["One size"],
  },
];

function normalizeProduct(item: Record<string, unknown>): InventoryItem {
  return {
    id: String(item.id ?? ""),
    name: String(item.name ?? "Untitled item"),
    description: String(item.description ?? "A handcrafted piece from Wracket."),
    longDescription: String(item.long_description ?? item.longDescription ?? ""),
    price: Number(item.price ?? 0),
    category: String(item.category ?? "misc"),
    type: String(item.type ?? "misc"),
    quantity: Number(item.quantity ?? 0),
    img: String(item.img ?? "https://placehold.co/900x900?text=Wracket"),
    materials: Array.isArray(item.materials)
      ? item.materials.map((entry) => String(entry))
      : [],
    sizes: Array.isArray(item.sizes)
      ? item.sizes.map((entry) => String(entry))
      : [],
  };
}

async function fetchSupabaseInventory(table: string): Promise<InventoryItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${table}?select=id,name,description,long_description,price,category,type,quantity,img,materials,sizes&order=id.asc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const items = Array.isArray(data) ? data : [];

  return items.map((item) => normalizeProduct(item as Record<string, unknown>));
}

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const tables = ["products", "inventory", "items"];

  for (const table of tables) {
    const items = await fetchSupabaseInventory(table);
    if (items.length > 0) {
      return items;
    }
  }

  return fallbackProducts;
}

export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  const items = await getInventoryItems();
  return items.find((item) => item.id === id) ?? null;
}
