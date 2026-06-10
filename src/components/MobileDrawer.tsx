import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronDown, Home, Store, LayoutGrid, Sparkles, Crown, Mail, Plus, Minus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface CategoryNode {
  name: string;
  to: string;
  children?: CategoryNode[];
}

const categoryTree: CategoryNode[] = [
  {
    name: "Jewellery",
    to: "/category/jewellery",
    children: [
      { name: "Rings", to: "/category/jewellery?type=rings" },
      { name: "Earrings", to: "/category/jewellery?type=earrings" },
      { name: "Necklaces & Pendants", to: "/category/jewellery?type=necklaces" },
      { name: "Bangles", to: "/category/jewellery?type=bangles" },
      { name: "Bracelets", to: "/category/jewellery?type=bracelets" },
      { name: "Bridal Sets", to: "/category/jewellery?type=bridal" },
    ],
  },
  {
    name: "Cosmetics",
    to: "/category/cosmetics",
    children: [
      { name: "Lipsticks", to: "/category/cosmetics?type=lipsticks" },
      { name: "Foundation", to: "/category/cosmetics?type=foundation" },
      { name: "Perfumes", to: "/category/cosmetics?type=perfumes" },
      { name: "Skincare", to: "/category/cosmetics?type=skincare" },
      { name: "Makeup Kits", to: "/category/cosmetics?type=kits" },
    ],
  },
  {
    name: "Ladies Bags",
    to: "/category/purses",
    children: [
      { name: "Hand Bags", to: "/category/purses?type=hand" },
      { name: "Shoulder Bags", to: "/category/purses?type=shoulder" },
      { name: "Tote Bags", to: "/category/purses?type=tote" },
      { name: "Crossbody Bags", to: "/category/purses?type=crossbody" },
      { name: "Clutches", to: "/category/purses?type=clutches" },
    ],
  },
  {
    name: "Watches",
    to: "/category/accessories?type=watches",
    children: [
      { name: "Women Watches", to: "/category/accessories?type=watches-women" },
      { name: "Luxury Watches", to: "/category/accessories?type=watches-luxury" },
      { name: "Smart Watches", to: "/category/accessories?type=watches-smart" },
    ],
  },
];

interface CategoryTreeProps {
  nodes: CategoryNode[];
  onNavigate: () => void;
  level?: number;
}

const CategoryTree = ({ nodes, onNavigate, level = 0 }: CategoryTreeProps) => {
  const { pathname, search } = useLocation();
  const currentUrl = `${pathname}${search}`;
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpenMap((m) => ({ ...m, [key]: !m[key] }));

  return (
    <ul className={level === 0 ? "space-y-1" : "mt-1 ml-2 border-l border-border/50 pl-3 space-y-0.5"}>
      {nodes.map((node) => {
        const hasChildren = !!node.children?.length;
        const isOpen = !!openMap[node.name];
        const isActive = currentUrl === node.to;

        return (
          <li key={node.name}>
            {hasChildren ? (
              <button
                onClick={() => toggle(node.name)}
                aria-expanded={isOpen}
                className={`group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 border-l-2 ${
                  isOpen
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-transparent text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span>{node.name}</span>
                <span className="relative w-4 h-4 flex items-center justify-center">
                  <Plus
                    className={`absolute w-4 h-4 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <Minus
                    className={`absolute w-4 h-4 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                    }`}
                  />
                </span>
              </button>
            ) : (
              <Link
                to={node.to}
                onClick={onNavigate}
                className={`block rounded-lg px-3 py-2 text-sm transition-all duration-300 border-l-2 transform ${
                  isActive
                    ? "border-accent bg-accent/15 text-accent font-semibold translate-x-1"
                    : "border-transparent text-muted-foreground hover:border-accent hover:bg-accent/10 hover:text-accent hover:translate-x-1"
                }`}
              >
                {node.name}
              </Link>
            )}

            {hasChildren && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <CategoryTree nodes={node.children!} onNavigate={onNavigate} level={level + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

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
          <div className="border-b border-border/40 mt-1">
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
              className={`overflow-hidden transition-all duration-500 ease-out ${catOpen ? "max-h-[2000px]" : "max-h-0"}`}
            >
              <div className="pb-3 pt-1 px-1">
                <CategoryTree nodes={categoryTree} onNavigate={onClose} />
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