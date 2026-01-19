import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";

export default function Home() {
  const LIMIT = 10;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("")

  const hasMore = products.length < total;

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchProducts({ limit: LIMIT, skip: 0 });
        setProducts(result.products);
        setTotal(result.total);
        setSkip(result.products.length);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function loadMore() {
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const result = await fetchProducts({
        limit: LIMIT,
        skip: skip,
      });
      setProducts((prev) => [...prev, ...result.products]);
      setSkip((prev) => prev + result.products.length);
    } catch (err) {
      console.log(err, "see error");
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }

  function resetPagination() {
    setProducts([]);
    setSkip(0);
    setTotal(0);
  }

  useEffect(() => {
    if (search === "") return;

    async function searchProducts() {
      setLoading(true);
      resetPagination()

      const result = await fetchProducts({ limit: LIMIT, skip: 0, search})

      setProducts(result.products)
      setTotal(result.total)
      setSkip(result.products.length)
      setLoading(false)
    }

    searchProducts()
  }, [search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <div>Home</div>

      <input
        type="text"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <button onClick={() => setSearch(searchInput)}>
Search
      </button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>

      {hasMore ? (
        <button onClick={loadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      ) : (
        <p>No more products</p>
      )}
    </div>
  );
}
