export type Product = {
  id: string;
  slug: string;
  brand: string;
  code: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  warranty: string;
  imagePath: string;
  images: string[];
  compatibles?: string[];
  lampType?: "compatible" | "original";
  includesIgv?: boolean;
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

const warrantyDefault = "Garantía 3 meses";

const raw = [
  { imagePath: "/images/5811119560-svv.jpg", name: "5811119560-SVV para Vivitek", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp55.jpg", name: "ELPLP55 para Epson", price: 85, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp77.png", name: "ELPLP77 para Epson", price: 90, compareAtPrice: 0, stock: 8, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp53.jpg", name: "ELPLP53 para Epson", price: 85, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp25.png", name: "ELPLP25 para Epson", price: 89, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp48.jpg", name: "ELPLP48 para Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp32.jpg", name: "ELPLP32 para Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp33.png", name: "ELPLP33 para Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp34.jpg", name: "ELPLP34 para Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp38.jpg", name: "ELPLP38 para Epson", price: 90, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp39.png", name: "ELPLP39 para Epson", price: 90, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp40.jpg", name: "ELPLP40 para Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp41.png", name: "ELPLP41 para Epson", price: 85, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp42.jpg", name: "ELPLP42 para Epson", price: 85, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp46.jpg", name: "ELPLP46 para Epson", price: 105, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp48.jpg", name: "ELPLP46 para Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp49.jpg", name: "ELPLP49 para Epson", price: 90, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp50.jpg", name: "ELPLP50 para Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp53.jpg", name: "ELPLP53 para Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp54.jpg", name: "ELPLP54 para Epson", price: 85, compareAtPrice: 0, stock: 5, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp56.jpg", name: "ELPLP56 para Epson", price: 90, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp57.jpg", name: "ELPLP57 para Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp61.jpg", name: "ELPLP61 para Epson", price: 80, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp64.jpg", name: "ELPLP64 para Epson", price: 90, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp71.jpg", name: "ELPLP71 para Epson", price: 80, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp75.jpg", name: "ELPLP75 para Epson", price: 85, compareAtPrice: 0, stock: 10, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp76.jpg", name: "ELPLP76 para Epson", price: 90, compareAtPrice: 0, stock: 12, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp78.jpg", name: "ELPLP78 para Epson", price: 90, compareAtPrice: 0, stock: 5, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp79.jpg", name: "ELPLP79 para Epson", price: 90, compareAtPrice: 0, stock: 4, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp80.jpg", name: "ELPLP80 para Epson", price: 90, compareAtPrice: 0, stock: 13, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp90.jpg", name: "ELPLP46 para Epson", price: 90, compareAtPrice: 0, stock: 9, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp48.jpg", name: "ELPLP46 para Epson", price: 105, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-lab50.jpg", name: "ET-LAB50 para Panasonic", price: 105, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-lal500.jpg", name: "ET-LAL500 para Panasonic", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-lav100.jpg", name: "ET-LAV100 para Panasonic", price: 105, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-c162.jpg", name: "LMP-C162 para Sony", price: 80, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e190.jpg", name: "LMP-E190 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e212.jpg", name: "LMP-E212 para Sony", price: 85, compareAtPrice: 0, stock: 4, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp87.jpg", name: "ELPLP87 para Epson", price: 90, compareAtPrice: 0, stock: 10, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp88.jpg", name: "ELPLP88 para Epson", price: 90, compareAtPrice: 0, stock: 13, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp91.jpg", name: "ELPLP91 para Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp92.jpg", name: "ELPLP92 para Epson", price: 90, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp96.jpg", name: "ELPLP96 para Epson", price: 80, compareAtPrice: 0, stock: 8, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp97.jpg", name: "ELPLP97 para Epson", price: 80, compareAtPrice: 0, stock: 13, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp67.jpg", name: "ELPLP67 para Epson", price: 80, compareAtPrice: 0, stock: 8, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-laf100.jpg", name: "ET-LAF100 para Panasonic", price: 140, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211 para Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/5jj3s05001-benq.webp", name: "5J.J3S05.001 para Benq", price: 163, compareAtPrice: 0, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/5jj6v05001.webp", name: "5J.J6V05.001 para Benq MS502", price: 144, stock: 10, lampType: "original", includesIgv: false },
  { imagePath: "/images/bl-fp240e.webp", name: "BL-FP240E para Optoma", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/bl-fp280c.webp", name: "BL-FP280c para Optoma", price: 164, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/dt01021.webp", name: "DT01021 para Hitachi", price: 139, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/dt01025.webp", name: "DT01025 para Hitachi", price: 139, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/et-lal100.webp", name: "ET-LAL100 para Panasonic", price: 140, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/et-lal510.webp", name: "ET-LAL510 para Panasonic", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/lmp-d213.webp", name: "LMP-D213 para Sony", price: 111, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/lmp-e212.webp", name: "LMP-E212 para Sony", price: 150, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp50.webp", name: "ELPLP50 para Epson", price: 136, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp75.webp", name: "ELPLP75 para Epson", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp76.webp", name: "ELPLP76 para Epson", price: 152, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp79.webp", name: "ELPLP79 para Epson", price: 90, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp88.webp", name: "ELPLP88 para Epson",price: 90, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp91.webp", name: "ELPLP91 para Epson", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp95.webp", name: "ELPLP95 para Epson", price: 163, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp96.webp", name: "ELPLP96 para Epson", price: 90, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp97.webp", name: "ELPLP97 para Epson", price: 140, stock: 10, lampType: "compatible", includesIgv: false },
];

export const products: Product[] = raw.map((p, i) => {
  const { code, brand, title } = parseName(p.name);

  const slug = makeSlug(`${code}-${brand}`);
  const id = `prod_${slug}`;
  const images = [p.imagePath];

  return {
    id,
    slug,
    brand,
    code,
    title,
    price: p.price,
    compareAtPrice: (p as any).compareAtPrice,
    sku: code,
    stock: p.stock,
    warranty: warrantyDefault,
    imagePath: p.imagePath,
    images,
    lampType: (p as any).lampType ?? "compatible",
    includesIgv: (p as any).includesIgv ?? true,
  };

});

