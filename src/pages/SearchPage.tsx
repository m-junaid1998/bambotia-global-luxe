import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import { formatPrice } from "@/data/products";

const CATEGORIES = [
  { key: "jewellery", label: "Jewellery" },
  { key: "cosmetics", label: "Cosmetics" },
  { key: "purses", label: "Purses" },
];

const SearchPage = () => {
  const products = useStorefrontProducts();
  const navigate = useNavigate();
  const maxPrice = useMemo(
    () => Math.max(50000, ...products.map((p) => p.price)),
    [products]
  );

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [cats, setCats] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(maxPrice);
  const [onlyNew, setOnlyNew] = useState(false);

  // Mobile drafts (applied on "Apply")
  const [mobileOpen, setMobileOpen] = useState(false);
  const [draftCats, setDraftCats] = useState<string[]>(cats);
  const [draftPrice, setDraftPrice] = useState<number>(price);
  const [draftOnlyNew, setDraftOnlyNew] = useState<boolean>(onlyNew);

  const toggleCat = (k: string, setter: (fn: (c: string[]) => string[]) => void) =>
    setter((c) => (c.includes(k) ? c.filter((x) => x !== k) : [...c, k]));

  const openMobile = (open: boolean) => {
    if (open) {
      setDraftCats(cats);
      setDraftPrice(price);
      setDraftOnlyNew(onlyNew);
    }
    setMobileOpen(open);
  };

  const applyMobile = () => {
    setCats(draftCats);
    setPrice(draftPrice);
    setOnlyNew(draftOnlyNew);
    setMobileOpen(false);
  };

  const resetMobile = () => {
    setDraftCats([]);
    setDraftPrice(maxPrice);
    setDraftOnlyNew(false);
  };

  const resetAll = () => {
    setQuery("");
    setCats([]);
    setPrice(maxPrice);
    setOnlyNew(false);
  };

  const hasActiveFilters =
    query.trim().length > 0 ||
    cats.length > 0 ||
    onlyNew ||
    price < maxPrice;

  const activeCount =
    cats.length + (onlyNew ? 1 : 0) + (price < maxPrice ? 1 : 0);

  const FilterFields = ({
    cats: fc,
    price: fp,
    onlyNew: fn,
    onToggleCat,
    onPrice,
    onOnlyNew,
  }: {
    cats: string[];
    price: number;
    onlyNew: boolean;
    onToggleCat: (k: string) => void;
    onPrice: (n: number) => void;
    onOnlyNew: (v: boolean) => void;
  }) => (
    <>
      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Categories</p>
        <div className="space-y-3">
          {CATEGORIES.map((c) => (
            <label key={c.key} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={fc.includes(c.key)} onCheckedChange={() => onToggleCat(c.key)} />
              <span className="text-sm text-foreground">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Price Range</p>
        <Slider value={[fp]} min={0} max={maxPrice} step={500} onValueChange={(v) => onPrice(v[0])} />
        <div className="flex justify-between text-xs text-muted-foreground mt-3">
          <span>PKR 0</span>
          <span>{formatPrice(fp, "PKR")}</span>
        </div>
      </div>

      <div>
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Product Type</p>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={fn} onCheckedChange={(v) => onOnlyNew(!!v)} />
          <span className="text-sm text-foreground">New Arrivals</span>
        </label>
      </div>
    </>
  );

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

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as typeof products;
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [products, query]);

  const matchingCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as { key: string; label: string }[];
    return CATEGORIES.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  const suggestionItems = useMemo(
    () => [
      ...matchingCategories.map((c) => ({ type: "category" as const, ...c })),
      ...suggestions.map((p) => ({ type: "product" as const, product: p })),
    ],
    [matchingCategories, suggestions]
  );

  const pickSuggestion = (i: number) => {
    const item = suggestionItems[i];
    if (!item) return;
    setShowSuggestions(false);
    setActiveIdx(-1);
    if (item.type === "product") {
      navigate(`/product/${item.product.slug}`);
    } else {
      setQuery(item.label);
      setCats([item.key]);
    }
  };

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
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                setActiveIdx(-1);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => {
                if (!showSuggestions || suggestionItems.length === 0) return;
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIdx((i) => (i + 1) % suggestionItems.length);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIdx((i) => (i <= 0 ? suggestionItems.length - 1 : i - 1));
                } else if (e.key === "Enter" && activeIdx >= 0) {
                  e.preventDefault();
                  pickSuggestion(activeIdx);
                } else if (e.key === "Escape") {
                  setShowSuggestions(false);
                }
              }}
              placeholder="Search for jewellery, cosmetics, purses..."
              className="h-14 pl-12 text-base bg-card border-border"
            />
            {showSuggestions && query.trim() && suggestionItems.length > 0 && (
              <div className="absolute z-30 left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg overflow-hidden">
                {matchingCategories.length > 0 && (
                  <div className="px-4 pt-3 pb-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    Categories
                  </div>
                )}
                {suggestionItems.map((item, i) => {
                  const active = i === activeIdx;
                  if (item.type === "category") {
                    return (
                      <button
                        key={`c-${item.key}`}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickSuggestion(i)}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                          active ? "bg-accent/10 text-accent" : "text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <span>{item.label}</span>
                      </button>
                    );
                  }
                  const p = item.product;
                  return (
                    <button
                      key={`p-${p.id}`}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickSuggestion(i)}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        active ? "bg-accent/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 rounded object-cover bg-muted"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{p.name}</p>
                        <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                          {p.category}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-foreground whitespace-nowrap">
                        {formatPrice(p.price, p.currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block bg-card border border-border rounded-md p-6 h-fit lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-foreground">Filters</h2>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:text-foreground" onClick={resetAll}>
                    <X className="w-3.5 h-3.5" />
                    Clear
                  </Button>
                )}
              </div>
              <FilterFields
                cats={cats}
                price={price}
                onlyNew={onlyNew}
                onToggleCat={(k) => toggleCat(k, setCats)}
                onPrice={setPrice}
                onOnlyNew={setOnlyNew}
              />
              {hasActiveFilters && (
                <Button variant="outline" className="w-full mt-6 gap-1" onClick={resetAll}>
                  <X className="w-4 h-4" />
                  Reset all filters
                </Button>
              )}
            </aside>

            {/* Results */}
            <section>
              <div className="flex items-center justify-between mb-6 gap-4">
                <Sheet open={mobileOpen} onOpenChange={openMobile}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                      {activeCount > 0 && (
                        <Badge className="ml-1 h-5 px-1.5 bg-accent text-accent-foreground hover:bg-accent">
                          {activeCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-sm flex flex-col p-0">
                    <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
                      <SheetTitle className="font-serif text-2xl text-left">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <FilterFields
                        cats={draftCats}
                        price={draftPrice}
                        onlyNew={draftOnlyNew}
                        onToggleCat={(k) => toggleCat(k, setDraftCats)}
                        onPrice={setDraftPrice}
                        onOnlyNew={setDraftOnlyNew}
                      />
                    </div>
                    <SheetFooter className="px-6 py-4 border-t border-border flex-row gap-3 sm:flex-row sm:justify-stretch">
                      <Button variant="outline" className="flex-1" onClick={resetMobile}>
                        Reset
                      </Button>
                      <Button className="flex-1" onClick={applyMobile}>
                        Apply
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <div className="flex items-center gap-3 ml-auto">
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex h-8 gap-1 text-muted-foreground hover:text-foreground" onClick={resetAll}>
                      <X className="w-3.5 h-3.5" />
                      Clear
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

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