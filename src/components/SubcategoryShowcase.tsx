import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice, getDiscountPercent, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import WishlistButton from "@/components/WishlistButton";

const SubcategoryShowcase = () => {
  const { addItem } = useCart();
  const allProducts = useStorefrontProducts();

  // Build subcategory list dynamically from available products
  const subcategories = useMemo(() => {
    const map = new Map<
      string,
      { name: string; category: Product["category"]; image: string }
    >();
    for (const p of allProducts) {
      if (!p.subcategory) continue;
      if (!map.has(p.subcategory)) {
        map.set(p.subcategory, {
          name: p.subcategory,
          category: p.category,
          image: p.images[0],
        });
      }
    }
    return Array.from(map.values());
  }, [allProducts]);

  const [active, setActive] = useState<string | null>(
    subcategories[0]?.name ?? null,
  );

  const featured = useMemo(
    () => allProducts.filter((p) => p.subcategory === active).slice(0, 4),
    [allProducts, active],
  );

  const activeMeta = subcategories.find((s) => s.name === active);

  if (subcategories.length === 0) return null;

  return (
    <section className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-accent mb-3">
              SHOP BY CATEGORY
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Explore Our Collections
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Discover curated luxury — handpicked across our finest categories.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Circular subcategory tabs */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 mb-12 justify-start md:justify-center scrollbar-hide -mx-4 px-4">
            {subcategories.map((s) => {
              const isActive = s.name === active;
              return (
                <button
                  key={s.name}
                  onClick={() => setActive(s.name)}
                  className="group flex flex-col items-center gap-3 flex-shrink-0 min-w-[88px] md:min-w-[102px] focus:outline-none"
                  aria-pressed={isActive}
                >
                  <span
                    className={`relative block w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-300 `}
                  >
                    <span
                      className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-accent shadow-[0_8px_20px_-9px_hsl(var(--accent)/0.8)]"
                          : "border-border group-hover:border-accent/60"
                      }`}
                    />

                    <span className="absolute inset-[2px] rounded-full overflow-hidden bg-background">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </span>
                  </span>
                  <span
                    className={`text-xs md:text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-foreground group-hover:text-accent"
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* Featured products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <AnimateOnScroll key={p.id} animation="fade-up" delay={i * 100}>
              <div className="group block">
                <Link to={`/product/${p.slug}`}>
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-3 bg-card">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* NEW Badge */}
                    {p.isNew && (
                      <span className="absolute top-3 left-3 text-[9px] tracking-[0.15em] bg-accent text-accent-foreground px-2.5 py-1 rounded-sm font-medium">
                        NEW
                      </span>
                    )}

                    {/* Discount Badge */}
                    {p.regularPrice && p.regularPrice > p.price && (
                      <div className="absolute bottom-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-[10px] font-semibold shadow-md">
                        -{getDiscountPercent(p.regularPrice, p.price)}% OFF
                      </div>
                    )}

                    {/* Wishlist */}
                    <WishlistButton
                      productId={p.id}
                      productName={p.name}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                    />

                    {/* Add to Cart */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        addItem({
                          productId: p.id,
                          name: p.name,
                          price: p.price,
                          currency: p.currency,
                          image: p.images[0],
                        });
                      }}
                      className="absolute bottom-3 right-3 w-9 h-9 bg-accent text-accent-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </Link>

                <Link to={`/product/${p.slug}`}>
                  <p className="text-[10px] text-muted-foreground tracking-wider mb-0.5 uppercase">
                    {p.subcategory}
                  </p>

                  <h3 className="text-sm font-medium text-foreground mb-0.5 group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-accent font-medium">
                      {formatPrice(p.price, p.currency)}
                    </p>

                    {p.regularPrice && p.regularPrice > p.price && (
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(p.regularPrice, p.currency)}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {featured.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">
            No products available in this category yet.
          </p>
        )}

        {/* See More button */}
        {activeMeta && (
          <AnimateOnScroll animation="fade-up" delay={200}>
            <div className="text-center mt-10">
              <Link
                to={`/category/${activeMeta.category}`}
                className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-full text-sm text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all font-medium tracking-wide"
              >
                See More {activeMeta.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
};

export default SubcategoryShowcase;
