import { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import { v4 as uuid } from 'uuid';

export default function CategorySelect({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let abort = false;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const cats = await getCategories();
        if (!abort) setOptions(cats);
      } catch (e) {
        if (!abort) setErr(e.message || "Error");
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => { abort = true; };
  }, []);

  return (
    <div className="field">
      <label>Kategori</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={loading}
      >
        <option value="">-- pilih kategori --</option>
        {options.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {loading && <small>Sedang memuat...</small>}
      {err && <small className="error">{err}</small>}
    </div>
  );
}
