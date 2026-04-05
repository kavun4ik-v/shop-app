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
  <div className="container">
    <div className="card">
      <div className="card-content">
        <span className="card-title">Кошик</span>

        {Object.keys(cart).length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <ul className="collection">
            {cartArray.map(item => (
              <li key={item.id} className="collection-item">
                <div>
                  <b>{item.name}</b>
                  <br />
                  {item.quantity} шт × {item.price} грн
                  <span className="secondary-content">
                    <b>{item.quantity * (item.price ?? 0)} грн</b>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h5 className="right-align">
          Загальна сума: <b>{total} грн</b>
        </h5>
      </div>

      <div className="card-action">
        <button 
          className="btn grey"
          onClick={() => setView('shop')}
        >
          Назад
        </button>

        <button 
          className="btn red"
          onClick={() => setCart({})}
          style={{ marginLeft: "10px" }}
        >
          Очистити
        </button>

        <button 
          className="btn green right"
          onClick={() => setView('order')}
        >
          Оформити
        </button>
      </div>
    </div>
  </div>
);
}