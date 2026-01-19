const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts({ limit = 10, skip = 0, search = "" }) {
  let url = `${BASE_URL}?limit=${limit}&skip=&{skip}`;

  if (search) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(
      search
    )}&limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Gagal mengambil produk");
  }
  return res.json();
}
