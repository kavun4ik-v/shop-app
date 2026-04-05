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
  return res.json();
}

export async function createOrder(data: any) {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    // 🔥 ОЦЕ ГОЛОВНЕ
    throw new Error(result.error || "Server error");
  }

  return result;
}

export async function getShops() {
  const res = await fetch(`${API}/shops`);
  return res.json();
}