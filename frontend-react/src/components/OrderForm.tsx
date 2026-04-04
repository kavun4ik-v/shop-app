import { useState } from "react";
import { createOrder } from "../services/api";

export default function OrderForm({setView, cart, shopId, setCart}: any) {

    const items = Object.entries(cart).map(([productId, quantity]) => ({
                productId: Number(productId),
                quantity: Number(quantity)
                }));
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return   (
            <div className="order-form">
                <h2>Форма замовлення</h2>
                <p>Введіть ваші контактні дані</p>
                    <input id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
                    <input id="phone" placeholder="Телефон" onChange={(e) => setPhone(e.target.value)} disabled={isLoading}/>
                    <input id="address" placeholder="Адреса" onChange={(e) => setAddress(e.target.value)} disabled={isLoading}/>
                <button
                        id="submitOrder"
                        disabled={isLoading || !email || !phone || !address}
                        onClick={async () => {
                            setIsLoading(true);

                            const data = {
                            email,
                            phone,
                            address,
                            shopId,
                            items
                            };

                            try {
                            await createOrder(data);
                            setCart({});
                            setView('shop');
                            } catch (err) {
                            alert("❌ Замовлення не пройшло");
                            console.error(err);
                            } finally {
                            setIsLoading(false);
                            }
                        }}
                        >
                        {isLoading ? "⏳ Обробка..." : "Замовити"}
                        </button>
                <button id="backToCart" onClick={() => {setView('cart')}}>Повернутися до кошика</button>
            </div>
            );
};