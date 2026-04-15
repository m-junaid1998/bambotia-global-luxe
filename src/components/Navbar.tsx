import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import logo from "@/assets/bambotia-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Bambotia" className="h-12 md:h-14 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link to="/category/jewellery" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">JEWELLERY</Link>
            <Link to="/category/cosmetics" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">COSMETICS</Link>
            <Link to="/category/purses" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">PURSES</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-accent transition-colors" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="relative hidden md:block text-foreground hover:text-accent transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button className="relative text-foreground hover:text-accent transition-colors" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-6 space-y-4">
            <Link to="/category/jewellery" className="block text-sm font-medium tracking-[0.2em] text-foreground" onClick={() => setMobileOpen(false)}>JEWELLERY</Link>
            <Link to="/category/cosmetics" className="block text-sm font-medium tracking-[0.2em] text-foreground" onClick={() => setMobileOpen(false)}>COSMETICS</Link>
            <Link to="/category/purses" className="block text-sm font-medium tracking-[0.2em] text-foreground" onClick={() => setMobileOpen(false)}>PURSES</Link>
            <Link to="/wishlist" className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-foreground" onClick={() => setMobileOpen(false)}>
              <Heart className="w-4 h-4" /> WISHLIST
              {wishlistItems.length > 0 && <span className="text-accent text-xs">({wishlistItems.length})</span>}
            </Link>
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
