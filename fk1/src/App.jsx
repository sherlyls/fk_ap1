import { useMemo, useState } from "react";
import CategorySelect from "./components/CategorySelect";
import ProductSelect from "./components/ProductSelect";
import { formatIDR } from "./utils/currency";

export default function App() {
  const [category, setCategory] = useState(null);
  const [product, setProduct]   = useState(null);

  // DummyJSON field:
  // product.price               -> number
  // product.discountPercentage  -> number (0..x)
  const price   = product?.price ?? 0;
  const discount = product?.discountPercentage ?? 0;
  const total = useMemo(() => {
    const after = price * (1 - (discount / 100));
    // pembulatan agar tampil rapi
    return Math.round(after);
  }, [price, discount]);

  return (
    <div className="container">
      <h1>Demo Mirip Tes (Tanpa React Query)</h1>

      <div className="card">
        <CategorySelect value={category} onChange={setCategory} />

        <ProductSelect
          category={category}
          value={product}
          onChange={setProduct}
        />

        <div className="field">
          <label>Description</label>
          <textarea
            readOnly
            value={product?.description || ""}
            rows={3}
            placeholder="Deskripsi produk akan muncul di sini"
          />
        </div>

        <div className="row">
          <div className="field half">
            <label>Harga</label>
            <input readOnly value={formatIDR(price)} />
          </div>
          <div className="field half">
            <label>Discount (%)</label>
            <input readOnly value={discount} />
          </div>
        </div>

        <div className="field">
          <label>Total (Harga × (1 − Diskon%))</label>
          <input readOnly value={formatIDR(total)} />
        </div>
      </div>

      <footer>
        <small>
          Sumber API: <a href="https://dummyjson.com/docs/products" target="_blank" rel="noreferrer">DummyJSON Products</a>
        </small>
      </footer>
    </div>
  );
}
