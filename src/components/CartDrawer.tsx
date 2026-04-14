import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, addItem, removeItem, decrementItem, totalItems, totalPrice } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl tracking-wide">
            Shopping Bag ({totalItems})
          </SheetTitle>
          <SheetDescription className="sr-only">Your cart items</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="w-12 h-12" />
            <p className="text-sm tracking-wide">Your bag is empty</p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-4 py-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md bg-muted"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.currency} {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-border rounded-md">
                        <button
                          onClick={() => decrementItem(item.productId)}
                          className="p-1.5 hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addItem({ productId: item.productId, name: item.name, price: item.price, currency: item.currency, image: item.image })}
                          className="p-1.5 hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Separator />
              <div className="flex justify-between items-center py-4">
                <span className="text-sm font-medium tracking-wide">TOTAL</span>
                <span className="text-lg font-serif font-semibold">
                  PKR {totalPrice.toLocaleString()}
                </span>
              </div>
              <Button className="w-full h-12 text-sm tracking-[0.15em] font-medium">
                PROCEED TO CHECKOUT
              </Button>
              <button
                onClick={() => onOpenChange(false)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-3 pb-2"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
