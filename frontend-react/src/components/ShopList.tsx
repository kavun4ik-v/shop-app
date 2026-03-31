import { useEffect, useState } from "react";
import type { Shop } from "../types";

const API = import.meta.env.VITE_API_URL;

export default function ShopList({ onSelectShop, activeShopId }: any) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(`${API}/shops`)
      .then(res => res.json())
      .then(data => setShops(data));
  }, []);

  return (
    <div className="shop">
      {shops.map((shop: Shop) => (
        <div
          key={shop.id}
          className={`shop ${activeShopId === shop.id ? 'active' : ''}`}
          onClick={() => onSelectShop(shop.id)}
        >
          {shop.name}
        </div>
      ))}
    </div>
  );
}