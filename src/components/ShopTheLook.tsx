import { ShoppingBag } from "lucide-react";
import look1 from "@/assets/shop-look-1.jpg";
import look2 from "@/assets/shop-look-2.jpg";
import look3 from "@/assets/shop-look-3.jpg";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const looks = [
  { image: look1, title: "The Emerald Evening", desc: "Complete look with jewellery & purse", price: "PKR 56,400" },
  { image: look2, title: "Golden Hour Glam", desc: "Stacked rings, bracelets & earrings", price: "PKR 40,000" },
  { image: look3, title: "Vanity Essentials", desc: "Cosmetics, jewellery & clutch", price: "PKR 29,600" },
];

const ShopTheLook = () => (
  <section id="shop-the-look" className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-accent mb-3">CURATED STYLE</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shop the Look
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Our stylists' top picks — Complete looks mixing Jewellery, Cosmetics & Purses.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {looks.map((look, i) => (
          <AnimateOnScroll key={i} animation="scale-up" delay={i * 150}>
            <div className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[3/4]">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={600}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ShoppingBag className="w-3 h-3 text-accent" />
                <span className="text-xs font-medium text-foreground">{look.price}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-heading text-lg font-semibold text-foreground">{look.title}</h3>
                <p className="text-sm text-muted-foreground">{look.desc}</p>
                <span className="text-xs tracking-[0.2em] text-accent mt-2 inline-block">SHOP NOW →</span>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default ShopTheLook;
