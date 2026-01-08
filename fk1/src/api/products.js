const BASE_URL = 'https://dummyjson.com/products'


export async function fetchProducts({ limit = 10, skip = 0}) {
    const res = await fetch(
        `${BASE_URL}?limit=${limit}&skip=${skip}`
    )
    if(!res.ok) {
        throw new Error('Gagal mengambil produk')
    } 
    return res.json()
}