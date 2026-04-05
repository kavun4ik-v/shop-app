import { useState } from "react";
import type { ProductCardProps } from "../types";

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="product">
      <p>{product.name}</p>
      <p>{product.price} грн</p>

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button onClick={() => onAdd(product.id, quantity)}>
        Add to cart
      </button>
    </div>
  );
}