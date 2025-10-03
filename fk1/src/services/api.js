const BASE = 'https://dummyjson.com';

export async function getCategories() {
    const res = await fetch(`${BASE}/products/categories`)
    if (!res.ok) throw new Error("Gagal ambil kategori")
    return await res.json()
}

export async function getProducsByCategory(category) {
    if (!category) return []
    const res = await fetch(`${BASE}/products/category/${encodedURIComponent(category)}`)
    if (!res.ok) throw new Error("Gagal ambil produk")
    const json = await res.json()
    return json.products || []
    

}