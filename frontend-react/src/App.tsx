import { useState } from "react";
import ShopList from "./components/ShopList";
import LoadProducts from "./components/LoadProducts";
import Navigation from "./components/Navigation";

function App() {
  const [view, setView] = useState<'shop' | 'cart'>('shop');
  const [shopId, setShopId] = useState<number | null>(null);
  

  return (
    <div>
      <Navigation setView={setView} />
        {view === 'shop' && (
          <>
            <ShopList onSelectShop={setShopId} />
            <LoadProducts shopId={shopId} />
          </>
        )}

    </div>
  );
}

export default App;