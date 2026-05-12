import { useMemo } from "react";
import { products as staticProducts, type Product } from "@/data/products";
import { useAdminProducts, type AdminProduct } from "@/contexts/AdminProductsContext";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const adminToProduct = (p: AdminProduct): Product => ({
  id: p.id,
  slug: slugify(p.name) || p.id,
  name: p.name,
  category: p.category,
  subcategory: p.subcategory,
  price: p.price,
  regularPrice: p.regularPrice,
  currency: "PKR",
  images: [p.image],
  description: p.description || "",
  details: [],
  isNew: Date.now() - p.createdAt < 1000 * 60 * 60 * 24 * 30,
});

export const useStorefrontProducts = (): Product[] => {
  const { products: admin } = useAdminProducts();
  return useMemo(
    () => [...admin.filter((p) => p.published).map(adminToProduct), ...staticProducts],
    [admin]
  );
};

export const useStorefrontProductBySlug = (slug: string) => {
  const all = useStorefrontProducts();
  return all.find((p) => p.slug === slug);
};

export const useStorefrontProductsByCategory = (cat: string) => {
  const all = useStorefrontProducts();
  return all.filter((p) => p.category === cat);
};