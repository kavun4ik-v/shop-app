const API = import.meta.env.VITE_API_URL;
export async function getProducts(shopId: number) {
  const res = await fetch(`${API}/products?shopId=${shopId}`);
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(`${API}/products`);
  return res.json();
}

export async function getProductsByIds(ids: number[]) {
  const res = await fetch(`${API}/products/by-ids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ids })
  });
  console.log(ids);
  return res.json();
}