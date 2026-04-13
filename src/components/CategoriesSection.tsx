import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import jewelleryImg from "@/assets/category-jewellery.jpg";
import cosmeticsImg from "@/assets/category-cosmetics.jpg";
import pursesImg from "@/assets/category-purses.jpg";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const jewelleryProducts = products.filter((p) => p.category === "jewellery");
const cosmeticsProducts = products.filter((p) => p.category === "cosmetics");
const pursesProducts = products.filter((p) => p.category === "purses");

const ProductCard = ({ product, delay = 0 }: { product: typeof products[0]; delay?: number }) => (
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
      </div>
      <h4 className="text-xs md:text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-tight mb-0.5">
        {product.name}
      </h4>
      <p className="text-xs text-accent font-medium">{formatPrice(product.price, product.currency)}</p>
    </Link>
  </AnimateOnScroll>
);

const CategoriesSection = () => (
  <section id="categories" className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">

      {/* ───── JEWELLERY ───── */}
      <div>
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.25em] text-accent mb-2">COLLECTION</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Luxury Jewellery
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Exquisitely crafted pieces that blend contemporary elegance with traditional Pakistani filigree artistry.
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {jewelleryProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 100} />
          ))}
        </div>
      </div>

      {/* ───── COSMETICS ───── */}
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
              <p className="text-xs tracking-[0.25em] text-accent mb-2">BEAUTY</p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-2">
                Professional<br />Cosmetics
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

      {/* ───── Category Tab Bar ───── */}
      <AnimateOnScroll animation="fade-in">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden">
            {["jewellery", "cosmetics", "purses"].map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="px-6 md:px-10 py-3 text-xs tracking-[0.2em] text-muted-foreground hover:text-accent hover:bg-card transition-colors font-medium border-r border-border last:border-r-0"
              >
                {cat.toUpperCase()}
              </Link>
            ))}
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
              <p className="text-xs tracking-[0.25em] text-accent mb-2">ACCESSORIES</p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-2">
                Designer<br />Ladies' Purses
              </h2>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Statement accessories for every occasion, crafted with premium materials.
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

export default CategoriesSection;
