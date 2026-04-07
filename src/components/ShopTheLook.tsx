import look1 from "@/assets/shop-look-1.jpg";
import look2 from "@/assets/shop-look-2.jpg";
import look3 from "@/assets/shop-look-3.jpg";

const looks = [
  { image: look1, title: "The Emerald Evening", desc: "Complete look with jewellery & purse" },
  { image: look2, title: "Golden Hour Glam", desc: "Stacked rings, bracelets & earrings" },
  { image: look3, title: "Vanity Essentials", desc: "Cosmetics, jewellery & clutch" },
];

const ShopTheLook = () => (
  <section className="py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] text-accent mb-3">CURATED STYLE</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
          Shop the Look
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {looks.map((look, i) => (
          <div key={i} className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[2/3]">
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width={600}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="font-heading text-lg font-semibold text-foreground">{look.title}</h3>
              <p className="text-sm text-muted-foreground">{look.desc}</p>
              <span className="text-xs tracking-[0.2em] text-accent mt-2 inline-block">SHOP NOW →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ShopTheLook;
