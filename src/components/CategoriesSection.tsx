import { Link } from "react-router-dom";
import jewelleryImg from "@/assets/category-jewellery.jpg";
import cosmeticsImg from "@/assets/category-cosmetics.jpg";
import pursesImg from "@/assets/category-purses.jpg";

const categories = [
  { id: "jewellery", title: "Luxury Jewellery", subtitle: "Timeless pieces crafted with precision", image: jewelleryImg },
  { id: "cosmetics", title: "Professional Cosmetics", subtitle: "Enhance your natural radiance", image: cosmeticsImg },
  { id: "purses", title: "Designer Purses", subtitle: "Statement accessories for every occasion", image: pursesImg },
];

const CategoriesSection = () => (
  <section id="categories" className="py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] text-accent mb-3">OUR COLLECTIONS</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
          Featured Categories
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="group relative overflow-hidden rounded-sm aspect-[3/4]"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width={800}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{cat.subtitle}</p>
              <span className="text-xs tracking-[0.2em] text-accent group-hover:tracking-[0.3em] transition-all">
                EXPLORE →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
