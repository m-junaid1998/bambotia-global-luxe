import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { products, formatPrice } from "@/data/products";

const WishlistPage = () => {
  const { items, toggleItem } = useWishlist();
  const { addItem } = useCart();

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-accent mb-3">MY COLLECTION</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
              Wishlist
            </h1>
            <p className="text-muted-foreground text-sm">
              {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground/60 mb-6">
                Browse our collections and tap the heart icon to save items you love.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground text-sm font-medium tracking-wider hover:opacity-90 transition-opacity"
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="group">
                  <Link to={`/product/${p.slug}`}>
                    <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-3 bg-card">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {p.isNew && (
                        <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] bg-accent text-accent-foreground px-3 py-1 rounded-sm font-medium">
                          NEW
                        </span>
                      )}
                      {/* Action buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItem(p.id, p.name);
                          }}
                          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem({
                            productId: p.id,
                            name: p.name,
                            price: p.price,
                            currency: p.currency,
                            image: p.images[0],
                          });
                        }}
                        className="absolute bottom-3 right-3 w-9 h-9 bg-accent text-accent-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                  <Link to={`/product/${p.slug}`}>
                    <p className="text-[10px] text-muted-foreground tracking-wider mb-0.5 capitalize">
                      {p.category}
                    </p>
                    <h3 className="text-sm font-medium text-foreground mb-0.5 group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-accent font-medium">
                      {formatPrice(p.price, p.currency)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}

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

      
    </div>
  );
};

export default WishlistPage;
