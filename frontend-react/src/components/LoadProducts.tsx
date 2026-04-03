import { useEffect } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";
import { getProducts } from "../services/api";

type CartType = Record<number, number>;

export default function LoadProducts({ 
    shopId, 
    setProducts, 
    products,
    setCart }: { 
      shopId: number | null ,
      setProducts: (products: Product[]) => void, 
      products: Product[],
      setCart: React.Dispatch<React.SetStateAction<CartType>>
    }) {
  
  useEffect(() => {
    if (!shopId) return;

    getProducts(shopId).then(data => setProducts(data));
  }, [shopId]); // 🔥 ОЦЕ ГОЛОВНЕ

   const handleAdd = (productId: number, quantity: number) => {
      setCart((prev) => {
        const updated = { ...prev };

        if (updated[productId]) {
          updated[productId] += quantity;
        } else {
          updated[productId] = quantity;
        }

        return updated;
      });
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