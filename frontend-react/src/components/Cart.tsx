import { useEffect, useState } from "react";
import { getProductsByIds } from "../services/api";
import type { Product } from "../types";

export default function Cart({cart, setCart, setView}: any) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
   

  useEffect(() => {
  async function load() {
    const ids = Object.keys(cart).map(Number);

    if (ids.length === 0) {
      setAllProducts([]);
      return;
    }

      const data = await getProductsByIds(ids);
      setAllProducts(data);
    }

    load();
  }, [cart]);

  const cartArray = Object.entries(cart).map(([id, quantity]) => {
    const product = allProducts.find(p => p.id === Number(id));

    return {
      id: Number(id),
      quantity: Number(quantity),
      name: product?.name,
      price: product?.price
    };
  });

  const total = cartArray.reduce((sum, item) => {
  return sum + item.quantity  * (item.price ?? 0);
}, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>

      {Object.keys(cart).length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <ul>
          {cartArray.map(item => (
            <li key={item.id}>
              {item.name} — {item.quantity} шт — {item.price} грн. Разом: <b>{item.quantity * (item.price ?? 0)}</b> грн.   
            </li>
          ))}
        </ul>
      )}
      <p>
        <b>Загальна сума: {total} грн</b>
      </p>
      <div className="cartButtons">
        <button onClick={() => setView('shop')}>Повернутися до магазину</button>
        <button onClick={() => setCart({})}>Очистити кошик</button>
        <button onClick={() => setView('order')}>Оформити замовлення</button>
      </div>
    </div>
  );
}