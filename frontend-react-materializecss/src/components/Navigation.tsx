import type { Props } from "../types";

export default function Navigation({ setView }: Props) {
  return (
    <nav>
      <div className="nav-wrapper blue lighten-2">
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><a href="#" onClick={() => setView('shop')}>Магазин</a></li>
          <li><a href="#" onClick={() => setView('cart')}>Кошик</a></li>
        </ul>
      </div>
    </nav>
  );
}