import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import jewelleryImg from "@/assets/category-jewellery.jpg";
import cosmeticsImg from "@/assets/category-cosmetics.jpg";
import pursesImg from "@/assets/category-purses.jpg";
import ringImg from "@/assets/product-ring.jpg";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import WishlistButton from "@/components/WishlistButton";
import { useState } from "react";

const jewelleryProducts = products.filter((p) => p.category === "jewellery");
const cosmeticsProducts = products.filter((p) => p.category === "cosmetics");
const pursesProducts = products.filter((p) => p.category === "purses");

const ProductCard = ({
  product,
  delay = 0,
}: {
  product: (typeof products)[0];
  delay?: number;
}) => (
  <AnimateOnScroll animation="fade-up" delay={delay}>
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm aspect-square mb-3 bg-card">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={400}
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 text-[9px] tracking-[0.15em] bg-accent text-accent-foreground px-2 py-0.5 rounded-sm font-medium">
            NEW
          </span>
        )}
        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
        />
      </div>
      <h4 className="text-xs md:text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-tight mb-0.5">
        {product.name}
      </h4>
      <p className="text-xs text-accent font-medium">
        {formatPrice(product.price, product.currency)}
      </p>
    </Link>
  </AnimateOnScroll>
);

const TabProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const { addItem } = useCart();
  return (
    <div className="group block">
      <Link to={`/product/${product.slug}`}>
        <div className="relative overflow-hidden rounded-sm aspect-square mb-3 bg-card">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={400}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.images[0],
              });
            }}
            className="absolute bottom-2 right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:opacity-90"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
          <WishlistButton
            productId={product.id}
            productName={product.name}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
          />
        </div>
      </Link>
      <Link to={`/product/${product.slug}`}>
        <h4 className="text-xs md:text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-tight mb-0.5">
          {product.name}
        </h4>
        <p className="text-xs text-accent font-medium">
          {formatPrice(product.price, product.currency)}
        </p>
      </Link>
    </div>
  );
};

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState<
    "jewellery" | "cosmetics" | "purses"
  >("jewellery");
  const tabProducts = products.filter((p) => p.category === activeTab);

  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        {/* ───── JEWELLERY with feature image ───── */}
        <div>
          <AnimateOnScroll animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              <div>
                <p className="text-xs tracking-[0.25em] text-accent mb-2">
                  COLLECTION
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Luxury Jewellery
                </h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Exquisitely crafted pieces that blend contemporary elegance
                  with traditional Pakistani filigree artistry.
                </p>
              </div>
              <Link
                to="/category/jewellery"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
              >
                View All Jewellery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Grid with large feature image on right */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-3 grid grid-cols-2 gap-4 md:gap-6">
              {jewelleryProducts.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 100} />
              ))}
            </div>
            <AnimateOnScroll
              animation="fade-left"
              delay={200}
              className="col-span-2 md:col-span-2"
            >
              <Link to="/category/jewellery" className="group block h-full">
                <div className="relative overflow-hidden rounded-sm h-full min-h-[300px] bg-gradient-to-br from-amber-100/10 to-amber-200/5">
                  <img
                    src={ringImg}
                    alt="Featured Jewellery"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>

        {/* ───── COSMETICS BANNER ───── */}
        <div>
          <AnimateOnScroll animation="scale-up">
            <Link
              to="/category/cosmetics"
              className="group relative block overflow-hidden rounded-sm mb-8 aspect-[21/9] md:aspect-[3/1]"
            >
              <img
                src={cosmeticsImg}
                alt="Professional Cosmetics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={1400}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
                <p className="text-xs tracking-[0.25em] text-accent mb-2">
                  BEAUTY
                </p>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-2">
                  Professional
                  <br />
                  Cosmetics
                </h2>
                <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group-hover:underline">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {cosmeticsProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* ───── Category Tab Bar with Products ───── */}
        <AnimateOnScroll animation="fade-in">
          <div className="w-full">
            <div className="flex justify-center mb-6 md:mb-8 px-2">
              <div className="flex w-full max-w-fit overflow-x-auto border border-border rounded-sm scrollbar-hide">
                {(["jewellery", "cosmetics", "purses"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`flex-1 whitespace-nowrap px-4 sm:px-6 md:px-10 py-3 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-medium border-r border-border last:border-r-0 transition-colors ${
                      activeTab === cat
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-accent hover:bg-card"
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
              {tabProducts.map((p) => (
                <TabProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* ───── PROMOTIONAL BANNER ───── */}
        <AnimateOnScroll animation="fade-up">
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-primary via-primary to-accent/20">
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 md:py-10 gap-6">
              <div className="flex items-center gap-6">
                <div className="hidden md:block w-24 h-24 rounded-full border-2 border-accent/30 flex-shrink-0 overflow-hidden">
                  <img
                    src={cosmeticsImg}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-accent mb-1">
                    FLAT DISCOUNT ON ALL ORDERS
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                    Beauty, Jewellery & Accessories —{" "}
                    <span className="text-accent">All in One Place</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Free shipping on orders above PKR 5,000
                  </p>
                </div>
              </div>
              <Link
                to="/category/cosmetics"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium tracking-wider rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Get Upto 30% OFF
              </Link>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ───── PURSES ───── */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <AnimateOnScroll animation="fade-left">
            <Link
              to="/category/purses"
              className="group relative block overflow-hidden rounded-sm aspect-[4/5]"
            >
              <img
                src={pursesImg}
                alt="Designer Ladies Purses"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-xs tracking-[0.25em] text-accent mb-2">
                  DESIGNER COLLECTION
                </p>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-2">
                  Designer
                  <br />
                  Ladies' Purses
                </h2>
                <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                  Luxury crafted for the modern woman — statement pieces for
                  every occasion.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group-hover:underline">
                  Explore Purses <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {pursesProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
