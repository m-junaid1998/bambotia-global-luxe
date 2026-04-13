import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/data/products";

const newProducts = products.filter((p) => p.isNew);

const NewArrivals = () => (
  <section id="new-arrivals" className="py-16 md:py-24 bg-card/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] text-accent mb-3">JUST ARRIVED</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
          New Arrivals
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          The finest new additions — Exclusive Luxury Jewellery, Cosmetics & Accessories.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {newProducts.map((p) => (
          <Link key={p.id} to={`/product/${p.slug}`} className="group">
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
            </div>
            <p className="text-[10px] text-muted-foreground tracking-wider mb-0.5">
              {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
            </p>
            <h3 className="text-sm font-medium text-foreground mb-0.5 group-hover:text-accent transition-colors">
              {p.name}
            </h3>
            <p className="text-sm text-accent font-medium">{formatPrice(p.price, p.currency)}</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/category/jewellery"
          className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-full text-sm text-foreground hover:border-accent hover:text-accent transition-colors font-medium tracking-wide"
        >
          View All New Arrivals <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default NewArrivals;
