import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getProductsByCategory, formatPrice } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  jewellery: { title: "Luxury Jewellery", subtitle: "Timeless pieces crafted with precision and adorned with natural stones" },
  cosmetics: { title: "Professional Cosmetics", subtitle: "Enhance your natural radiance with our curated beauty collection" },
  purses: { title: "Designer Purses", subtitle: "Statement accessories for every occasion, crafted with premium materials" },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const products = getProductsByCategory(category || "");
  const meta = categoryMeta[category || ""];

  if (!meta || products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Category Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{meta.title}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-accent mb-3">COLLECTION</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
              {meta.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">{meta.subtitle}</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={640}
                    height={800}
                  />
                  {p.isNew && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] tracking-[0.15em] bg-accent text-accent-foreground px-3 py-1 rounded-sm font-medium">
                        NEW
                      </span>
                    </div>
                  )}
                  <WishlistButton productId={p.id} productName={p.name} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" />
                </div>
                <h3 className="font-heading text-sm md:text-base font-medium text-foreground mb-1 group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-accent font-medium">{formatPrice(p.price, p.currency)}</p>
              </Link>
            ))}
          </div>

          {/* Back */}
          <div className="mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
