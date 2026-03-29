/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

// ===== API =====
const API_URL: string = import.meta.env.VITE_API_URL;
async function loadShops() {
  const res = await fetch(`${API_URL}/shops`);
  return await res.json();
}

async function loadProducts(shopId: number) {
  const res = await fetch(`${API_URL}/products?shopId=${shopId}`);
  return await res.json();
}

// ===== STATE =====
interface CartItemRaw {
  id?: number | string;
  productId?: number | string;
  shopId?: number | string;
  name?: string;
  price?: number | string;
  quantity?: number | string;
}

interface CartItem {
  id: number;
  productId: number;
  shopId: number;
  name: string;
  price: number;
  quantity: number;
}

let currentShopId: number | null = null;
let productsMap = new Map<number, any>();

// ===== DOM =====
const body = document.body;

const app = document.createElement('div');
app.className = 'app';
body.appendChild(app);

// NAV
const nav = document.createElement('nav');
nav.innerHTML = `
  <a id="shopLink" href="#">Shop</a> |
  <a id="cartLink" href="#">Cart</a>
`;
app.appendChild(nav);

// MAIN VIEW
const mainView = document.createElement('div');
mainView.className = 'main';
app.appendChild(mainView);

// SHOPS
const shopsDiv = document.createElement('div');
shopsDiv.className = 'shops';

// PRODUCTS
const productsDiv = document.createElement('div');
productsDiv.className = 'products';

mainView.appendChild(shopsDiv);
mainView.appendChild(productsDiv);

// CART VIEW
const cartView = document.createElement('div');
cartView.className = 'cart hidden';
app.appendChild(cartView);

// ===== Order form =====
const orderForm = document.createElement('div');
orderForm.className = 'order-form hidden';
orderForm.innerHTML = `
  <div class="order-form">
  <h2>Order Form</h2>
  <p>Here you can implement the order form with user details and payment options.</p>
  <input id="email" placeholder="Email" />
  <input id="phone" placeholder="Phone" />
  <input id="address" placeholder="Address" />
  <button id="submitOrder">Submit order</button>
  <button id="backToCart">Back to Cart</button>
</div>
`;
app.appendChild(orderForm);

// Attach submit listener once the form is created
document.getElementById('submitOrder')?.addEventListener('click', submitOrder);
document.getElementById('backToCart')?.addEventListener('click', () => {
  showCart();
});

// ===== CART STORAGE =====
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart: any) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId: number, quantity: number) {
  const cart = getCart();

  const product = productsMap.get(productId);
  if (!product) return; // can't add unknown product

  const existing = cart.find((i: any) => i.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      productId,
      quantity,
      name: product.name,
      price: product.price,
      shopId: currentShopId
    });
  }

  saveCart(cart);
}

// ===== INIT =====
async function init() {
  const shops = await loadShops();

  shopsDiv.innerHTML = shops.map((shop: any) => `
    <div class="shop" data-id="${shop.id}">
      ${shop.name}
    </div>
  `).join('');
}

init();

// ===== EVENTS =====

// SHOP CLICK
shopsDiv.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  const shopEl = target.closest('.shop') as HTMLElement;
  if (!shopEl) return;

  const newShopId = Number(shopEl.dataset.id);

  // If switching shops, clear cart to avoid mixed shop orders
  // if (currentShopId && currentShopId !== newShopId) {
  //   localStorage.removeItem('cart');
  //   console.log('🛒 Cart cleared due to shop change');
  // }

  currentShopId = newShopId;

  shopsDiv.querySelectorAll('.shop').forEach(s => s.classList.remove('active'));
  shopEl.classList.add('active');

  const products = await loadProducts(currentShopId);

  products.forEach((p: any) => {
  productsMap.set(p.id, p);
});

  productsDiv.innerHTML = products.map((p: any) => `
    <div class="product">
      <p>${p.name}</p>
      <p>${p.price} грн</p>
      <input type="number" class="quantity" value="1" min="1" /><br />
      <button data-id="${p.id}">Add</button>
    </div>
  `).join('');
});

