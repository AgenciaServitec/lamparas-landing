export type CartItem = {
  id: string;
  slug: string;
  code: string;
  brand: string;
  name: string;
  price: number;
  imagePath: string;
  qty: number;
};

const STORAGE_KEY = "servitec_cart_v1";

function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(items)) return [];

    return items
      .filter((x) => x && x.id)
      .map((x) => {
        const code = x.code ?? "";
        const brand = x.brand ?? "";
        const fallbackName =
          x.name ??
          x.title ??
          (code && brand ? `Lámpara ${code} para ${brand}` : code || "Producto");

        return {
          id: String(x.id),
          slug: String(x.slug ?? ""),
          code: String(code),
          brand: String(brand),
          name: String(fallbackName),
          price: Number(x.price ?? 0),
          imagePath: String(x.imagePath ?? x.image ?? ""),
          qty: Number(x.qty ?? x.quantity ?? 1),
        };
      });
  } catch {
    return [];
  }
}

function setCart(items:CartItem[]) {
  const normalized = Array.isArray(items) ? items : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: normalized }));
}

export const addToCart = (item: Omit<CartItem, "qty">) => {
  const cart = getCart();
  const existing = cart.find((x) => x.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  setCart(cart);
};

export const getCartCount = () =>
  getCart().reduce((acc, x) => acc + x.qty, 0);
