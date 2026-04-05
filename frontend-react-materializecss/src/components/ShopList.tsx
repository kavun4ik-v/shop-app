import { useEffect, useState } from "react";
import { getShops } from "../services/api";
import type { Shop } from "../types";


export default function ShopList({ onSelectShop, activeShopId }: any) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops().then(data => setShops(data));
  }, []);

  return (
    <div className="card col s2">
      <div className="card-content">
        <span className="card-title">Магазини</span>

        <ul className="collection">
          {shops.map((shop: Shop) => (
            <li
              key={shop.id}
              className="collection-item"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectShop(shop.id)}
            >
              {shop.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}