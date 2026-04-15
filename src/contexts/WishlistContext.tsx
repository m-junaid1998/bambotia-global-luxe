import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  items: string[];
  toggleItem: (productId: string, productName: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  const toggleItem = (productId: string, productName: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) {
        toast.success(`${productName} removed from wishlist`);
        return prev.filter((id) => id !== productId);
      }
      toast.success(`${productName} added to wishlist`);
      return [...prev, productId];
    });
  };

  const isWishlisted = (productId: string) => items.includes(productId);

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
