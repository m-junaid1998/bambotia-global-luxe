import { useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import logo from "@/assets/bambotia-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="Bambotia" className="h-12 md:h-14 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#jewellery" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">JEWELLERY</a>
            <a href="#cosmetics" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">COSMETICS</a>
            <a href="#purses" className="text-sm font-medium tracking-[0.2em] text-foreground hover:text-accent transition-colors">PURSES</a>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-accent transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block text-foreground hover:text-accent transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button className="text-foreground hover:text-accent transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-6 space-y-4">
            <a href="#jewellery" className="block text-sm font-medium tracking-[0.2em] text-foreground">JEWELLERY</a>
            <a href="#cosmetics" className="block text-sm font-medium tracking-[0.2em] text-foreground">COSMETICS</a>
            <a href="#purses" className="block text-sm font-medium tracking-[0.2em] text-foreground">PURSES</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
