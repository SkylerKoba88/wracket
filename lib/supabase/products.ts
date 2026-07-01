export type InventoryItem = {
  id: number;
  created_at?: Date;
  name: string;
  img_url: string;
  category: string;
  type: string;
  keywords: string;
  description: string;
  materials: string[];
  sizes: string[];
  quantity: number;
  price: number;
};

const fallbackProducts: InventoryItem[] = [
  {
    id: 1,
    name: "Studio Print",
    keywords: "Limited edition art print",
    description:
      "A vibrant print inspired by the studio practice behind Wracket, ready to frame and display.",
    price: 24,
    category: "prints",
    type: "art",
    quantity: 12,
    img_url: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=900&q=80",
    materials: ["Archival paper", "Ink"],
    sizes: ["8x10", "11x14"],
  },
  {
    id: 2,
    name: "Studio Carry Bag",
    keywords: "Compact everyday carry",
    description:
      "A simple carry pouch designed to hold your essentials while keeping the look minimal and functional.",
    price: 28,
    category: "functional",
    type: "accessories",
    quantity: 5,
    img_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    materials: ["Canvas", "Recycled lining"],
    sizes: ["One size"],
  },
  {
    id: 3,
    name: "Archive Pin",
    keywords: "Small statement piece",
    description:
      "A soft enamel pin that brings a little personality to jackets, bags, and layering moments.",
    price: 14,
    category: "misc",
    type: "pins",
    quantity: 0,
    img_url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    materials: ["Enamel", "Metal back"],
    sizes: ["One size"],
  },
];

function normalizeProduct(item: Record<string, unknown>): InventoryItem {
  let parsedMaterials: string[] = [];
  if (typeof item.materials === "string") {
    try {
      parsedMaterials = JSON.parse(item.materials);
    } catch {
      parsedMaterials = [item.materials];
    }
  } else if (Array.isArray(item.materials)) {
    parsedMaterials = item.materials.map(String);
  }

  let parsedSizes: string[] = [];
  if (typeof item.sizes === "string") {
    try {
      parsedSizes = JSON.parse(item.sizes);
    } catch {
      parsedSizes = [item.sizes];
    }
  } else if (Array.isArray(item.sizes)) {
    parsedSizes = item.sizes.map(String);
  }

  return {
    id: Number(item.id ?? 0),
    name: String(item.name ?? "Untitled item"),
    keywords: String(item.keywords ?? ""),
    description: String(item.description ?? "A handcrafted piece from Wracket."),
    price: Number(item.price ?? 0),
    category: String(item.category ?? "misc"),
    type: String(item.type ?? "misc"),
    quantity: Number(item.quantity ?? 0),
    img_url: String(item.img_url ?? "https://placehold.co/900x900?text=Wracket"),
    materials: parsedMaterials,
    sizes: parsedSizes,
  };
}

async function fetchSupabaseInventory(table: string): Promise<InventoryItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("Missing Supabase configuration.");
    return [];
  }
  
  const url = `${supabaseUrl}/rest/v1/${table}?select=id,name,img_url,category,type,keywords,description,materials,sizes,quantity,price&order=id.asc`;

  const response = await fetch(
    url,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.log(`Failed to fetch from Supabase table "${table}". Status: ${response.status}. Response: ${text}`);
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

export async function getInventoryItem(id: number): Promise<InventoryItem | null> {
  const items = await getInventoryItems();
  return items.find((item) => item.id === id) ?? null;
}
