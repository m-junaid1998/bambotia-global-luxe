import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import { formatPrice } from "@/data/products";

const CATEGORIES = [
  { key: "jewellery", label: "Jewellery" },
  { key: "cosmetics", label: "Cosmetics" },
  { key: "purses", label: "Purses" },
];

const SearchPage = () => {
  const products = useStorefrontProducts();
  const maxPrice = useMemo(
    () => Math.max(50000, ...products.map((p) => p.price)),
    [products]
  );

  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(maxPrice);
  const [onlyNew, setOnlyNew] = useState(false);

  const toggleCat = (k: string) =>
    setCats((c) => (c.includes(k) ? c.filter((x) => x !== k) : [...c, k]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (p.price > price) return false;
      if (onlyNew && !p.isNew) return false;
      return true;
    });
  }, [products, query, cats, price, onlyNew]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Search Products</h1>
            <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
              Find the perfect piece from our collection
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-12 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for jewellery, cosmetics, purses..."
              className="h-14 pl-12 text-base bg-card border-border"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            {/* Filters */}
            <aside className="bg-card border border-border rounded-md p-6 h-fit lg:sticky lg:top-28">
              <h2 className="font-serif text-xl mb-6 text-foreground">Filters</h2>

              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Categories</p>
                <div className="space-y-3">
                  {CATEGORIES.map((c) => (
                    <label key={c.key} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={cats.includes(c.key)}
                        onCheckedChange={() => toggleCat(c.key)}
                      />
                      <span className="text-sm text-foreground">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Price Range</p>
                <Slider
                  value={[price]}
                  min={0}
                  max={maxPrice}
                  step={500}
                  onValueChange={(v) => setPrice(v[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-3">
                  <span>PKR 0</span>
                  <span>{formatPrice(price, "PKR")}</span>
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Product Type</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox checked={onlyNew} onCheckedChange={(v) => setOnlyNew(!!v)} />
                  <span className="text-sm text-foreground">New Arrivals</span>
                </label>
              </div>
            </aside>

            {/* Results */}
            <section>
              <p className="text-sm text-muted-foreground mb-6 text-right">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
              </p>

              {filtered.length === 0 ? (
                <div className="text-center py-24 border border-border rounded-md bg-card/50">
                  <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
                  <p className="text-foreground">No products match your search</p>
                  <p className="text-xs text-muted-foreground mt-2">Try adjusting filters or keywords</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="group block bg-card border border-border rounded-md overflow-hidden hover:border-accent/50 transition-all"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {p.isNew && (
                          <Badge className="absolute top-3 left-3 bg-background text-foreground hover:bg-background">
                            NEW
                          </Badge>
                        )}
                        <div className="absolute top-3 right-3">
                          <WishlistButton productId={p.id} productName={p.name} />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] tracking-[0.2em] text-accent uppercase mb-1">
                          {p.category}
                        </p>
                        <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors mb-2">
                          {p.name}
                        </h3>
                        <p className="text-sm font-medium text-foreground">
                          {formatPrice(p.price, p.currency)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;