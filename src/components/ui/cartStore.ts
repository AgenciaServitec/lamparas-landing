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

    // normaliza forma: qty siempre existe
    return items
      .filter((x) => x && x.id)
      .map((x) => ({
        id: x.id,
        slug: x.slug ?? "",
        code: x.code ?? "",
        brand: x.brand ?? "",
        name: x.name ?? x.title ?? "",
        price: Number(x.price ?? 0),
        imagePath: x.imagePath ?? x.image ?? "",
        qty: Number(x.qty ?? x.quantity ?? 1),
      }));
  } catch {
    return [];
  }
}

export const setCart = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: items }));
};

export const addToCart = (item: Omit<CartItem, "qty">) => {
  const cart = getCart();
  const existing = cart.find((x) => x.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  setCart(cart);
};

export const getCartCount = () =>
  getCart().reduce((acc, x) => acc + x.qty, 0);
