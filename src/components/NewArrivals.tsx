import { Link } from "react-router-dom";
import earringsImg from "@/assets/product-earrings.jpg";
import lipstickImg from "@/assets/product-lipstick.jpg";
import clutchImg from "@/assets/product-clutch.jpg";
import banglesImg from "@/assets/product-bangles.jpg";

const products = [
  { slug: "emerald-jhumka-earrings", name: "Emerald Jhumka Earrings", category: "Jewellery", price: "PKR 12,500", image: earringsImg },
  { slug: "velvet-rose-lipstick-duo", name: "Velvet Rose Lipstick Duo", category: "Cosmetics", price: "PKR 3,200", image: lipstickImg },
  { slug: "emerald-satin-clutch", name: "Emerald Satin Clutch", category: "Purses", price: "PKR 8,900", image: clutchImg },
  { slug: "heritage-gold-bangles", name: "Heritage Gold Bangles", category: "Jewellery", price: "PKR 18,000", image: banglesImg },
];

const NewArrivals = () => (
  <section id="new-arrivals" className="py-20 md:py-28 bg-muted/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] text-accent mb-3">JUST IN</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
          New Arrivals
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((p, i) => (
          <Link key={i} to={`/product/${p.slug}`} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={640}
                height={800}
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] tracking-[0.15em] bg-accent text-accent-foreground px-3 py-1 rounded-sm font-medium">
                  NEW
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground tracking-wider mb-1">{p.category}</p>
            <h3 className="font-heading text-sm md:text-base font-medium text-foreground mb-1 group-hover:text-accent transition-colors">{p.name}</h3>
            <p className="text-sm text-accent font-medium">{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default NewArrivals;
