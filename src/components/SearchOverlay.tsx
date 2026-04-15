import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatPrice } from "@/data/products";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveFilter("all");
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const filters = [
    { key: "all", label: "ALL" },
    { key: "jewellery", label: "JEWELLERY" },
    { key: "cosmetics", label: "COSMETICS" },
    { key: "purses", label: "PURSES" },
  ];

  const filtered = products.filter((p) => {
    const matchesCategory = activeFilter === "all" || p.category === activeFilter;
    const matchesQuery =
      query.trim() === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/98 backdrop-blur-md" />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Sticky search header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            {/* Close bar */}
            <div className="flex items-center justify-between pt-5 pb-3">
              <p className="text-[10px] tracking-[0.3em] text-accent font-medium">SEARCH BAMBOTIA</p>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search input */}
            <div className="flex items-center gap-3 pb-4">
              <Search className="w-5 h-5 text-accent flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 bg-transparent text-xl font-heading font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 pb-4">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`text-[10px] font-medium tracking-[0.15em] px-4 py-1.5 border transition-all duration-200 ${
                    activeFilter === f.key
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable results */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-6">
            {/* Results count */}
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-4">
              {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No products match your search</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Try a different keyword or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 border border-border rounded-sm hover:border-accent/40 hover:bg-card/50 transition-all duration-200 group"
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm bg-card">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-[0.15em] text-accent mb-0.5 capitalize">
                        {p.category}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                        {p.name}
                      </p>
                      <p className="text-xs font-medium text-accent mt-0.5">
                        {formatPrice(p.price, p.currency)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer hint */}
        <div className="sticky bottom-0 bg-background/90 backdrop-blur-sm border-t border-border">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-center gap-4 text-[10px] tracking-[0.15em] text-muted-foreground/60">
            <span>ESC to close</span>
            <span className="w-px h-3 bg-border" />
            <span>Click outside to dismiss</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
