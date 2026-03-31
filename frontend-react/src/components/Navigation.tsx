import type { Props } from "../types";

export default function Navigation({ setView }: Props) {
  return (
    <nav>
      <button onClick={() => setView('shop')}>Shop</button> |
      <button onClick={() => setView('cart')}>Cart</button>
    </nav>
  );
}