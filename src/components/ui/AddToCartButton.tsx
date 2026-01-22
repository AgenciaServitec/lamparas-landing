import React, { useMemo, useState } from "react";
import { addToCart } from "../../utils/cartStore.ts";

type Product = {
  id: string;
  slug: string;
  code: string;
  brand: string;
  name: string;
  price: number;
  stock: number;
  imagePath: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const disabled = product.stock <= 0;
  const [added, setAdded] = useState(false);

  const isBlocked = disabled || added;

  const label = useMemo(() => {
    if (disabled) return "Agotado";
    if (added) return "Agregado ✓";
    return "Agregar al carrito";
  }, [disabled, added]);

  const onAdd = () => {
    if (isBlocked) return;

    addToCart({
      id: product.id,
      slug: product.slug,
      code: product.code,
      brand: product.brand,
      name: product.name,
      price: product.price,
      imagePath: product.imagePath,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={disabled}
      aria-disabled={isBlocked}
      aria-live="polite"
      className={[
        "w-full rounded-xl py-3 font-semibold transition",
        "shadow-sm hover:shadow-md active:scale-[0.99]",
        disabled
          ? "bg-white/10 text-muted cursor-not-allowed"
          : added
            ? "bg-success/20 text-success border border-success/30 cursor-default"
            : "bg-primary text-black hover:bg-primary-hover",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
