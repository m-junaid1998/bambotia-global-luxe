import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import logo from "@/assets/bambotia-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  // Brand palette pulled from logo
  const beige = "#F3E7CE";
  const gold = "#C9A96A";
  const darkGreen = "#1B3A2F";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: `linear-gradient(180deg, ${beige} 0%, #EFE0C2 100%)`,
        borderBottom: `1px solid ${gold}55`,
        boxShadow: `0 1px 0 ${gold}33, 0 6px 18px -10px ${darkGreen}33`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Bambotia"
              className="h-12 md:h-14 w-auto drop-shadow-sm"
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {[
              { to: "/category/jewellery", label: "JEWELLERY" },
              { to: "/category/cosmetics", label: "COSMETICS" },
              { to: "/category/purses", label: "PURSES" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium tracking-[0.2em] transition-colors"
                style={{ color: darkGreen }}
                onMouseEnter={(e) => (e.currentTarget.style.color = gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = darkGreen)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="transition-colors" style={{ color: darkGreen }} aria-label="Search" onClick={() => navigate("/search")}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/signin" className="hidden md:block transition-colors" style={{ color: darkGreen }} aria-label="Account">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="relative hidden md:block transition-colors" style={{ color: darkGreen }} aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: gold, color: darkGreen }}
                >
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button className="relative transition-colors" style={{ color: darkGreen }} aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: gold, color: darkGreen }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden"
              style={{ color: darkGreen }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ background: beige, borderTop: `1px solid ${gold}55` }}
        >
          <div className="px-4 py-6 space-y-4">
            <Link to="/category/jewellery" className="block text-sm font-medium tracking-[0.2em]" style={{ color: darkGreen }} onClick={() => setMobileOpen(false)}>JEWELLERY</Link>
            <Link to="/category/cosmetics" className="block text-sm font-medium tracking-[0.2em]" style={{ color: darkGreen }} onClick={() => setMobileOpen(false)}>COSMETICS</Link>
            <Link to="/category/purses" className="block text-sm font-medium tracking-[0.2em]" style={{ color: darkGreen }} onClick={() => setMobileOpen(false)}>PURSES</Link>
            <Link to="/wishlist" className="flex items-center gap-2 text-sm font-medium tracking-[0.2em]" style={{ color: darkGreen }} onClick={() => setMobileOpen(false)}>
              <Heart className="w-4 h-4" /> WISHLIST
              {wishlistItems.length > 0 && <span className="text-xs" style={{ color: gold }}>({wishlistItems.length})</span>}
            </Link>
            <Link to="/signin" className="flex items-center gap-2 text-sm font-medium tracking-[0.2em]" style={{ color: darkGreen }} onClick={() => setMobileOpen(false)}>
              <User className="w-4 h-4" /> SIGN IN
            </Link>
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </nav>
  );
};

export default Navbar;
