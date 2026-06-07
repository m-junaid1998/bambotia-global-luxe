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
    <section id="new-arrivals" className="py-16  bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-accent mb-3">
              JUST ARRIVED
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              New Arrivals
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              The finest new additions — Exclusive Luxury Jewellery, Cosmetics &
              Accessories.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {newProducts.map((p, i) => {
            const discount = p.regularPrice ? getDiscountPercent(p.regularPrice, p.price) : 0;
            // Deterministic rating + variant swatches from product id
            const rating = (4.6 + ((p.id.charCodeAt(0) % 4) * 0.1)).toFixed(2);
            const swatches = ["#1a1a1a", "#a78bfa", "#f9a8a8", "#e8c07a"];
            return (
              <AnimateOnScroll key={p.id} animation="fade-up" delay={i * 100}>
                <article className="group relative flex flex-col rounded-2xl bg-card/70 backdrop-blur-md border border-border shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-12px_hsl(var(--foreground)/0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <Link to={`/product/${p.slug}`} className="relative block aspect-square overflow-hidden bg-muted/40">
                    <p className="absolute top-3 left-4 z-10 text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
                      {discount > 0 ? `WAS ${formatPrice(p.regularPrice!, p.currency)}` : "JUST ARRIVED"}
                    </p>
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width={640}
                      height={640}
                    />
                    <WishlistButton
                      productId={p.id}
                      productName={p.name}
                      className="absolute top-3 right-3 transition-transform duration-200 hover:scale-110"
                    />
                  </Link>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4 md:p-5">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <Link to={`/product/${p.slug}`} className="min-w-0">
                        <h3 className="text-base font-bold text-foreground truncate group-hover:text-accent transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      {discount > 0 && (
                        <span className="shrink-0 text-xs font-semibold text-[hsl(var(--cta))]">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                      {p.subcategory || p.description.split(".")[0]}
                    </p>

                    {/* Variants + rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        {swatches.slice(0, 3).map((c, idx) => (
                          <span
                            key={idx}
                            className="w-4 h-4 rounded-full border border-border ring-1 ring-background"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                        <span className="text-[11px] text-muted-foreground ml-1">+{swatches.length - 3}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-foreground">
                        <Star className="w-3.5 h-3.5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                        {rating}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      {p.regularPrice && p.regularPrice > p.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(p.regularPrice, p.currency)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-foreground">
                        {formatPrice(p.price, p.currency)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center gap-2">
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
                        className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-full border border-border bg-background text-foreground text-xs font-semibold tracking-wide hover:border-accent hover:text-accent transition-colors"
                        aria-label={`Add ${p.name} to cart`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
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
                        className="flex-1 inline-flex items-center justify-center h-10 rounded-full bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] text-xs font-semibold tracking-wide shadow-md hover:opacity-90 hover:shadow-lg transition-all"
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
