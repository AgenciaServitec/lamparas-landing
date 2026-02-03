export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  brand: string;
  code: string;
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
  const title = `Lámpara de respuesto compatible ${name}`; // simple y consistente
  return {title };
};

const warrantyDefault = "Garantía 3 meses";

const raw = [
  { imagePath: "/images/5811119560-svv.jpg", name: "5811119560-SVV", brand: "Vivitek", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp55.jpg", name: "ELPLP55", brand: "Epson", price: 85, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp77.png", name: "ELPLP77", brand: "Epson", price: 90, compareAtPrice: 0, stock: 8, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp53.jpg", name: "ELPLP53", brand: "Epson", price: 85, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp25.png", name: "ELPLP25", brand: "Epson", price: 89, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp48.jpg", name: "ELPLP48", brand: "Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp32.jpg", name: "ELPLP32", brand: "Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp33.png", name: "ELPLP33", brand: "Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp34.jpg", name: "ELPLP34", brand: "Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp38.jpg", name: "ELPLP38", brand: "Epson", price: 90, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp39.png", name: "ELPLP39", brand: "Epson", price: 90, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp40.jpg", name: "ELPLP40", brand: "Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp41.png", name: "ELPLP41", brand: "Epson", price: 85, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp42.jpg", name: "ELPLP42", brand: "Epson", price: 85, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp46.jpg", name: "ELPLP46", brand: "Epson", price: 105, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp48.jpg", name: "ELPLP46", brand: "Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp49.jpg", name: "ELPLP49", brand: "Epson", price: 90, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp50.jpg", name: "ELPLP50", brand: "Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp53.jpg", name: "ELPLP53", brand: "Epson", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp54.jpg", name: "ELPLP54", brand: "Epson", price: 85, compareAtPrice: 0, stock: 5, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp56.jpg", name: "ELPLP56", brand: "Epson", price: 90, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp57.jpg", name: "ELPLP57", brand: "Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp61.jpg", name: "ELPLP61", brand: "Epson", price: 80, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp64.jpg", name: "ELPLP64", brand: "Epson", price: 90, compareAtPrice: 0, stock: 3, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp71.jpg", name: "ELPLP71", brand: "Epson", price: 80, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp75.jpg", name: "ELPLP75", brand: "Epson", price: 85, compareAtPrice: 0, stock: 10, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp76.jpg", name: "ELPLP76", brand: "Epson", price: 90, compareAtPrice: 0, stock: 12, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp78.jpg", name: "ELPLP78", brand: "Epson", price: 90, compareAtPrice: 0, stock: 5, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp79.jpg", name: "ELPLP79", brand: "Epson", price: 90, compareAtPrice: 0, stock: 4, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp80.jpg", name: "ELPLP80", brand: "Epson", price: 90, compareAtPrice: 0, stock: 13, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp90.jpg", name: "ELPLP46", brand: "Epson", price: 90, compareAtPrice: 0, stock: 9, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp48.jpg", name: "ELPLP46", brand: "Epson", price: 105, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-lab50.jpg", name: "ET-LAB50", brand: "Panasonic", price: 105, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-lal500.jpg", name: "ET-LAL500", brand: "Panasonic", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-lav100.jpg", name: "ET-LAV100", brand: "Panasonic", price: 105, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-c162.jpg", name: "LMP-C162", brand: "Sony", price: 80, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e190.jpg", name: "LMP-E190", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e212.jpg", name: "LMP-E212", brand: "Sony", price: 85, compareAtPrice: 0, stock: 4, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp87.jpg", name: "ELPLP87", brand: "Epson", price: 90, compareAtPrice: 0, stock: 10, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp88.jpg", name: "ELPLP88", brand: "Epson", price: 90, compareAtPrice: 0, stock: 13, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp91.jpg", name: "ELPLP91", brand: "Epson", price: 90, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp92.jpg", name: "ELPLP92", brand: "Epson", price: 90, compareAtPrice: 0, stock: 1, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp96.jpg", name: "ELPLP96", brand: "Epson", price: 80, compareAtPrice: 0, stock: 8, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp97.jpg", name: "ELPLP97", brand: "Epson", price: 80, compareAtPrice: 0, stock: 13, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/elplp67.jpg", name: "ELPLP67", brand: "Epson", price: 80, compareAtPrice: 0, stock: 8, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/et-laf100.jpg", name: "ET-LAF100", brand: "Panasonic", price: 140, compareAtPrice: 0, stock: 2, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  // { imagePath: "/images/lmp-e211.jpg", name: "LMP-E211", brand: "Sony", price: 85, compareAtPrice: 0, stock: 0, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/5jj3s05001-benq.webp", name: "5J.J3S05.001", brand: "Benq", price: 163, compareAtPrice: 0, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/5jj6v05001.webp", name: "5J.J6V05.001", brand: "Benq", price: 144, stock: 10, lampType: "original", includesIgv: false },
  { imagePath: "/images/bl-fp240e.webp", name: "BL-FP240E", brand: "Optoma", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/bl-fp280c.webp", name: "BL-FP280c", brand: "Optoma", price: 164, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/dt01021.webp", name: "DT01021", brand: "Hitachi", price: 139, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/dt01025.webp", name: "DT01025", brand: "Hitachi", price: 139, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/et-lal100.webp", name: "ET-LAL100", brand: "Panasonic", price: 140, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/et-lal510.webp", name: "ET-LAL510", brand: "Panasonic", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/lmp-d213.webp", name: "LMP-D213", brand: "Sony", price: 111, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/lmp-e212.webp", name: "LMP-E212", brand: "Sony", price: 150, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp50.webp", name: "ELPLP50", brand: "Epson", price: 136, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp75.webp", name: "ELPLP75", brand: "Epson", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp76.webp", name: "ELPLP76", brand: "Epson", price: 152, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp79.webp", name: "ELPLP79", brand: "Epson", price: 90, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp88.webp", name: "ELPLP88", brand: "Epson",price: 90, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp91.webp", name: "ELPLP91", brand: "Epson", price: 144, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp95.webp", name: "ELPLP95", brand: "Epson", price: 163, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp96.webp", name: "ELPLP96", brand: "Epson", price: 90, stock: 10, lampType: "compatible", includesIgv: false },
  { imagePath: "/images/elplp97.webp", name: "ELPLP97", brand: "Epson", price: 140, stock: 10, lampType: "compatible", includesIgv: false },
];

export const products: Product[] = raw.map((p, i) => {
  const { title } = parseName(p.name);

  const slug = makeSlug(`${p.name}`);
  const id = `prod_${slug}`;
  const images = [p.imagePath];

  return {
    id,
    slug,
    title,
    price: p.price,
    brand: p.brand,
    compareAtPrice: (p as any).compareAtPrice,
    sku: p.name,
    code: p.name,
    stock: p.stock,
    warranty: warrantyDefault,
    imagePath: p.imagePath,
    images,
    lampType: (p as any).lampType ?? "compatible",
    includesIgv: (p as any).includesIgv ?? true,
  };

});

