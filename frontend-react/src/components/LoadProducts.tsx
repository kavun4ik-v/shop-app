import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_API_URL;

export default function LoadProducts({ shopId }: any) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!shopId) return;

    fetch(`${API}/products?shopId=${shopId}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [shopId]); // 🔥 ОЦЕ ГОЛОВНЕ

   const handleAdd = (productId: number, quantity: number) => {
    console.log("ADD:", productId, quantity);
    localStorage.setItem(`cart`, JSON.stringify({
      ...JSON.parse(localStorage.getItem(`cart`) || "{}"),
      [productId]: (JSON.parse(localStorage.getItem(`cart`) || "{}")[productId] || 0) + quantity
    }));
  };

  return (
        <div className="products">
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={handleAdd}
            />
        ))}
        </div>
  );
}