import { useState } from "react";

export default function ProductCard({ product, onAdd }: any) {
  const [quantity, setQuantity] = useState(1);

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