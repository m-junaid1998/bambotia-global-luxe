import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { formatPrice, getDiscountPercent } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import WishlistButton from "@/components/WishlistButton";

const NewArrivals = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const allProducts = useStorefrontProducts();
  const newProducts = allProducts.filter((p) => p.isNew);

  return (
    <section id="new-arrivals" className="py-12 sm:py-16 bg-card/50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        {/* Heading */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] text-accent mb-2 sm:mb-3">
              JUST ARRIVED
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              New Arrivals
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              The finest new additions — Exclusive Luxury Jewellery, Cosmetics & Accessories.
            </p>
          </div>
        </AnimateOnScroll>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">

          {newProducts.map((p, i) => {
            const discount = p.regularPrice
              ? getDiscountPercent(p.regularPrice, p.price)
              : 0;

            const rating = (
              4.6 + ((p.id.charCodeAt(0) % 4) * 0.1)
            ).toFixed(2);

            const swatches = ["#1a1a1a", "#a78bfa", "#f9a8a8", "#e8c07a"];

            return (
              <AnimateOnScroll
                key={p.id}
                animation="fade-up"
                delay={i * 100}
              >

                <article className="group relative flex flex-col min-w-0 rounded-xl sm:rounded-2xl bg-card/70 backdrop-blur-md border border-border overflow-hidden shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-12px_hsl(var(--foreground)/0.18)] hover:-translate-y-1 transition-all duration-300">

                  {/* IMAGE */}
                  <Link
                    to={`/product/${p.slug}`}
                    className="relative block aspect-square overflow-hidden bg-muted/40"
                  >
                 {p.isNew && (
                 <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-4 z-10 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] text-black bg-yellow-400 rounded-full uppercase shadow">
                  NEW
                 </span>
                  )}
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <WishlistButton
                      productId={p.id}
                      productName={p.name}
                      className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 scale-90 sm:scale-100"
                    />
                  </Link>

                  {/* BODY */}
                  <div className="flex flex-col flex-1 p-2 sm:p-4 md:p-5 min-w-0">

                    {/* TITLE */}
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <Link to={`/product/${p.slug}`} className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground truncate group-hover:text-accent transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      {discount > 0 && (
                        <span className="shrink-0 text-[9px] sm:text-xs font-semibold text-[hsl(var(--cta))]">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mb-2 sm:mb-3">
                      {p.subcategory || p.description.split(".")[0]}
                    </p>

                    {/* SWATCH + RATING */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">

                      <div className="flex items-center gap-1">
                        {swatches.slice(0, 3).map((c, idx) => (
                          <span
                            key={idx}
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-border"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                        {rating}
                      </div>

                    </div>

                    {/* PRICE */}
                    <div className="flex items-baseline gap-1 sm:gap-2 mb-3">
                      {p.regularPrice && p.regularPrice > p.price && (
                        <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                          {formatPrice(p.regularPrice, p.currency)}
                        </span>
                      )}

                      <span className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                        {formatPrice(p.price, p.currency)}
                      </span>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-auto flex flex-col gap-2">

                      <button
                        onClick={() =>
                          addItem({
                            productId: p.id,
                            name: p.name,
                            price: p.price,
                            currency: p.currency,
                            image: p.images[0],
                          })
                        }
                        className="w-full h-8 sm:h-10 inline-flex items-center justify-center gap-1 rounded-full border border-border bg-background text-foreground text-[10px] sm:text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => {
                          addItem({
                            productId: p.id,
                            name: p.name,
                            price: p.price,
                            currency: p.currency,
                            image: p.images[0],
                          });
                          navigate("/checkout");
                        }}
                        className="w-full h-8 sm:h-10 inline-flex items-center justify-center rounded-full bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] text-[10px] sm:text-xs font-semibold shadow-md hover:opacity-90 transition-all"
                      >
                        Buy Now
                      </button>

                    </div>

                  </div>
                </article>

              </AnimateOnScroll>
            );
          })}

        </div>

        {/* VIEW ALL */}
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="text-center mt-8 sm:mt-10">
            <Link
              to="/category/jewellery"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-border rounded-full text-sm text-foreground hover:border-accent hover:text-accent transition-colors font-medium tracking-wide"
            >
              View All New Arrivals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
};

export default NewArrivals;
