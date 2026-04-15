import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

const WishlistButton = ({ productId, productName, className = "" }: { productId: string; productName: string; className?: string }) => {
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(productId, productName);
      }}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
        wishlisted
          ? "bg-red-500 text-white"
          : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background"
      } ${className}`}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current" : ""}`} />
    </button>
  );
};

export default WishlistButton;
