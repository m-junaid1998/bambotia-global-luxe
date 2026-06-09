import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronDown, Home, Store, LayoutGrid, Sparkles, Crown, Mail } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const categories = [
  { name: "Rings", to: "/category/jewellery?type=rings" },
  { name: "Earrings", to: "/category/jewellery?type=earrings" },
  { name: "Necklaces & Pendants", to: "/category/jewellery?type=necklaces" },
  { name: "Bangles", to: "/category/jewellery?type=bangles" },
  { name: "Bridal Sets", to: "/category/jewellery?type=bridal" },
  { name: "Watches", to: "/category/accessories?type=watches" },
  { name: "Cosmetics", to: "/category/cosmetics" },
  { name: "Accessories", to: "/category/accessories" },
];

const MobileDrawer = ({ open, onClose }: Props) => {
  const [catOpen, setCatOpen] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkCls = (to: string) =>
    `flex items-center gap-3 py-3 px-2 text-base tracking-wide transition-colors border-b border-border/40 ${
      pathname === to ? "text-accent font-semibold" : "text-foreground hover:text-accent"
    }`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-[82%] max-w-sm bg-background/95 backdrop-blur-xl border-r border-border shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Main menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={onClose} aria-label="Close menu" className="text-foreground hover:text-accent">
            <X className="w-6 h-6" />
          </button>
          <span className="font-heading text-lg tracking-widest text-accent">MENU</span>
          <span className="w-6" />
        </div>

        <nav className="overflow-y-auto h-[calc(100%-64px)] px-4 py-3 scrollbar-hide">
          <Link to="/" onClick={onClose} className={linkCls("/")}>
            <Home className="w-4 h-4 text-accent" /> Home
          </Link>
          <Link to="/category/jewellery" onClick={onClose} className={linkCls("/category/jewellery")}>
            <Store className="w-4 h-4 text-accent" /> Shop
          </Link>

          {/* Categories accordion */}
          <div className="border-b border-border/40">
            <button
              onClick={() => setCatOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 px-2 text-base text-foreground hover:text-accent transition-colors"
              aria-expanded={catOpen}
            >
              <span className="flex items-center gap-3">
                <LayoutGrid className="w-4 h-4 text-accent" /> Categories
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${catOpen ? "max-h-[600px]" : "max-h-0"}`}
            >
              <div className="pl-8 pb-2 space-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to={c.to}
                    onClick={onClose}
                    className="block py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/category/new-arrivals" onClick={onClose} className={linkCls("/category/new-arrivals")}>
            <Sparkles className="w-4 h-4 text-accent" /> New Arrivals
          </Link>
          <Link to="/category/best-sellers" onClick={onClose} className={linkCls("/category/best-sellers")}>
            <Crown className="w-4 h-4 text-accent" /> Best Sellers
          </Link>
          <Link to="/contact" onClick={onClose} className={linkCls("/contact")}>
            <Mail className="w-4 h-4 text-accent" /> Contact Us
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default MobileDrawer;