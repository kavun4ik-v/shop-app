import type { Props } from "../types";

export default function Navigation({ setView }: Props) {
  return (
    <nav>
      <button className="nav-button" onClick={() => setView('shop')}>Shop</button> |
      <button className="nav-button" onClick={() => setView('cart')}>Cart</button>
    </nav>
  );
}