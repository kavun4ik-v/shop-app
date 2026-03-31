import { useState } from "react";
import ShopList from "./components/ShopList";
import LoadProducts from "./components/LoadProducts";
import Navigation from "./components/Navigation";

function App() {
  const [shopId, setShopId] = useState<number | null>(null);

  return (
    <div>
      <Navigation />
      <ShopList onSelectShop={setShopId} activeShopId={shopId} />
      <LoadProducts shopId={shopId} />
    </div>
  );
}

export default App;