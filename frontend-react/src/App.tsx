import { useState } from "react";
import ShopList from "./components/ShopList";
import LoadProducts from "./components/LoadProducts";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";
import type { Product } from "./types";

function App() {
  const [view, setView] = useState<'shop' | 'cart'>('shop');
  const [shopId, setShopId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  

  return (
    <div>
      <Navigation setView={setView} />
        {view === 'shop' && (
          <>
            <ShopList onSelectShop={setShopId} activeShopId={shopId} />
            <LoadProducts shopId={shopId} setProducts={setProducts} products={products}/>
          </>
        )}
        {view === 'cart' && (
          <Cart />
        )}

    </div>
  );
}

export default App;