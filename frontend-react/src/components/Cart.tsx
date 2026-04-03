import { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import { getProductsByIds } from "../services/api";
import type { Product } from "../types";

export default function Cart() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const cartItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : {};

    

  useEffect(() => {
    async function load() {
      const ids = Object.keys(cartItems).map(Number);
      const data = await getProductsByIds(ids);
      setAllProducts(data);
    }
    load();
  }, []);

  const cartArray = Object.entries(cartItems).map(([id, quantity]) => {
    const product = allProducts.find(p => p.id === Number(id));

    return {
      id: Number(id),
      quantity,
      name: product?.name,
      price: product?.price
    };
  });

  const total = cartArray.reduce((sum, item) => {
  return sum + (item.quantity as number) * (item.price ?? 0);
}, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>

      {Object.keys(cartItems).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartArray.map(item => (
            <li key={item.id}>
              {item.name} — {item.quantity as number} шт — {item.price} грн. Разом: <b>{(item.quantity as number) * (item.price as number)}</b> грн.   
            </li>
          ))}
        </ul>
      )}
      <p>
        <b>Загальна сума: {total} грн</b>
      </p>
    </div>
  );
}