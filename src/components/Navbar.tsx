import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import MobileDrawer from "@/components/MobileDrawer";
import FeedbackSettings from "@/components/FeedbackSettings";
import logo from "@/assets/logo.webp";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
        {count}
      </span>
    ) : null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===== Mobile (3-zone) ===== */}
          <div className="md:hidden grid grid-cols-3 items-center h-16">
            <div className="flex justify-start">
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="text-foreground hover:text-accent transition-colors p-1"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/" aria-label="Home">
                <img src={logo} alt="Bambotia" width={48} height={48} className="h-12 w-auto" />
              </Link>
            </div>
            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() => navigate("/search")}
                aria-label="Search"
                className="text-foreground hover:text-accent transition-colors p-1"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="relative text-foreground hover:text-accent transition-colors p-1"
              >
                <ShoppingBag className="w-6 h-6" />
                <Badge count={totalItems} />
              </button>
            </div>
          </div>

          {/* ===== Desktop ===== */}
          <div className="hidden md:flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Bambotia" width={101} height={67} className="h-[4.2em] w-auto transition-transform hover:scale-105" />
            </Link>

            <div className="flex items-center gap-10">
              <Link to="/category/jewellery" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">JEWELLERY</Link>
              <Link to="/category/cosmetics" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">COSMETICS</Link>
              <Link to="/category/purses" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">PURSES</Link>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/search")} aria-label="Search" className="text-foreground hover:text-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>
      
              <FeedbackSettings />
              <Link to="/wishlist" aria-label="Wishlist" className="relative text-foreground hover:text-accent transition-colors">
                <Heart className="w-5 h-5" />
                <Badge count={wishlistItems.length} />
              </Link>
              <Link to="/signin" aria-label="Account" className="text-foreground hover:text-accent transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative text-foreground hover:text-accent transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <Badge count={totalItems} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default Navbar;
