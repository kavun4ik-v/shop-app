import { useEffect, useState } from "react";
import { getShops } from "../services/api";
import type { Shop } from "../types";

const API = import.meta.env.VITE_API_URL;

export default function ShopList({ onSelectShop, activeShopId }: any) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops().then(data => setShops(data));
  }, []);

  return (
    <div className="shop-list">
      <h3>Магазини</h3>
      <div >
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
    </div>
  );
}