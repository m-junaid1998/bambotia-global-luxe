import { useMemo, useState } from "react";
import { Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice, type Product } from "@/data/products";
import { useStorefrontProducts } from "@/hooks/useStorefrontProducts";
import { useCart } from "@/contexts/CartContext";

interface FBTProps {
  product: Product;
}

const FrequentlyBoughtTogether = ({ product }: FBTProps) => {
  const all = useStorefrontProducts();
  const { addItem } = useCart();

  const bundle = useMemo(() => {
    const others = all.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    return [product, ...others.slice(0, 2)];
  }, [all, product]);

  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(bundle.map((p) => [p.id, true]))
  );

  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  const chosen = bundle.filter((p) => selected[p.id]);
  const total = chosen.reduce((sum, p) => sum + p.price, 0);

  const addAll = () => {
    chosen.forEach((p) =>
      addItem({
        productId: p.id,
        name: p.name,
        price: p.price,
        currency: p.currency,
        image: p.images[0],
      })
    );
  };

  if (bundle.length < 2) return null;

  return (
    <section className="mt-14">
      <p className="text-[10px] sm:text-xs tracking-[0.3em] text-accent mb-1">
        BUNDLE & SAVE
      </p>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
        Frequently Bought Together
      </h2>

      <div className="rounded-2xl bg-background/90 backdrop-blur-md border border-border p-4 sm:p-6 shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.08)]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {bundle.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 sm:gap-4">
              <Link
                to={`/product/${p.slug}`}
                className="block w-20 h-20 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-border bg-muted/40"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
              {i < bundle.length - 1 && (
                <Plus className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          {bundle.map((p) => (
            <label
              key={p.id}
              className="flex items-center gap-3 text-xs sm:text-sm text-foreground cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!!selected[p.id]}
                onChange={() => toggle(p.id)}
                className="w-4 h-4 accent-accent"
              />
              <span className="flex-1 truncate">
                {p.id === product.id ? "This item: " : ""}
                {p.name}
              </span>
              <span className="font-semibold">
                {formatPrice(p.price, p.currency)}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm">
            Total:{" "}
            <span className="font-heading text-lg text-gradient-gold">
              {formatPrice(total, product.currency)}
            </span>
          </p>
          <button
            onClick={addAll}
            disabled={!chosen.length}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-semibold tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4" />
            Add {chosen.length} to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyBoughtTogether;