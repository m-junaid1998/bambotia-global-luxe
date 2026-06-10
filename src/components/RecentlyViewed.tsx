import { useMemo } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import ProductCarousel from "@/components/ProductCarousel";

interface RecentlyViewedProps {
  excludeId?: string;
}

const RecentlyViewed = ({ excludeId }: RecentlyViewedProps) => {
  const { ids } = useRecentlyViewed();
  const all = useStorefrontProducts();

  const items = useMemo(() => {
    const map = new Map(all.map((p) => [p.id, p]));
    return ids
      .filter((id) => id !== excludeId)
      .map((id) => map.get(id))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .slice(0, 8);
  }, [ids, all, excludeId]);

  if (!items.length) return null;

  return (
    <ProductCarousel
      subtitle="RECENTLY BROWSED"
      title="Recently Viewed"
      products={items}
    />
  );
};

export default RecentlyViewed;