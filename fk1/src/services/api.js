const BASE = 'https://dummyjson.com';

// export async function getCategories() {
//     const res = await fetch(`${BASE}/products/categories`)
//     if (!res.ok) throw new Error("Gagal ambil kategori")
//     return await res.json()
// }

export async function getCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Gagal ambil kategori");
  const raw = await res.json();

  // Pastikan array string unik
  const names = (Array.isArray(raw) ? raw : []).map((c) => {
    if (typeof c === "string") return c;
    // jika objek, pilih field yang paling stabil
    return c?.slug || c?.name || c?.title || String(c?.id ?? "");
  }).filter(Boolean);

  // buang duplikat
  return Array.from(new Set(names));
}
export async function getProductsByCategory(category) {
    if (!category) return []
    // const res = await fetch(`${BASE}/products/category/${encodedURIComponent(category)}`)
    const safeCategory = typeof encodeURIComponent === "function"
  ? encodeURIComponent(category)
  : category;

const res = await fetch(`${BASE}/products/category/${safeCategory}`);
    if (!res.ok) throw new Error("Gagal ambil produk")
    const json = await res.json()
    return json.products || []
    

}