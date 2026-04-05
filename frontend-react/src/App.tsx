import { useState, useEffect } from "react";
import ShopList from "./components/ShopList";
import LoadProducts from "./components/LoadProducts";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";
import type { Product } from "./types";

function App() {

  type CartType = Record<number, number>;

  const [shopId, setShopId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'shop' | 'cart' | 'order'>('shop');
  const [cart, setCart] = useState<CartType>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : {};
  });

  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);  
 
  return (
    <div className="app">
      <Navigation setView={setView} />
        <div className="layout">
          {view === 'shop' && (
            <>              
              <ShopList onSelectShop={setShopId} activeShopId={shopId} />
              <LoadProducts shopId={shopId} 
                  setProducts={setProducts}
                  products={products}
                  setCart={setCart}/>
            </>
          )}
          {view === 'cart' && (
            <Cart cart={cart} setCart={setCart} setView={setView}/>
          )}
          {view === 'order' && (
            <OrderForm setView={setView} cart={cart} shopId={shopId} setCart={setCart}/>
          )}
      </div>
    </div>
  );
}

export default App;