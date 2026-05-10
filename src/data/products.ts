import earringsImg from "@/assets/product-earrings.jpg";
import banglesImg from "@/assets/product-bangles.jpg";
import necklaceImg from "@/assets/product-necklace.jpg";
import ringImg from "@/assets/product-ring.jpg";
import lipstickImg from "@/assets/product-lipstick.jpg";
import eyeshadowImg from "@/assets/product-eyeshadow.jpg";
import foundationImg from "@/assets/product-foundation.jpg";
import brushesImg from "@/assets/product-brushes.jpg";
import clutchImg from "@/assets/product-clutch.jpg";
import toteImg from "@/assets/product-tote.jpg";
import crossbodyImg from "@/assets/product-crossbody.jpg";
import minibagImg from "@/assets/product-minibag.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "jewellery" | "cosmetics" | "purses";
  subcategory?: string;
  price: number;
  regularPrice?: number;
  currency: string;
  images: string[];
  description: string;
  details: string[];
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "j1",
    slug: "emerald-jhumka-earrings",
    name: "Emerald Jhumka Earrings",
    category: "jewellery",
    price: 12500,
    currency: "PKR",
    images: [earringsImg],
    description: "Handcrafted gold jhumka earrings adorned with natural emerald stones. A timeless piece that embodies Pakistani bridal elegance.",
    details: ["22K gold plated brass", "Natural emerald stones", "Handcrafted filigree work", "Jhumka drop: 4.5 cm", "Weight: 18g per pair"],
    isNew: true,
  },
  {
    id: "j2",
    slug: "heritage-gold-bangles",
    name: "Heritage Gold Bangles",
    category: "jewellery",
    price: 18000,
    currency: "PKR",
    images: [banglesImg],
    description: "Set of intricately designed gold bangles featuring traditional Pakistani filigree patterns. Perfect for festive occasions.",
    details: ["22K gold plated", "Set of 4 bangles", "Traditional filigree design", "Inner diameter: 6.5 cm", "Weight: 45g total"],
    isNew: true,
  },
  {
    id: "j3",
    slug: "royal-emerald-necklace",
    name: "Royal Emerald Necklace",
    category: "jewellery",
    price: 35000,
    currency: "PKR",
    images: [necklaceImg],
    description: "A statement necklace featuring a large emerald pendant surrounded by intricate gold filigree work. The centerpiece of any bridal set.",
    details: ["22K gold plated brass", "Natural emerald pendant", "Adjustable chain length", "Pendant drop: 6 cm", "Weight: 65g"],
  },
  {
    id: "j4",
    slug: "emerald-filigree-ring",
    name: "Emerald Filigree Ring",
    category: "jewellery",
    price: 9500,
    currency: "PKR",
    images: [ringImg],
    description: "A stunning emerald-cut stone set in an ornate gold filigree band. A bold yet elegant statement piece.",
    details: ["22K gold plated", "Lab-created emerald", "Adjustable band", "Stone: 10×8mm emerald cut", "Weight: 8g"],
  },
  {
    id: "c1",
    slug: "velvet-rose-lipstick-duo",
    name: "Velvet Rose Lipstick Duo",
    category: "cosmetics",
    price: 3200,
    currency: "PKR",
    images: [lipstickImg],
    description: "Two luxurious matte lipsticks in complementary rose shades. Long-wearing formula with vitamin E for hydrated, velvety lips.",
    details: ["Set of 2 lipsticks", "Matte finish", "Vitamin E enriched", "12-hour wear", "Cruelty-free"],
    isNew: true,
  },
  {
    id: "c2",
    slug: "earth-luxe-eyeshadow-palette",
    name: "Earth Luxe Eyeshadow Palette",
    category: "cosmetics",
    price: 4800,
    currency: "PKR",
    images: [eyeshadowImg],
    description: "A curated palette of 10 earth-tone shades in matte and shimmer finishes. Highly pigmented and blendable for effortless glam.",
    details: ["10 versatile shades", "Matte & shimmer finishes", "Highly pigmented", "Mirror & brush included", "Paraben-free"],
  },
  {
    id: "c3",
    slug: "silk-glow-foundation",
    name: "Silk Glow Foundation",
    category: "cosmetics",
    price: 3800,
    currency: "PKR",
    images: [foundationImg],
    description: "A lightweight, buildable foundation that delivers a natural, dewy finish. Infused with hyaluronic acid for all-day hydration.",
    details: ["30ml glass bottle", "SPF 25", "12 inclusive shades", "Hyaluronic acid formula", "Dewy satin finish"],
  },
  {
    id: "c4",
    slug: "rose-gold-brush-collection",
    name: "Rose Gold Brush Collection",
    category: "cosmetics",
    price: 5500,
    currency: "PKR",
    images: [brushesImg],
    description: "A professional 8-piece brush set with rose gold ferrules and ultra-soft synthetic bristles. Comes in an elegant glass holder.",
    details: ["8-piece set", "Synthetic bristles", "Rose gold ferrules", "Glass holder included", "Vegan & cruelty-free"],
    isNew: true,
  },
  {
    id: "p1",
    slug: "emerald-satin-clutch",
    name: "Emerald Satin Clutch",
    category: "purses",
    price: 8900,
    currency: "PKR",
    images: [clutchImg],
    description: "A luxurious satin clutch in deep emerald green with a gold-tone clasp. The perfect evening companion for formal occasions.",
    details: ["Satin fabric", "Gold-tone hardware", "Interior pocket", "Chain strap included", "Dimensions: 25×15×5 cm"],
    isNew: true,
  },
  {
    id: "p2",
    slug: "bordeaux-leather-tote",
    name: "Bordeaux Leather Tote",
    category: "purses",
    price: 14500,
    currency: "PKR",
    images: [toteImg],
    description: "A structured tote in rich burgundy leather with gold hardware accents. Spacious enough for work and stylish enough for evening.",
    details: ["Genuine leather", "Gold-tone hardware", "Interior zip pocket", "Magnetic closure", "Dimensions: 35×30×12 cm"],
  },
  {
    id: "p3",
    slug: "champagne-crossbody",
    name: "Champagne Gold Crossbody",
    category: "purses",
    price: 7200,
    currency: "PKR",
    images: [crossbodyImg],
    description: "A compact crossbody bag in champagne gold leather with a delicate chain strap. Effortlessly chic for day-to-night transitions.",
    details: ["Faux leather", "Gold chain strap", "Flap closure", "Interior card slots", "Dimensions: 20×14×7 cm"],
  },
  {
    id: "p4",
    slug: "noir-mini-chain-bag",
    name: "Noir Mini Chain Bag",
    category: "purses",
    price: 6800,
    currency: "PKR",
    images: [minibagImg],
    description: "A structured mini bag in noir leather with a bold gold clasp and chain strap. Compact luxury for the modern woman.",
    details: ["Genuine leather", "Gold push-lock clasp", "Chain & leather strap", "Interior suede lining", "Dimensions: 18×14×8 cm"],
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (cat: string) => products.filter((p) => p.category === cat);
export const formatPrice = (price: number, currency: string) => `${currency} ${price.toLocaleString()}`;

export const getDiscountPercent = (regular?: number, sale?: number) => {
  if (!regular || !sale || regular <= sale) return 0;
  return Math.round(((regular - sale) / regular) * 100);
};

export const SUBCATEGORIES: Record<Product["category"], string[]> = {
  jewellery: ["Earrings", "Bangles", "Necklaces", "Rings", "Bridal Sets"],
  cosmetics: ["Lipstick", "Eyeshadow", "Foundation", "Brushes", "Skincare"],
  purses: ["Clutches", "Totes", "Crossbody", "Mini Bags"],
};
