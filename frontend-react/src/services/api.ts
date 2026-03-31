const API = import.meta.env.VITE_API_URL;
export async function getProducts(shopId: number) {
  const res = await fetch(`${API}/products?shopId=${shopId}`);
  return res.json();
}