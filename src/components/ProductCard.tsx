import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { formatPrice, getDiscountPercent, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import WishlistButton from "@/components/WishlistButton";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product: p, compact }: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const discount = p.regularPrice ? getDiscountPercent(p.regularPrice, p.price) : 0;
  const rating = (4.6 + ((p.id.charCodeAt(0) % 4) * 0.1)).toFixed(2);

  const add = () =>
    addItem({
      productId: p.id,
      name: p.name,
      price: p.price,
      currency: p.currency,
      image: p.images[0],
    });

  return (
    <article
      className={`group relative flex flex-col rounded-xl sm:rounded-2xl bg-background/90 backdrop-blur-md border border-border overflow-hidden shadow-[0_4px_24px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-12px_hsl(var(--foreground)/0.18)] hover:-translate-y-1 transition-all duration-300 ${
        compact ? "w-[180px] sm:w-[220px] shrink-0" : ""
      }`}
    >
      <Link
        to={`/product/${p.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted/40"
      >
        {p.isNew && (
          <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-4 z-10 px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold tracking-[0.15em] bg-accent text-accent-foreground rounded-full uppercase shadow">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 z-10 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold bg-red-500/90 text-white rounded shadow">
            -{discount}%
          </span>
        )}
        <img
          src={p.images[0]}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <WishlistButton
          productId={p.id}
          productName={p.name}
          className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 scale-90 sm:scale-100"
        />
      </Link>

      <div className="flex flex-col flex-1 p-2 sm:p-4 min-w-0">
        <Link to={`/product/${p.slug}`} className="min-w-0">
          <h3 className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-accent transition-colors">
            {p.name}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mb-2">
          {p.subcategory || p.description.split(".")[0]}
        </p>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium mb-2">
          <Star className="w-3 h-3 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
          {rating}
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2 mb-3">
          {p.regularPrice && p.regularPrice > p.price && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
              {formatPrice(p.regularPrice, p.currency)}
            </span>
          )}
          <span className="text-sm sm:text-base font-bold text-foreground">
            {formatPrice(p.price, p.currency)}
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-1.5">
          <button
            onClick={add}
            className="w-full h-8 sm:h-9 inline-flex items-center justify-center gap-1 rounded-full border border-border bg-background text-foreground text-[10px] sm:text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            <ShoppingBag className="w-3 h-3" />
            Add to Cart
          </button>
          <button
            onClick={() => {
              add();
              navigate("/checkout");
            }}
            className="w-full h-8 sm:h-9 inline-flex items-center justify-center rounded-full bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] text-[10px] sm:text-xs font-semibold shadow-md hover:opacity-90 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;