const API = import.meta.env.VITE_API_URL;
export const getProducts = (shopId: number) =>
  fetch(`${API}/products?shopId=${shopId}`).then(res => res.json());