// ADD TO CART
productsDiv.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target.tagName === 'BUTTON') {
    const productId = Number(target.dataset.id);

    const productDiv = target.closest('.product') as HTMLElement;
    const input = productDiv.querySelector('.quantity') as HTMLInputElement;

    const quantity = Math.max(1, Number(input.value) || 1);

    addToCart(productId, quantity);
      alert(`Added to cart: ${productsMap.get(productId)?.name} x${quantity}`);
  }
});

// NAVIGATION
document.getElementById('cartLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  showCart();
});

document.getElementById('shopLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  showMain();
});

// ===== VIEWS =====
function hideAllViews() {
  mainView.classList.add('hidden');
  cartView.classList.add('hidden');
  orderForm.classList.add('hidden');
}

function showCart() {
  hideAllViews();
  cartView.classList.remove('hidden');
  renderCart();
}

function showMain() {
  hideAllViews();
  mainView.classList.remove('hidden');
}

function showOrderForm() {
  hideAllViews();
  orderForm.classList.remove('hidden');
}

async function submitOrder() {
  try {
  const email = (document.getElementById('email') as HTMLInputElement | null)?.value.trim();
  const phone = (document.getElementById('phone') as HTMLInputElement | null)?.value.trim();
  const address = (document.getElementById('address') as HTMLInputElement | null)?.value.trim();

  if (!email || !phone || !address) {
    alert('Please fill in all order fields.');
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    alert('Your cart is empty. Add items before submitting.');
    showMain();
    return;
  }

  if (!currentShopId) {
    alert('Please select a shop first.');
    showMain();
    return;
  }

  // Normalize cart items to numbers and ensure they belong to current shop
  const normalizedCart: CartItem[] = (cart as CartItemRaw[]).map((item) => ({
    id: Number(item.id ?? item.productId),
    productId: Number(item.productId ?? item.id),
    shopId: Number(item.shopId),
    name: String(item.name ?? ''),
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));

  // const mismatch = normalizedCart.filter((item: CartItem) => item.shopId !== Number(currentShopId));
  // if (mismatch.length > 0) {
  //   alert('Your cart contains products from a different shop. Please clear cart and re-add products.');
  //   console.warn('Cart shop mismatch', mismatch);
  //   showMain();
  //   return;
  // }

  const normalizedItems = normalizedCart.map(item => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const payload = {
    email,
    phone,
    address,
    shopId: Number(currentShopId),
    items: normalizedItems,
  };

    const res = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log('Submitting order with data:', payload);
    console.log('Submitting order with data:', {
      email,
      phone,
      address,
      shopId: currentShopId,
      items: cart
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.error || 'Failed to submit order');
    }

    const data = await res.json();
    console.log('✅ Order created:', data);

    alert('Order submitted successfully! Thank you.');

    localStorage.removeItem('cart');
    renderCart();
    showMain();
  } catch (err: any) {
    console.error('Order submit error:', err);
    alert(`Order submission failed: ${err?.message || err}`);
  }
}

// ===== RENDER CART =====
function renderCart() {
  const cart = getCart();

  let total = 0;

  const html = cart.map((item: any) => {
    const sum = item.price * item.quantity;
    total += sum;

    return `
      <div>
        ${item.name} | ${item.quantity} x ${item.price} = ${sum}
      </div>
    `;
  }).join('');

  cartView.innerHTML = `
    <h2>Cart</h2>
    ${html}
    <h3>Total: ${total} грн</h3>
    <button id="clearCart">Clear cart</button>
    <button id="backToShop">Back to Shop</button>
    <button id="makeOrder">Make Order</button>
  `;

  document.getElementById('clearCart')?.addEventListener('click', () => {
    localStorage.removeItem('cart');
    renderCart();
  });

  document.getElementById('backToShop')?.addEventListener('click', showMain);
  document.getElementById('makeOrder')?.addEventListener('click', showOrderForm);
}