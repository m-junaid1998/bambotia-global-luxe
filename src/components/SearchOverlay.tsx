import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
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

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveFilter("all");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-3xl mx-auto px-4 pt-20 pb-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-lg font-light tracking-wide text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mt-4 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`text-xs font-medium tracking-[0.15em] px-4 py-1.5 rounded-full border transition-colors ${
                activeFilter === f.key
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground mt-12 text-sm">No products found</p>
          ) : (
            filtered.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-14 h-14 object-cover rounded-md bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{p.category}</p>
                </div>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                  {formatPrice(p.price, p.currency)}
                </span>
              </Link>
            ))
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found · Press ESC to close
        </p>
      </div>
    </div>
  );
};

export default SearchOverlay;
