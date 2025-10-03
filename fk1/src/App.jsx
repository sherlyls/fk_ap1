import { useMemo, useState } from "react"
import { CategorySelect } from "./components/CategorySelect"
import { ProductSelect } from "./components/ProductSelect"
import { formatIDR } from "./utils/currency"

export default function App() {
  const [category, setCategory] = useState(null)
  const {product, setProduct} = useState(null)

  const price = product?.price ?? 0
  const discount = product?.discountPercentage ?? 0
  const total = useMemo(() => {
    
  })
}
