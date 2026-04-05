import { useEffect, useState } from "react";
import type { Product } from "../types";
import { getProducts } from "../services/api";
import M from "materialize-css";

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

    const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  useEffect(() => {
    if (!shopId) return;

    getProducts(shopId).then(data => setProducts(data));
  }, [shopId]); // 🔥 ОЦЕ ГОЛОВНЕ

   const handleAdd = (productId: number, name: string, quantity: number) => {
      setCart((prev) => {
        const updated = { ...prev };

        if (updated[productId]) {
          updated[productId] += quantity;
        } else {
          updated[productId] = quantity;
        }

        return updated;
      });

      M.toast({
          html: `<i class="material-icons left">shopping_cart</i>  ${quantity} x ${name} додано в кошик`,
          classes: "green",
          displayLength: 2000,
        });
    };

  return (
    <div className="row">
      {products.map((p: any) => (
        <div key={p.id} className="col s3">
          <div className="card">
            <div className="card-content">
              <span className="card-title">{p.name}</span>
              <p>Ціна - {p.price} грн/шт</p>
              <input
                  className="input-field"
                  type="number"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setQuantities((prev) => ({
                        ...prev,
                        [p.id]: Number(e.target.value),
                      }))
                    }
                />
            </div>

            <div className="card-action">
              <button className="btn blue" 
                      onClick={() => handleAdd(p.id, p.name,quantities[p.id] || 1)}>
                Додати в кошик
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
