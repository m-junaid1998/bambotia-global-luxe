import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice, getDiscountPercent } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import WishlistButton from "@/components/WishlistButton";

const NewArrivals = () => {
  const { addItem } = useCart();
  const allProducts = useStorefrontProducts();
  const newProducts = allProducts.filter((p) => p.isNew);

  return (
    <section id="new-arrivals" className="py-16 md:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-accent mb-3">JUST ARRIVED</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              New Arrivals
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              The finest new additions — Exclusive Luxury Jewellery, Cosmetics & Accessories.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {newProducts.map((p, i) => (
            <AnimateOnScroll key={p.id} animation="fade-up" delay={i * 120}>
              <div className="group block">
                <Link to={`/product/${p.slug}`}>
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-3 bg-card">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={640}
                      height={800}
                    />
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.15em] bg-accent text-accent-foreground px-2.5 py-1 rounded-sm font-medium">
                      NEW
                    </span>
                    <WishlistButton productId={p.id} productName={p.name} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" />
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
                  <p className="text-[10px] text-muted-foreground tracking-wider mb-0.5">
                    {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                  </p>
                  <h3 className="text-sm font-medium text-foreground mb-0.5 group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-accent font-medium">{formatPrice(p.price, p.currency)}</p>
                    {p.regularPrice && p.regularPrice > p.price && (
                      <>
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(p.regularPrice, p.currency)}
                        </p>
                        <span className="text-[10px] font-semibold text-red-500">
                          -{getDiscountPercent(p.regularPrice, p.price)}%
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="text-center mt-10">
            <Link
              to="/category/jewellery"
              className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-full text-sm text-foreground hover:border-accent hover:text-accent transition-colors font-medium tracking-wide"
            >
              View All New Arrivals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default NewArrivals;
