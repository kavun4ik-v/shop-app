import { useState } from "react";
import { createOrder } from "../services/api";
import M from "materialize-css";

export default function OrderForm({setView, cart, shopId, setCart}: any) {

    const items = Object.entries(cart).map(([productId, quantity]) => ({
                productId: Number(productId),
                quantity: Number(quantity)
                }));
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

   return (
  <div className="container">
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Форма замовлення</span>
            <p>Введіть ваші контактні дані</p>

            <div className="input-field">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                disabled={isLoading}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhone(e.target.value)
                }
                disabled={isLoading}
              />
              <label htmlFor="phone">Телефон</label>
            </div>

            <div className="input-field">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
                disabled={isLoading}
              />
              <label htmlFor="address">Адреса</label>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn grey"
              onClick={() => setView("cart")}
              disabled={isLoading}
            >
              Назад
            </button>

            <button
              className="btn green right"
              disabled={isLoading || !email || !phone || !address}
              onClick={async () => {
                setIsLoading(true);

                const data = {
                  email,
                  phone,
                  address,
                  shopId,
                  items,
                };

                try {
                  await createOrder(data);
                  M.toast({
                    html: "✅ Замовлення створено",
                    classes: "green",
                    displayLength: 3000,
                    });
                  setCart({});
                  setView("shop");
                } catch (err: any) {
                    console.log("ERROR:", err); // 👈 подивись що там

                    M.toast({
                        html: err.message || "❌ Помилка",
                        classes: "red",
                    });
                    } finally {
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? "⏳ Обробка..." : "Замовити"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};