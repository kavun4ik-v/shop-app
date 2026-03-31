import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";
import { getProducts } from "../services/api";

export default function LoadProducts({ shopId }: { shopId: number | null }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!shopId) return;

    getProducts(shopId)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [shopId]); // 🔥 ОЦЕ ГОЛОВНЕ

   const handleAdd = (productId: number, quantity: number) => {
    //console.log("ADD:", productId, quantity);
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