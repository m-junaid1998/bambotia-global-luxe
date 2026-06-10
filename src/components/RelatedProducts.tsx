import { useMemo } from "react";
import { type Product } from "@/data/products";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import ProductCarousel from "@/components/ProductCarousel";

interface RelatedProductsProps {
  product: Product;
}

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const all = useStorefrontProducts();

  const related = useMemo(() => {
    const others = all.filter((p) => p.id !== product.id);
    const sameSub = product.subcategory
      ? others.filter(
          (p) => p.category === product.category && p.subcategory === product.subcategory
        )
      : [];
    const sameCat = others.filter(
      (p) => p.category === product.category && !sameSub.includes(p)
    );
    return [...sameSub, ...sameCat].slice(0, 8);
  }, [all, product]);

  return (
    <ProductCarousel
      subtitle="YOU MAY ALSO LIKE"
      title="Related Products"
      products={related}
      autoScroll
    />
  );
};

export default RelatedProducts;