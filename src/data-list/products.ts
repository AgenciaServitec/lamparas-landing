export type Product = {
  id: string;
  slug: string;
  brand: string;
  code: string;
  title: string;
  price: number;
  sku: string;
  stock: number;
  warranty: string;
  imagePath: string;
  images: string[];
  compatibles?: string[];
};

const normalizeBrand = (brandRaw: string) => {
  const b = (brandRaw || "").trim();
  const map: Record<string, string> = {
    benq: "BenQ",
    epson: "Epson",
    optoma: "Optoma",
    hitachi: "Hitachi",
    panasonic: "Panasonic",
    sony: "Sony",
  };
  return map[b.toLowerCase()] ?? (b ? b : "Generico");
};

const makeSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-");

const parseName = (name: string) => {
  const clean = name.replace(/\n/g, "").trim();
  const [codePart, rest] = clean.split(" para ");
  const code = (codePart ?? clean).trim();
  const brandRaw = (rest ?? "").split(" ")[0]?.trim() || "Generico";
  const brand = normalizeBrand(brandRaw);
  const title = `Lámpara ${code} para ${brand}${rest?.includes(" ") ? "" : ""}`; // simple y consistente
  return { clean, code, brand, title };
};

const priceByBrand: Record<string, number> = {
  Epson: 350,
  BenQ: 380,
  Optoma: 420,
  Hitachi: 390,
  Panasonic: 450,
  Sony: 410,
  Generico: 399,
};

const stockDefault = 10;
const warrantyDefault = "Garantía 3 meses";

const raw = [
  { imagePath: "/images/5jj3s05001-benq.webp", name: "5J.J3S05.001 para Benq", price: 163, stock: 10 },
  { imagePath: "/images/5jj6v05001.webp", name: "5J.J6V05.001 para Benq MS502", price: 0, stock: 0 },
  { imagePath: "/images/bl-fp240e.webp", name: "BL-FP240E para Optoma", price: 144, stock: 10 },
  { imagePath: "/images/bl-fp280c.webp", name: "BL-FP280c para Optoma", price: 164, stock: 10 },
  { imagePath: "/images/dt01021.webp", name: "DT01021 para Hitachi", price: 139, stock: 10 },
  { imagePath: "/images/dt01025.webp", name: "DT01025 para Hitachi", price: 139, stock: 10 },
  { imagePath: "/images/et-lal100.webp", name: "ET-LAL100 para Panasonic", price: 140, stock: 10 },
  { imagePath: "/images/et-lal510.webp", name: "ET-LAL510 para Panasonic", price: 0, stock: 0 },
  { imagePath: "/images/lmp-d213.webp", name: "LMP-D213 para Sony", price: 111, stock: 10 },
  { imagePath: "/images/lmp-e212.webp", name: "LMP-E212 para Sony", price: 150, stock: 10 },
  { imagePath: "/images/elplp50.webp", name: "ELPLP50 para Epson", price: 136, stock: 10 },
  { imagePath: "/images/elplp75.webp", name: "ELPLP75 para Epson", price: 144, stock: 10 },
  { imagePath: "/images/elplp76.webp", name: "ELPLP76 para Epson", price: 152, stock: 10 },
  { imagePath: "/images/elplp79.webp", name: "ELPLP79 para Epson", price: 90, stock: 10 },
  { imagePath: "/images/elplp88.webp", name: "ELPLP88 para Epson",price: 90, stock: 10 },
  { imagePath: "/images/elplp91.webp", name: "ELPLP91 para Epson", price: 144, stock: 10 },
  { imagePath: "/images/elplp95.webp", name: "ELPLP95 para Epson", price: 163, stock: 10 },
  { imagePath: "/images/elplp96.webp", name: "ELPLP96 para Epson", price: 90, stock: 10 },
  { imagePath: "/images/elplp97.webp", name: "ELPLP97 para Epson", price: 140, stock: 10 },
];

export const products: Product[] = raw.map((p, i) => {
  const { code, brand, title } = parseName(p.name);

  const price = p.price;
  const slug = makeSlug(`${code}-${brand}`);
  const id = `prod_${slug}`;

  const images = [p.imagePath];

  return {
    id,
    slug,
    brand,
    code,
    title,
    price,
    sku: code,
    stock: p.stock,
    warranty: warrantyDefault,
    imagePath: p.imagePath,
    images,
  };
});
