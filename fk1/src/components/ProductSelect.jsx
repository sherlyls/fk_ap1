import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/api";

export default function ProductSelect({ category, value, onChange, onLoaded }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let abort = false;
    setOptions([]);
    onChange(null);
    if (!category) return;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const products = await getProductsByCategory(category);
        if (!abort) {
          setOptions(products);
          onLoaded?.(products);
        }
      } catch (e) {
        if (!abort) setErr(e.message || "Error");
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => { abort = true; };
  }, [category]);

  return (
    <div className="field">
      <label>Produk</label>
      <select
        value={value?.id || ""}
        onChange={(e) => {
          const id = Number(e.target.value);
          const found = options.find((p) => p.id === id) || null;
          onChange(found);
        }}
        disabled={!category || loading}
      >
        <option value="">-- pilih produk --</option>
        {options.map((p) => (
          <option key={p.id} value={p.id}>
            {`${p.id} - ${p.title}`}
          </option>
        ))}
      </select>

      {loading && <small>Sedang memuat...</small>}
      {err && <small className="error">{err}</small>}

      
    </div>
  );
}
