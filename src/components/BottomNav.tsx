import { Link, useLocation } from "react-router-dom";
import { Home, Store, LayoutGrid, Heart, User } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

const items = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { to: "/category/jewellery", label: "Shop", icon: Store, match: (p: string) => p.startsWith("/category") && !p.includes("cosmetics") && !p.includes("accessories") },
  { to: "/search", label: "Categories", icon: LayoutGrid, match: (p: string) => p === "/search" },
  { to: "/wishlist", label: "Wishlist", icon: Heart, match: (p: string) => p === "/wishlist", badgeKey: "wishlist" as const },
  { to: "/signin", label: "Account", icon: User, match: (p: string) => p === "/signin" },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const { items: wishlistItems } = useWishlist();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-border"
      aria-label="Bottom navigation"
    >
      <ul className="flex items-center justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon, match, badgeKey }) => {
          const active = match(pathname);
          const count = badgeKey === "wishlist" ? wishlistItems.length : 0;
          return (
            <li key={label} className="flex-1">
              <Link
                to={to}
                className="flex flex-col items-center gap-0.5 py-1 group"
                aria-current={active ? "page" : undefined}
              >
                <span className={`relative inline-flex items-center justify-center w-10 h-8 rounded-full transition-all ${active ? "bg-accent/15" : ""}`}>
                  <Icon
                    className={`w-5 h-5 transition-colors ${active ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`}
                  />
                  {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </span>
                <span className={`text-[10px] tracking-wider transition-colors ${active ? "text-accent font-semibold" : "text-muted-foreground"}`}>
                  {label}
                </span>
                <span className={`h-0.5 w-6 rounded-full transition-all ${active ? "bg-accent" : "bg-transparent"}`} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;