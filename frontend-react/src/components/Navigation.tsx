import type { Props } from "../types";

export default function Navigation({ setView }: Props) {
  return (
    <nav>
      <button className="nav-button" onClick={() => setView('shop')}>Магазин</button> |
      <button className="nav-button" onClick={() => setView('cart')}>Кошик</button>
    </nav>
  );
}